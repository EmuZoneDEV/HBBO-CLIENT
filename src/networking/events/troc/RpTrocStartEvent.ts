import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class RpTrocStartEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        let OtherUserId: number = packet.PopInt();
        let OtherUsername: string = packet.PopString();

        Wibbo.GetStore().rp_inventory_troc_open = true;
        Wibbo.GetStore().rp_troc_target_settings = {
             userid: OtherUserId, username: OtherUsername, accepte: false, confirme: false 
            };
        Wibbo.GetStore().rp_troc_settings = {
             accepte: false, confirme: false 
            };

        Wibbo.GetStore().rpbox_inventory_open = true;

    }
}