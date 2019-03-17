import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class RpTrocAccepteEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        let UserId: number = packet.PopInt();
        let Etat: boolean = packet.PopBoolean();

        if(UserId == Wibbo.GetStore().rp_troc_target_settings.userid)
            Wibbo.GetStore().rp_troc_target_settings.accepte = Etat;
        else
            Wibbo.GetStore().rp_troc_settings.accepte = Etat;
    }
}