import Vue from 'vue';
import Wibbo from '../../../Wibbo';

export default Vue.component('notiftop', {
    template: `

            <transition name="slide-y">
                <div class="notif_top" v-if="data.notif_top_open">
                    <div class="croix" v-on:click="Close">×</div>
                    <div class="notif_img"></div>
                    <div class="message" v-html="GetNotif"></div>
                </div>
            </transition>
            
            `,

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    },

    computed: {
        GetNotif: function() {
            let MessageParseBbcode = Wibbo.GetStore().notif_top_message;
            if(Wibbo.GetStore().notif_top_message == "")
                return "";

            MessageParseBbcode = MessageParseBbcode.replace(/</g, "&lt;");
            MessageParseBbcode = MessageParseBbcode.replace(/>/g, "&gt;");
            MessageParseBbcode = MessageParseBbcode.replace(/\[b\](.*?)\[\/b\]/g, '<b>$1</b>');
            MessageParseBbcode = MessageParseBbcode.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>');
            MessageParseBbcode = MessageParseBbcode.replace(/\[i\](.*?)\[\/i\]/g, '<i>$1</i>');

            return MessageParseBbcode;
        }
    },

    methods: {
        Close: function () {
            Wibbo.GetTimeoutManager().CloseNotifTop(true);
            
        },
    }

});