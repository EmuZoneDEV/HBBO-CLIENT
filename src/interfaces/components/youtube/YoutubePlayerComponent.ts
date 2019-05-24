import Vue from 'vue';
import Wibbo from '../../../Wibbo';

export default Vue.component('youtube-player', {

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    },

    template: `
            <div class="box_body" style="border: none;background-color: #000;" v-if="data.youtube_edit_mode == false && data.youtube_open == true">
                <iframe width="560" height="315" :src="'https://www.youtube.com/embed/' + data.youtube_videoid + '?autoplay=1'" allow="autoplay" frameborder="0" allowfullscreen></iframe>
            </div>
            `
});