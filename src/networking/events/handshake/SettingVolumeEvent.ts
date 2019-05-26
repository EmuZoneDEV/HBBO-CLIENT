import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class SettingVolumeEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        let Volume1 = packet.PopInt() / 100;
        let Volume2 = packet.PopInt() / 100;
        let Volume3 = packet.PopInt() / 100;

        console.log("Sound: " + Volume1 + " / "+ Volume2 + " / "+ Volume3);

        Wibbo.GetSoundManager().setVolume(Volume1, Volume2, Volume3);
    }

}