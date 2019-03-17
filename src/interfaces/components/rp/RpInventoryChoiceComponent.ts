import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import RpUseItemComposer from '../../../networking/composers/roleplay/RpUseItemComposer';

export default Vue.component('rpbox-inventory-choice', {
    template: `
            <transition name="opacity">
            <div class="box rp_inventory_choice" v-if="data.connected && data.rp_mode" v-show="data.rpbox_inventory_choice_open && data.in_room && data.rp_item_choice.count > 0" v-bind:style="CenterBox" movebox>
            <div class="box_head" v-draggable>
                <div class="box_croix" v-on:click="Close"></div>
                    Validation
                </div>
                <div class="box_body">
                    <h1 v-html="data.rp_item_choice.desc"></h1>
                    <div class="preview_item">
                        <img v-if="data.rp_item_choice.name != ''" v-bind:src="'items/' + data.rp_item_choice.name + '.png'" class="item">
                    </div>
                    <p>
                        <b>Objet(s) restant(s):</b> {{data.rp_item_choice.count}}
                    </p>
                    <p v-if="data.rp_item_choice.usetype == 2">
                        <b>Quantité à utiliser:</b> <input type="text" class="count_item" v-bind:value="usecount" v-on:input="SetCount($event)">
                    </p>
                    <div class="col_btn">
                        <button type="button" class="box_button green" v-on:click="UseItem" v-if="data.rp_item_choice.usetype != 0">Utiliser</button>
                        <button type="button" class="box_button disabled" v-on:click="UseItem" v-else>Utiliser</button>
                    </div>
                    <div class="col_btn">
                        <button type="button" class="box_button red" v-on:click="Close">Annuler</button>
                    </div>
                </div>
            </div>
            </transition>
            `,

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