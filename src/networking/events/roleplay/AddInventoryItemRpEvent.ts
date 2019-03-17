import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class AddInventoryItemEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        let ItemId = packet.PopInt();
        let Name = packet.PopString();
        let Desc = decodeURIComponent(packet.PopString());
        let Category = packet.PopInt();
        let Count = packet.PopInt();
        let UseType = packet.PopInt();

        let Item = Wibbo.GetStore().rp_inventory.filter(x => x.id === ItemId);
        if (Item.length == 0) {
            Wibbo.GetStore().rp_inventory.push({ 'id': ItemId, 'name': Name, 'desc': Desc, 'count': Count, 'category': Category, 'usetype': UseType });
            return;
        }

        Item[0].count += Count;

        Wibbo.GetStore().rpbox_inventory_open = true;
    }
}