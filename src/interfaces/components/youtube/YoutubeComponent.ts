import Vue from 'vue';
import Wibbo from '../../../Wibbo';

export default Vue.component('youtube-box', {
    template: `

            <div v-show="data.youtube_open" class="box" v-bind:style="CenterBox" movebox>
                <div class="box_head" v-draggable>
                    <div class="box_edit" v-if="data.youtube_itemid != 0" v-on:click="Edit"></div>
                    <div class="box_croix" v-on:click="Close"></div>
                    Vidéo Youtube
                </div>
                
                <slot></slot>
		    </div>
            
            `,

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    },
    computed: {
        CenterBox: function() {
            let Width: number = 560;
            let cWi: number = ((window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth) / 2) - (Width / 2);
            let cHe: number = Math.floor((((window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight) / 2) / 100) * 60);
      
            return { left: cWi + "px", top: cHe + "px" };
          }
    },
    methods: {
        Close: function () {
            Wibbo.GetStore().youtube_open = false;
        },
        Edit: function () {
            Wibbo.GetStore().youtube_edit_mode = true;
        }
    }
});