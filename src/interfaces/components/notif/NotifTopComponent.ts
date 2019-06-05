import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import Html from './html/NotifTop.html';

export default Vue.extend({

    template: Html,

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