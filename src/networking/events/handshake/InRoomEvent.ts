import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class InRoomEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        let InRoom: boolean = packet.PopBoolean();
        Wibbo.GetStore().in_room = InRoom;
        Wibbo.GetStore().rpbox_buyitems_open = false;
        Wibbo.GetStore().rp_botchoose.splice(0, Wibbo.GetStore().rp_botchoose.length); //Clean

        Wibbo.GetSoundManager().stopSound();
    }

}