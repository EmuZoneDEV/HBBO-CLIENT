import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import Html from './html/Tool.html';

export default Vue.extend({

    template: Html,

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