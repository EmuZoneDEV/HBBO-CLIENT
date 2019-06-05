import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import Html from './html/Player.html';

export default Vue.extend({

    template: Html,

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    }
});