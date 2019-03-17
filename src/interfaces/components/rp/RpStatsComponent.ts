import Vue from "vue";
import Wibbo from "../../../Wibbo";

export default Vue.component("rpstats", {
  template: `

            <div class="rp_stats" v-if="data.connected && data.rp_mode" v-show="data.in_room" style="position:absolute;left: 10px; top: 45px;" movebox>
             <div class="box rp_barre vie" v-infobulle="infobulle[0]" v-draggable>
                <div class="barre_fond vie_fond"></div>
                <div class="barre_pourcent vie_pourcent" v-bind:style="{ width: LifePourcent + '%' }"></div>
                <span class="barre_text">{{data.rp_health}}/{{data.rp_maxhealh}}</span>
            </div>
            <div class="box rp_barre energy" v-infobulle="infobulle[1]" v-draggable>
                <div class="barre_fond energy_fond"></div>
                <div class="barre_pourcent energy_pourcent" v-bind:style="{ width: EnergyPourcent + '%' }"></div>
                <span class="barre_text">{{data.rp_energy}}/100</span>
            </div>
        
        <span class="box rp_stat argent" v-infobulle="infobulle[2]" v-draggable>{{Monaie}}</span>
        <span class="box rp_stat balle" v-infobulle="infobulle[3]" v-draggable>{{data.rp_munition}}</span>
        <span class="box rp_stat level" v-infobulle="infobulle[4]" v-draggable>{{data.rp_level}}</span>

        <span class="rp_stat sac_inventory" v-on:click="OpenCloseInventory" v-infobulle="infobulle[5]" v-draggable></span>
    </div>
            
            `,

  data: function() {
    return {
      data: Wibbo.GetStore(),
      infobulle: [
        "Barre de vie",
        "Barre d'énergie",
        "Argent",
        "Munition",
        "Level",
        "Ouvrir/Fermer l'inventaire"
      ]
    };
  },

  computed: {
    Heure: function() {
      let Now = new Date();

      let RpHourNow: number = Math.floor(((Now.getMinutes() * 60) + Now.getSeconds()) / 150); //150sec = 2m30s = 1heure dans le rp
      let RpMinuteNow: number = Math.floor(((Now.getMinutes() * 60) + Now.getSeconds()) - (RpHourNow * 150) / 2.5);

      if (RpHourNow >= 16)
          RpHourNow = (RpHourNow + 8) - 24;
      else
          RpHourNow = RpHourNow + 8;

      return RpHourNow + ":" + RpMinuteNow;
    },
    Monaie: function() {
      return new Intl.NumberFormat().format(Wibbo.GetStore().rp_money);
    },
    LifePourcent: function() {
      return Math.floor((Wibbo.GetStore().rp_health / Wibbo.GetStore().rp_maxhealh) * 100);
    },
    EnergyPourcent: function() {
      return Math.floor((Wibbo.GetStore().rp_energy / 100) * 100);
    }
  },

  methods: {
    OpenCloseInventory: function() {
      Wibbo.GetStore().rpbox_inventory_open = !Wibbo.GetStore().rpbox_inventory_open;
    },
    OpenCloseShopWp: function() {

    }
  }
});
