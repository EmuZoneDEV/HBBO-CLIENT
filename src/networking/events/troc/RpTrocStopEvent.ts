import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class RpTrocStopEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        Wibbo.GetStore().rp_inventory_troc_open = false;
        Wibbo.GetStore().rp_troc_target_settings = { userid: 0, username: "", accepte: false, confirme: false };
        Wibbo.GetStore().rp_troc_settings = { accepte: false, confirme: false };
        
        Wibbo.GetStore().rp_troc_my_items.splice(0, Wibbo.GetStore().rp_troc_my_items.length); //Clean
        Wibbo.GetStore().rp_troc_target_items.splice(0, Wibbo.GetStore().rp_troc_target_items.length); //Clean
    }
}