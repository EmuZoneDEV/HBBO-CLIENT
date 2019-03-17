import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import EditTvComposer from '../../../networking/composers/tvyoutube/EditTvComposer';

export default Vue.component('youtube-edit', {
    template: `

            <div class="box_body" v-show="data.youtube_edit_mode">
            <div class="box_form">
            <input v-model="videoid" type="text" size="32" value="" :placeholder="'https://www.youtube.com/watch?v=' + data.youtube_videoid" class="box_input">
              </span>
				<button type="button" class="box_button" v-on:click="SendEdit">Editer</button>
            </div>
            </div>
            
            `,

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