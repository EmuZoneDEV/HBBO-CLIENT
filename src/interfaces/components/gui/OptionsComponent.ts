import Vue from 'vue';
import Wibbo from '../../../Wibbo';

/*
<div class="options" v-on:click="toggleFullScreen">
                <div class="fullscreen" v-on:click="toggleFullScreen"></div>
                <div class="settings" v-on:click="toggleSettings"></div>
                <div class="sound" v-on:click="toggleSound"></div>
            </div>
*/

export default Vue.component('fullscreen', {
    template: `
            
            <div class="fullscreen" v-on:click="toggleFullScreen">
                Plein écran
            </div>
            
            `,

    data: function () {
        return;
    },

    methods: {
        toggleFullScreen: function () {
            var document:any = window.document;
            let elem:any = document.body;

            if (!document.fullscreenElement && !document.msFullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
                 if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                  } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    document.webkitExitFullscreen();
                  } else if (document.msExitFullscreen) { /* IE/Edge */
                    document.msExitFullscreen();
                  }
            }
        },
        toggleSettings: function() {

        }, 
        toggleSound: function() {

        }
    }

});