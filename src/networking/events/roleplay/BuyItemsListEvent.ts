import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class BuyItemsListEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        Wibbo.GetStore().rp_buyitems.splice(0, Wibbo.GetStore().rp_buyitems.length); //Clean
        
        let Count = packet.PopInt();

        if(Count > 0)
        {
            for(let i: number = 0;i < Count;i++)
            {
                let ItemId = packet.PopInt();
                let Name = packet.PopString();
                let Desc = decodeURIComponent(packet.PopString());
                let Price = packet.PopInt();
                Wibbo.GetStore().rp_buyitems.push({'id': ItemId, 'name': Name, 'desc': Desc, 'price': Price, 'count' : 1});
            }

            Wibbo.GetStore().rpbox_buyitems_open = true;
        } else {
            Wibbo.GetStore().rpbox_buyitems_open = false;
        }
    }
}