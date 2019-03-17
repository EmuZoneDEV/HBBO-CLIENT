import WebSocketManager from './networking/WebSocketManager';
import PacketManager from './networking/PacketManager';
import InterfaceManager from './interfaces/InterfaceManager';
import InteractionManager from './interaction/InteractionManager';
import TimeoutManager from './TimeoutManager';

import SSOTicketComposer from './networking/composers/handshake/SSOTicketComposer';
import PingComposer from './networking/composers/handshake/PingComposer';
import InterfaceStore from './interfaces/InterfaceStore';

import Http from './util/Http';
import GetRequest from './util/GetRequest';

export default class Wibbo {

    private static _websocketManager: WebSocketManager | null;
    private static _packetManager: PacketManager;
    private static _interfaceManager: InterfaceManager;
    private static _interfaceStore: InterfaceStore;
    private static _interactionManager: InteractionManager;
    private static _timeoutManager: TimeoutManager;

    private static _pingInterval: number;
    private static _WSUrl: string;

    public static Init(WSUrl: string): void {

        Wibbo._pingInterval = 0;
        Wibbo._WSUrl = WSUrl;

        Wibbo._websocketManager = new WebSocketManager(Wibbo._WSUrl);
        Wibbo._packetManager = new PacketManager();
        Wibbo._interfaceStore = new InterfaceStore();
        Wibbo._interfaceManager = new InterfaceManager();
        Wibbo._interactionManager = new InteractionManager();
        Wibbo._timeoutManager = new TimeoutManager();
    }

    public static StartPing(): void {
        Wibbo._pingInterval = setInterval(function() { Wibbo.GetWebSocketManager().SendPacket(new PingComposer()); }, 30 * 1000);
    }

    public static OnConnect(): void {
        var Id: string = GetRequest("id");
        var CustumeId: string = (Id == "") ? "" : "?id=" + Id;

        Http.get("getssoticketweb" + CustumeId).then(function (response: any) {

            if(response.data.error)
            {
                console.log(response.data.error);
                return;
            }

            let SSOTicket = response.data.SSOTicketweb;
            Wibbo.GetWebSocketManager().SendPacket(new SSOTicketComposer(SSOTicket));
        });
    }

    public static OnDisconnect(): void {
        clearInterval(Wibbo._pingInterval);
        Wibbo.GetStore().connected = false;

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
}