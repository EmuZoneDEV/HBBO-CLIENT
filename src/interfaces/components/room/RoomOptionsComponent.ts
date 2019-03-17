import Vue from 'vue';
import Wibbo from '../../../Wibbo';

export default Vue.component('room-options', {
    template: `
            
            <div v-if="data.connected && data.in_room" id="roomoptions">
            <div class="options_head" v-on:click="toggle">
             <div v-show="is_open" class="arrowleft"></div>
             <div v-show="!is_open" class="arrowright"></div>
             </div>
             <transition name="slide-x">
                <div v-show="is_open" class="options_panel">
                <div class="settings" v-infobulle="message_info" v-on:click="OpenSettings">Paramètres 2</div>
                </div>
             </transition>
            </div>
            
            `,

    data: function () {
        return {
            data: Wibbo.GetStore(),
            is_open: true,
            message_info: "Ouvir les paramètres de l'appart"
        }
    },

    methods: {
        toggle: function () {
            this.is_open = !this.is_open;
        },
        OpenSettings: function () {
            Wibbo.GetStore().settings_box = true;
        }
    }

});