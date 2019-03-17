import Vue from 'vue';
import Wibbo from '../../../Wibbo';

export default Vue.component('infobulle', {
    template: `

            <div v-if="data.connected && data.in_room" id="infobulle"></div>
            
            `,

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    }

});