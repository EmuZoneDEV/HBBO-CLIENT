import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import JoinRoomIdComposer from '../../../networking/composers/notif/JoinRoomIdComposer';
import Html from './html/NotifAlert.html';

export default Vue.extend({
    
    template: Html,

    data: function () {
        return {
            data: Wibbo.GetStore()
        }
    },

    methods: {
        Close: function () {
            Wibbo.GetTimeoutManager().CloseNotifAlert(true);
        },
        JoinRoom: function () {
            if(Wibbo.GetStore().notif_alert_url == "")
            {
                Wibbo.GetTimeoutManager().CloseNotifAlert(true);
                Wibbo.GetWebSocketManager().SendPacket(new JoinRoomIdComposer(Wibbo.GetStore().notif_alert_roomid));
            } else {
                if(window == null)
                    return;
                let openurl = window.open(Wibbo.GetStore().notif_alert_url, "_blank");
                if(openurl == null)
                    return;
                openurl.focus();
            }
        }
    }

});