import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class StopSoundEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        let Name: string = packet.PopString();

        Wibbo.GetSoundManager().stopSound(Name);
    }

}