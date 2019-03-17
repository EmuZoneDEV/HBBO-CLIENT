import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class RpTrocConfirmeEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        let UserId: number = packet.PopInt();

        if(UserId == Wibbo.GetStore().rp_troc_target_settings.userid)
            Wibbo.GetStore().rp_troc_target_settings.confirme = true;
        else
            Wibbo.GetStore().rp_troc_settings.confirme = true;
    }
}