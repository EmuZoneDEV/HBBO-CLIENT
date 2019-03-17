import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class LoadInventoryRpEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        Wibbo.GetStore().rp_inventory.splice(0, Wibbo.GetStore().rp_inventory.length); //Clean

        let Count = packet.PopInt();

        if (Count > 0) {
            for (let i: number = 0; i < Count; i++) {
                let ItemId = packet.PopInt();
                let Name = packet.PopString();
                let Desc = decodeURIComponent(packet.PopString());
                let Count = packet.PopInt();
                let Category = packet.PopInt();
                let UseType = packet.PopInt();

                Wibbo.GetStore().rp_inventory.push({ 'id': ItemId, 'name': Name, 'desc': Desc, 'count': Count, 'category': Category, 'usetype': UseType });
            }
        }
    }
}