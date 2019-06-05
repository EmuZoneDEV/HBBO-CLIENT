import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import EditTvComposer from '../../../networking/composers/tvyoutube/EditTvComposer';
import Html from './html/Edit.html';

export default Vue.extend({

    template: Html,

    data: function () {
        return {
            videoid: '',
            data: Wibbo.GetStore()
        }
    },

    methods: {
        SendEdit: function () {
            if (this.videoid == "")
                return;
            Wibbo.GetWebSocketManager().SendPacket(new EditTvComposer(this.data.youtube_itemid, this.videoid));
            Wibbo.GetStore().youtube_open = false;
            this.videoid = "";
        }
    }
});