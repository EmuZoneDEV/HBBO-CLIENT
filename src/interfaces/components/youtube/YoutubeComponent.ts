import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import Html from './html/Box.html';

export default Vue.extend({

    template: Html,

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