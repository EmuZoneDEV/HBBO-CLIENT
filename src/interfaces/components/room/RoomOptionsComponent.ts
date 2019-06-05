import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import Html from './html/RoomOptions.html';

export default Vue.extend({
    template: Html,

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