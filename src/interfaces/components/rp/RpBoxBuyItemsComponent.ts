import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import RpBuyItemComposer from '../../../networking/composers/roleplay/RpBuyItemComposer';

export default Vue.component('rpbox-buyitems', {
    template: `
            <transition name="opacity">
            <div class="box rp_buyitems" v-if="data.connected && data.rp_mode" v-show="data.rpbox_buyitems_open && data.in_room" v-bind:style="CenterBox" movebox>
                <div class="box_head" v-draggable>
                    <div class="box_croix" v-on:click="Close"></div>
                    Achat d'objet
                </div>
                <div class="box_body">
                    <div class="scroll_bar">
                        <table>
                            <tr>
                                <th>Objet</th>
                                <th>Prix</th>
                                <th>Nombre</th>
                                <th>Action</th>
                            </tr>
                            <tr v-for="(item, index) in GetItems" v-bind:style="isOdd(index) ? 'background-color: #FFFFFF;' : '' ">
                                <td>
                                    <div v-bind:class="(item.price * item.count <= data.rp_money) ? 'container_item' : 'container_item no_money'" v-infobulle="item.desc">
                                        <img class="item" v-bind:src="'items/'+ item.name +'.png'">
                                    </div>
                                </td>

                                <td v-if="item.price > 0">{{ item.price }} Dollars</td>
                                <td v-else>Gratuit</td>

                                <td>
                                    <input type="text" class="count_item" v-bind:value="item.count" v-on:input="SetCount($event, item.id)">
                                </td>

                                <td v-if="item.price * item.count <= data.rp_money">
                                    <button type="button" class="box_button" v-on:click="BuyItem(item.id)" v-if="item.price > 0">Acheter</button>
                                    <button type="button" class="box_button" v-on:click="BuyItem(item.id)" v-else>Prendre</button>
                                </td>
                                <td v-else>
                                    <button type="button" class="box_button disabled">Acheter</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            </transition>
            
            `,

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