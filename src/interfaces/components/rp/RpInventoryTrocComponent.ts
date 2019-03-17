import Vue from "vue";
import Wibbo from "../../../Wibbo";
import RpTrocStopComposer from "../../../networking/composers/troc/RpTrocStopComposer";
import RpTrocRemoveItemComposer from "../../../networking/composers/troc/RpTrocRemoveItemComposer";
import RpTrocConfirmeComposer from "../../../networking/composers/troc/RpTrocConfirmeComposer";
import RpTrocAccepteComposer from "../../../networking/composers/troc/RpTrocAccepteComposer";

export default Vue.component("rpbox-inventory-troc", {
  template: `
            <div class="troc" v-show="data.rp_inventory_troc_open">
              <div class="box_troc left">
                      <div v-bind:class="data.rp_troc_settings.accepte ? 'troc_info_user confirme' : 'troc_info_user'"><b>Tu</b> proposes</div>
                  <ul class="troc_items">
                      <li class="item_container" v-for="(item, index) in GetMyItems" v-infobulle="item.desc" @click="ClickOnItem(item.id)">
                        <img v-bind:src="'items/'+ item.name +'.png'" class="item">
                        <div class="item_count">{{item.count}}</div>
                      </li>
                        <li class="item_container" v-for="n in MyEmptyBoxCount">
                      </li>
                  </ul>
              </div>
              <div class="box_troc right">
                  <div v-bind:class="data.rp_troc_target_settings.accepte ? 'troc_info_user confirme' : 'troc_info_user'"><b>{{data.rp_troc_target_settings.username}}</b> propose</div>
                  <ul class="troc_items">
                      <li class="item_container fixed" v-for="(item, index) in GetSellerItems" v-infobulle="item.desc">
                        <img v-bind:src="'items/'+ item.name +'.png'" class="item">
                        <div class="item_count">{{item.count}}</div>
                      </li>
                      <li class="item_container fixed" v-for="n in SellerEmptyBoxCount">
                      </li>
                  </ul>
              </div>
              <div class="bottom">
                  <div class="btn_left">
                      <button type="button" v-bind:class="(BtnTrocDisabled) ? 'box_button disabled' : 'box_button'" @click="BtnTroc">{{BtnTrocText}}</button>
                  </div>
                  <div class="btn_right">
                      <button type="button" class="box_button" @click="Close()">Annuler</button>
                  </div>
              </div>
              </div>
            </transition>
            `,
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
