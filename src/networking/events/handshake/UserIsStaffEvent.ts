import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class UserIsStaff implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        let IsStaff = packet.PopBoolean();
        if (IsStaff) {
            Wibbo.GetStore().wibbotool_open = true;
        }
    }

}