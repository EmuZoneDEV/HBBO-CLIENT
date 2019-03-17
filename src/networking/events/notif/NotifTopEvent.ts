import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class NotifTopEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        Wibbo.GetStore().notif_top_open = true;
        Wibbo.GetStore().notif_top_message = packet.PopString();

        Wibbo.GetTimeoutManager().InitSendNotifTop();
        Wibbo.GetTimeoutManager().CloseNotifTop();
    }

}