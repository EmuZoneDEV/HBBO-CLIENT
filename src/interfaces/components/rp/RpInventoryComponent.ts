import Vue from "vue";
import Wibbo from "../../../Wibbo";
import RpTrocStopComposer from "../../../networking/composers/troc/RpTrocStopComposer";
import RpTrocAddItemComposer from "../../../networking/composers/troc/RpTrocAddItemComposer";

export default Vue.component("rpbox-inventory", {
  template: `
            <transition name="opacity">
            <div class="box rp_inventory" v-if="data.connected && data.rp_mode" v-show="data.rpbox_inventory_open && data.in_room" v-bind:style="CenterBox" movebox>
            <div class="box_head" v-draggable>
                <div class="box_croix" v-on:click="Close"></div>
                    Ton inventaire
                </div>
                <div class="box_body">

                <nav>
                    <ul>
                        <li class="bottom_lign"></li>
                        <li v-for="nav in navs" :class="{active: nav.id == selected, nav_sub: true}" @click="Nav(nav.id)">{{nav.name}}</li>
                    </ul>
                </nav>

                    <div class="scroll_bar">
                        <ul>
                            <li class="item_container" v-for="(item, index) in GetItems" v-infobulle="item.desc" v-on:click="ClickOnItem(item.id)">
                                <img v-if="item.name != ''" v-bind:src="'items/'+ item.name +'.png'" class="item">
                                <div class="item_count">{{item.count}}</div>
                            </li>
                        </ul>
                    </div>
                    <slot></slot>
                </div>
                </div>
            </transition>
            `,
  data: function() {
    return {
      data: Wibbo.GetStore(),
      selected: 0,
      navs: [
        { id: -1, name: "Tous" },
        { id: 0, name: "Équipement" },
        { id: 1, name: "Objets utilisables" },
        { id: 2, name: "Ressources" },
        { id: 3, name: "Objets de quête" }
      ]
    };
  },
  computed: {
    GetItems: function() {
      let ItemsList: { id: number, name: string, desc: string, count: number, category: number }[] = []; // objCopy will store a copy of the mainObj

      for(let key in Wibbo.GetStore().rp_inventory)
      {
        let value = Wibbo.GetStore().rp_inventory[key];
        let TrocCount = 0;
        if(Wibbo.GetStore().rp_inventory_troc_open)
        {
          let ItemTroc = Wibbo.GetStore().rp_troc_my_items.filter(x => x.id === value.id)[0];
          if(ItemTroc != null)
            TrocCount = ItemTroc.count;
        }

        ItemsList.push({
          id: value.id,
          name: value.name,
          desc: value.desc,
          count: value.count - TrocCount,
          category: value.category
        });
      }

      if (this.selected >= 0)
        ItemsList = ItemsList.filter(x => x.category === this.selected);

      return ItemsList;
    },
    CenterBox: function() {
      let Width: number = 540;
      let cWi: number = ((window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth) / 2) - (Width / 2);
      let cHe: number = Math.floor((((window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight) / 2) / 100) * 60);

      return { left: cWi + "px", top: cHe + "px" };
    }
  },
  methods: {
    Close: function() {
      Wibbo.GetStore().rpbox_inventory_open = false;
      if(Wibbo.GetStore().rp_inventory_troc_open)
        Wibbo.GetWebSocketManager().SendPacket(new RpTrocStopComposer());
    },
    ClickOnItem: function(ItemId: number) {
      let Item = Wibbo.GetStore().rp_inventory.filter(x => x.id === ItemId);
      if (Item.length == 0) return;

      if (Item[0].count <= 0) return;

      if(Wibbo.GetStore().rp_inventory_troc_open)
      {
        if(Wibbo.GetStore().rp_troc_settings.accepte)
          return;
        Wibbo.GetWebSocketManager().SendPacket(new RpTrocAddItemComposer(ItemId));
      } else {
        Wibbo.GetStore().rp_item_choice = Item[0];
        Wibbo.GetStore().rpbox_inventory_choice_open = true;
      }
    },
    Nav: function(Id: number) {
      this.selected = Id;
    }
  }
});
