import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class NotifTopInitEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        let Count = packet.PopInt();

        if(Count > 0)
        {
            for(let i: number = 0;i < Count; i++)
            {
                Wibbo.GetStore().notif_top_list_message.push(packet.PopString());
            }
        }

        Wibbo.GetTimeoutManager().SendNotifTop();
        Wibbo.GetTimeoutManager().InitSendNotifTop();
    }
    
}