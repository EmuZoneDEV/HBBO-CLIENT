import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import RpBuyItemComposer from '../../../networking/composers/roleplay/RpBuyItemComposer';
import Html from './html/RpBoxBuyItems.html';

export default Vue.extend({
    template: Html,

    data: function () {
        return {
            data: Wibbo.GetStore(),
        }
    },
    computed: {
        GetItems: function () {
            return Wibbo.GetStore().rp_buyitems;
        },
        CenterBox: function () {
            let Width: number = 180;
            let cWi: number = ((window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth) / 2) - (Width / 2);
            let cHe: number = Math.floor((((window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight) / 2) / 100) * 60);

            return { left: cWi + "px", top: cHe + "px" }
        }
    },
    methods: {
        Close: function () {
            Wibbo.GetStore().rpbox_buyitems_open = false;
        },
        isOdd: function (Num: number) {
            return Num % 2;
        },
        BuyItem: function (ItemId: number) {

            let Item = Wibbo.GetStore().rp_buyitems.filter(x => x.id === ItemId);
            if (Item.length == 0)
                return;

            if (Item[0].price > Wibbo.GetStore().rp_money)
                return;

            Wibbo.GetWebSocketManager().SendPacket(new RpBuyItemComposer(ItemId, Item[0].count));
        },
        SetCount: function(event: any, ItemId: number) {
            let IntValue: number = 1;
            let value = event.target.value;
            

            let Item = Wibbo.GetStore().rp_buyitems.filter(x => x.id === ItemId);
            if (Item.length == 0)
                return;

            IntValue = parseInt(value);

            if(isNaN(IntValue))
                IntValue = 1;

            if(IntValue < 1)
                IntValue = 1;
            if(IntValue > 99)
                IntValue = 99;

            Item[0].count = IntValue;
            value = IntValue;

            this.$refs.input = value;
            this.$forceUpdate();
        }
    }
});