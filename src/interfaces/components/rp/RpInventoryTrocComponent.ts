import Vue from "vue";
import Wibbo from "../../../Wibbo";
import RpTrocStopComposer from "../../../networking/composers/troc/RpTrocStopComposer";
import RpTrocRemoveItemComposer from "../../../networking/composers/troc/RpTrocRemoveItemComposer";
import RpTrocConfirmeComposer from "../../../networking/composers/troc/RpTrocConfirmeComposer";
import RpTrocAccepteComposer from "../../../networking/composers/troc/RpTrocAccepteComposer";
import Html from './html/RpInventoryTroc.html';

export default Vue.extend({
  
  template: Html,

  data: function() {
    return {
      data: Wibbo.GetStore(),
      btn_text: "Accepter"
    };
  },
  computed: {
    GetMyItems: function() {
      return Wibbo.GetStore().rp_troc_my_items;
    },
    GetSellerItems: function() {
      return Wibbo.GetStore().rp_troc_target_items;
    },
    SellerEmptyBoxCount: function() {
      return 9 - Wibbo.GetStore().rp_troc_target_items.length;
    },
    MyEmptyBoxCount: function() {
      return 9 - Wibbo.GetStore().rp_troc_my_items.length;
    },
    BtnTrocText: function() {
      let text = "Accepter";
      if(Wibbo.GetStore().rp_troc_settings.accepte && !Wibbo.GetStore().rp_troc_target_settings.accepte)
        text = "Modifier l'échange";
      else if(Wibbo.GetStore().rp_troc_settings.accepte && Wibbo.GetStore().rp_troc_target_settings.accepte)
        text = "Confirmer";
      return text;
    },
    BtnTrocDisabled: function() {
      if(Wibbo.GetStore().rp_troc_my_items.length == 0 && Wibbo.GetStore().rp_troc_target_items.length == 0)
        return true;
      else 
        return false;
    }
  },
  methods: {
    Close: function() {
      Wibbo.GetWebSocketManager().SendPacket(new RpTrocStopComposer());
    },
    ClickOnItem: function(ItemId: number) {
      if(Wibbo.GetStore().rp_troc_settings.accepte)
        return;

      let Item = Wibbo.GetStore().rp_inventory.filter(x => x.id === ItemId);
      if (Item.length == 0) 
        return;

      Wibbo.GetWebSocketManager().SendPacket(new RpTrocRemoveItemComposer(ItemId));
    },
    BtnTroc: function() {
      if(this.BtnTrocDisabled)
        return;

      if (!Wibbo.GetStore().rp_troc_settings.accepte || !Wibbo.GetStore().rp_troc_target_settings.accepte)
        Wibbo.GetWebSocketManager().SendPacket(new RpTrocAccepteComposer());
      else 
        Wibbo.GetWebSocketManager().SendPacket(new RpTrocConfirmeComposer());
    }
  }
});
