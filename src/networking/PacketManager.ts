import ClientPacket from "./events/ClientPacket";
import IPacketEvent from "./events/IPacketEvent";

import Logger from "../util/Logger";
import EventHeader from "./events/EventHeader";

import AuthenticationOKEvent from "./events/handshake/AuthenticationOKEvent";
import UserIsStaffEvent from "./events/handshake/UserIsStaffEvent";
import PongEvent from "./events/handshake/PongEvent";
import InRoomEvent from "./events/handshake/InRoomEvent";
import SettingVolumeEvent from "./events/sound/SettingVolumeEvent";
import PlaySoundEvent from "./events/sound/PlaySoundEvent";
import StopSoundEvent from "./events/sound/StopSoundEvent";
import YoutubeTvEvent from "./events/tvyoutube/YoutubeTvEvent";
import AddChatlogsEvent from "./events/wibbotool/AddChatlogsEvent";
import RpStatsEvent from "./events/roleplay/RpStatsEvent";
import BuyItemsListEvent from "./events/roleplay/BuyItemsListEvent";
import LoadInventoryRpEvent from "./events/roleplay/LoadInventoryRpEvent";
import AddInventoryItemRpEvent from "./events/roleplay/AddInventoryItemRpEvent";
import RemoveItemInventoryRpEvent from "./events/roleplay/RemoveItemInventoryRpEvent";
import RpTrocStartEvent from "./events/troc/RpTrocStartEvent";
import RpTrocStopEvent from "./events/troc/RpTrocStopEvent";
import RpTrocAccepteEvent from "./events/troc/RpTrocAccepteEvent";
import RpTrocConfirmeEvent from "./events/troc/RpTrocConfirmeEvent";
import RpTrocUpdateItemsEvent from "./events/troc/RpTrocUpdateItemsEvent";
import NotifAlertEvent from "./events/notif/NotifAlertEvent";
import NotifTopEvent from "./events/notif/NotifTopEvent";
import NotifTopInitEvent from "./events/notif/NotifTopInitEvent";
import BotChooseEvent from "./events/roleplay/BotChooseEvent";

export default class PacketManager {

    private _incomingPackets = Array<IPacketEvent>();

    constructor() {
        this._incomingPackets = new Array();

        this.RegisterPackets();
    }

    private RegisterPackets() {
        this._incomingPackets[EventHeader.AuthenticationOK] = new AuthenticationOKEvent();
        this._incomingPackets[EventHeader.UserIsStaff] = new UserIsStaffEvent();
        this._incomingPackets[EventHeader.YoutubeTv] = new YoutubeTvEvent();
        this._incomingPackets[EventHeader.Pong] = new PongEvent();
        this._incomingPackets[EventHeader.InRoom] = new InRoomEvent();
        this._incomingPackets[EventHeader.AddChatlogs] = new AddChatlogsEvent();
        this._incomingPackets[EventHeader.NotifAlert] = new NotifAlertEvent();
        this._incomingPackets[EventHeader.NotifTop] = new NotifTopEvent();
        this._incomingPackets[EventHeader.NotifTopInit] = new NotifTopInitEvent();

        this._incomingPackets[EventHeader.SettingVolume] = new SettingVolumeEvent();
        this._incomingPackets[EventHeader.PlaySound] = new PlaySoundEvent();
        this._incomingPackets[EventHeader.StopSound] = new StopSoundEvent();
        
        this._incomingPackets[EventHeader.RpStats] = new RpStatsEvent();
        this._incomingPackets[EventHeader.BuyItemsList] = new BuyItemsListEvent();
        this._incomingPackets[EventHeader.LoadInventoryRp] = new LoadInventoryRpEvent();
        this._incomingPackets[EventHeader.AddInventoryItemRp] = new AddInventoryItemRpEvent();
        this._incomingPackets[EventHeader.RemoveItemInventoryRp] = new RemoveItemInventoryRpEvent();
        this._incomingPackets[EventHeader.RpTrocStart] = new RpTrocStartEvent();
        this._incomingPackets[EventHeader.RpTrocStop] = new RpTrocStopEvent();
        this._incomingPackets[EventHeader.RpTrocAccepte] = new RpTrocAccepteEvent();
        this._incomingPackets[EventHeader.RpTrocConfirme] = new RpTrocConfirmeEvent();
        this._incomingPackets[EventHeader.RpTrocUpdateItems] = new RpTrocUpdateItemsEvent();
        this._incomingPackets[EventHeader.BotChoose] = new BotChooseEvent();
    }

    TryExecutePacket(data: ArrayBuffer) {

        let Byte: Uint8Array = new Uint8Array(data);

        let Message: ClientPacket = new ClientPacket(Byte);

        let LengthMessage: number = Message.PopInt(); //Decode INT32
        if(LengthMessage == 0 || LengthMessage > 999999)
            return;

		let HeaderId: number = Message.PopShort(); //decode INT16
        
        if(!this._incomingPackets.hasOwnProperty(HeaderId.toString()))
        {
            Logger.Log("Incoming introuvable: " + HeaderId);
            return;
        }

        Logger.Log("[WebSocket] Reçu packet id: " + HeaderId);
        this._incomingPackets[HeaderId].Parse(Message);
    }
}