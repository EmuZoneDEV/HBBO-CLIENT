import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class PlaySoundEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        let Name: string = packet.PopString();
        let Type = packet.PopInt();

        Wibbo.GetSoundManager().playSoundLib(Name, Type);
    }

}