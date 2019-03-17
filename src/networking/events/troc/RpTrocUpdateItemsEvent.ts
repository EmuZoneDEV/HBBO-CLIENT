import IPacketEvent from "../IPacketEvent";
import ClientPacket from "../ClientPacket";
import Wibbo from "../../../Wibbo";

export default class RpTrocUpdateItemsEvent implements IPacketEvent {
  public Parse(packet: ClientPacket) {
    let UserId = packet.PopInt();
    let ItemListCount = packet.PopInt();

    if (UserId == Wibbo.GetStore().rp_troc_target_settings.userid) {
      Wibbo.GetStore().rp_troc_target_items.splice(0,Wibbo.GetStore().rp_troc_target_items.length); //Clean

      if (ItemListCount > 0)
      {
        for (let i: number = 0; i < ItemListCount; i++) {
          let ItemId = packet.PopInt();
          let Name = packet.PopString();
          let Desc = decodeURIComponent(packet.PopString());
          let Count = packet.PopInt();

          Wibbo.GetStore().rp_troc_target_items.push({
            id: ItemId,
            name: Name,
            desc: Desc,
            count: Count
          });
        }
      }
    } else {
      Wibbo.GetStore().rp_troc_my_items.splice(0,Wibbo.GetStore().rp_troc_my_items.length); //Clean

      if (ItemListCount > 0)
      {
        for (let i: number = 0; i < ItemListCount; i++) {
          let ItemId = packet.PopInt();
          let Name = packet.PopString();
          let Desc = decodeURIComponent(packet.PopString());
          let Count = packet.PopInt();

          Wibbo.GetStore().rp_troc_my_items.push({
            id: ItemId,
            name: Name,
            desc: Desc,
            count: Count
          });
        }
      }
    }
  }
}
