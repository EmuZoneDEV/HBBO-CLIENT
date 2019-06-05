import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import Html from './html/InfoBulle.html';

export default Vue.extend({
    
    template: Html,

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    }

});