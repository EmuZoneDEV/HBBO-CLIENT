import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import RpUseItemComposer from '../../../networking/composers/roleplay/RpUseItemComposer';
import Html from './html/RpInventoryChoice.html';

export default Vue.extend({
    
    template: Html,

    data: function () {
        return {
            data: Wibbo.GetStore(),
            usecount: 1
        }
    },
    computed: {
        CenterBox: function() {
            let Width: number = 180;
            let cWi: number = ((window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth) / 2) - (Width / 2);
            let cHe: number = Math.floor((((window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight) / 2) / 100) * 70);

            return { left: cWi + "px", top: cHe + "px" }
        }
    },
    methods: {
        Close: function () {
            Wibbo.GetStore().rpbox_inventory_choice_open = false;
        },
        UseItem: function() {
            if(Wibbo.GetStore().rp_item_choice.id == 0)
                return;

            Wibbo.GetWebSocketManager().SendPacket(new RpUseItemComposer(Wibbo.GetStore().rp_item_choice.id, this.usecount));
        },
        SetCount: function(event: any) {
            let IntValue: number = 1;
            let value = event.target.value;
            

            let Item = Wibbo.GetStore().rp_item_choice;
            if (Item == null)
                return;

            IntValue = parseInt(value);

            if(isNaN(IntValue))
                IntValue = 1;

            if(IntValue < 1)
                IntValue = 1;
            if(IntValue > Item.count)
                IntValue = Item.count;

            this.usecount = IntValue;
            value = IntValue;

            this.$refs.input = value;
            this.$forceUpdate();
        }
    }
});