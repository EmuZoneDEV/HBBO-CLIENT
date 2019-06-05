import Vue from "vue";
import Wibbo from "../../../Wibbo";
import Html from './html/RpStats.html';

export default Vue.extend({
  
  template: Html,

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
