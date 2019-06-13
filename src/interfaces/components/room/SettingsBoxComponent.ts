import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import Html from './html/SettingsBox.html';

export default Vue.extend({

    template: Html,

    data: function () {
        return {
            data: Wibbo.GetStore(),
            setspeed: 0
        }
    },

    methods: {
        Close: function () {
            Wibbo.GetStore().settings_box = false;
        }
    }
});