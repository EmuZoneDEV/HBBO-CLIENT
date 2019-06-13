import WebSocketManager from './networking/WebSocketManager';
import PacketManager from './networking/PacketManager';
import InterfaceManager from './interfaces/InterfaceManager';
import InteractionManager from './interaction/InteractionManager';
import TimeoutManager from './timeout/TimeoutManager';
import SoundManager from './sound/SoundManager';

import SSOTicketComposer from './networking/composers/handshake/SSOTicketComposer';
import PingComposer from './networking/composers/handshake/PingComposer';
import InterfaceStore from './interfaces/InterfaceStore';

import Http from './util/Http';
import GetRequest from './util/GetRequest';
import Logger from './util/Logger';

import Client from "./Client";
declare let roomId: number;

export default class Wibbo {

    private static _websocketManager: WebSocketManager | null;
    private static _packetManager: PacketManager;
    private static _interfaceManager: InterfaceManager;
    private static _interfaceStore: InterfaceStore;
    private static _interactionManager: InteractionManager;
    private static _timeoutManager: TimeoutManager;
    private static _soundManager: SoundManager;

    private static _pingInterval: number;
    private static _WSUrl: string;
    private static _userId: number;
    private static _SSOTicket: string;

    public static async Init(): Promise<void> {

        Wibbo._pingInterval = 0;

        Wibbo._websocketManager = new WebSocketManager(Wibbo._WSUrl);
        Wibbo._packetManager = new PacketManager();
        Wibbo._interfaceStore = new InterfaceStore();
        Wibbo._interfaceManager = new InterfaceManager();
        Wibbo._interactionManager = new InteractionManager();
        Wibbo._timeoutManager = new TimeoutManager();
        Wibbo._soundManager = new SoundManager();
    }

    public static async Auth(): Promise<void> {
        let Id: string = GetRequest("id");
        let CustumeId: string = Id == "" ? "" : "?id=" + Id;

        try {
        let response = await Http.get("getclientdata" + CustumeId);
        
        if (response.data.error) {
            console.log(response.data.error);
            return;
        }

        Wibbo._SSOTicket = response.data.SSOTicket;
        Wibbo._WSUrl = response.data.WSUrl;
        Wibbo._userId = response.data.id;

        new Client(Wibbo._SSOTicket, roomId);
        } catch(e) {
            Logger.Log("[getclientdata]" + e);
        }
    }


    public static StartPing(): void {
        Wibbo._pingInterval = setInterval(function() { Wibbo.GetWebSocketManager().SendPacket(new PingComposer()); }, 30 * 1000);
    }

    public static async OnConnect(): Promise<void> {
        let Id: string = GetRequest("id");
        let CustumeId: string = (Id == "") ? "" : "?id=" + Id;

        try {
            let response = await Http.get("getssoticketweb" + CustumeId);

            if(response.data.error)
            {
                console.log(response.data.error);
                Wibbo.GetWebSocketManager().Close();
                return;
            }
            let UserId = response.data.id;
            let SSOTicket = response.data.SSOTicketweb;
        

            if(UserId != Wibbo._userId) {
                Logger.Log("getssoticketweb: Id ne correspond pas (" + UserId + " / " + Wibbo._userId + ")"); //Low security
                Wibbo.GetWebSocketManager().Close();
                return;
            }
            Wibbo.GetWebSocketManager().SendPacket(new SSOTicketComposer(SSOTicket));
        } catch(e) {
            Logger.Log("[getssoticketweb]" + e);
            Wibbo.GetWebSocketManager().Close();
        }
    }

    public static OnDisconnect(): void {
        clearInterval(Wibbo._pingInterval);
        Wibbo.GetStore().connected = false;
        Wibbo.GetSoundManager().stopSound();

        setTimeout(Wibbo.TryReconnect, 30 * 1000);
    }

    private static TryReconnect(): void {
        Wibbo._websocketManager = null;
        Wibbo._websocketManager = new WebSocketManager(Wibbo._WSUrl);
    }

    public static GetStore(): InterfaceStore {
        return this._interfaceStore;
    }

    public static GetWebSocketManager(): WebSocketManager {
        return <WebSocketManager>Wibbo._websocketManager;
    }

    public static GetPacketManager(): PacketManager {
        return Wibbo._packetManager;
    }

    public static GetInterfaceManager(): InterfaceManager {
        return Wibbo._interfaceManager;
    }

    public static GetTimeoutManager(): TimeoutManager {
        return Wibbo._timeoutManager;
    }

    public static GetSoundManager(): SoundManager {
        return Wibbo._soundManager;
    }
}