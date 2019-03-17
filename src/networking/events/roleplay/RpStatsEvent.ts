import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class RpStatsEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        let RpId: number = packet.PopInt();

        if(RpId != Wibbo.GetStore().rp_id)
        {
            Wibbo.GetStore().rp_inventory.splice(0, Wibbo.GetStore().rp_inventory.length);
            Wibbo.GetStore().rp_item_choice.count = 0;
        }

        Wibbo.GetStore().rp_id = RpId;
        Wibbo.GetStore().rp_mode = (RpId > 0);
        Wibbo.GetStore().rp_health = packet.PopInt();
        Wibbo.GetStore().rp_maxhealh = packet.PopInt();
        Wibbo.GetStore().rp_energy = packet.PopInt();
        Wibbo.GetStore().rp_money = packet.PopInt();
        Wibbo.GetStore().rp_munition = packet.PopInt();
        Wibbo.GetStore().rp_level = packet.PopInt();
    }

}