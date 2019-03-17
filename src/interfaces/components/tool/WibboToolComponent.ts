import Vue from 'vue';
import Wibbo from '../../../Wibbo';

export default Vue.component('wibbotool', {
    template: `
            
            <div movebox v-if="data.connected && data.wibbotool_open" style="position:absolute;left: 200px; top: 200px;">

            <div style="float: left;">
            <div class="wibbotool">
			<div class="entete" v-draggable>Wibbo Tool</div>
			<div class="outils">
                <button class="tool" v-on:click="ToggleHotel()">Hotel alert</button>
                <button class="tool" v-on:click="ToggleChatlogPub()">Chatlog Pub</button>
			</div>
            </div>
            </div>

            <div style="float: left;">
                <slot></slot>
            </div>
            </div>
            `,

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    },

    methods: {
        ToggleChatlogPub: function () {
            Wibbo.GetStore().wibbotool_chatlogpub = !Wibbo.GetStore().wibbotool_chatlogpub;
        },
        ToggleHotel: function () {
            Wibbo.GetStore().wibbotool_hotelalert = !Wibbo.GetStore().wibbotool_hotelalert;
        }
    }
});