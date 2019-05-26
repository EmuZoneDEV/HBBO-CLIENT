import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class RemoveItemInventoryRpEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        let ItemId = packet.PopInt();
        let Count = packet.PopInt();

        let Item = Wibbo.GetStore().rp_inventory.filter(x => x.id === ItemId)[0];
        if (Item == null)
            return;

        Item.count -= Count;

        if (Item.count == 0) {
            for (let i = 0; i < Wibbo.GetStore().rp_inventory.length; i++)
                if (Wibbo.GetStore().rp_inventory[i].id === ItemId) {
                    Wibbo.GetStore().rp_inventory.splice(i, 1);
                    break;
                }
        }
    }
}