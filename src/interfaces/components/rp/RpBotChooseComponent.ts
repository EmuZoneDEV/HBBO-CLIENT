import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import RpBotChooseComposer from '../../../networking/composers/roleplay/RpBotChooseComposer';
import Html from './html/RpBotChoose.html';

export default Vue.extend({
    template: Html,

    data: function () {
        return {
            data: Wibbo.GetStore(),
        }
    },
    computed: {
        GetChoose: function () {
            return Wibbo.GetStore().rp_botchoose;
        },
    },
    methods: {
        Click: function (Code: string) {
            if(Code != "")
                Wibbo.GetWebSocketManager().SendPacket(new RpBotChooseComposer(Code));
                
            Wibbo.GetStore().rp_botchoose.splice(0, Wibbo.GetStore().rp_botchoose.length); //Clean
        }
    }
});