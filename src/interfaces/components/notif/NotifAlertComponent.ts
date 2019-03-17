import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import JoinRoomIdComposer from '../../../networking/composers/notif/JoinRoomIdComposer';

export default Vue.component('notifalert', {
    template: `

            <transition name="opacity">
                <div class="notif_alert" v-if="data.connected && data.notif_alert_open" movebox>
                <div class="head" v-draggable>
                    <div class="croix" v-on:click="Close">×</div>
                    {{data.notif_alert_title}}
                </div>
                <div class="box_body" style="padding: 5px;">

                    <div class="col_right">
                        <img v-if="data.notif_alert_image != ''" v-bind:src="'https://swf.wibbo.me/dcr/c_images/notifications/' + data.notif_alert_image + '.png'" />
                    </div>
                    <div class="col_left">
                        <div class="message" v-html="data.notif_alert_message">
                        </div>
                        <button type="button" class="box_button" v-on:click="JoinRoom">{{data.notif_alert_textbutton}}</button>
                    </div>
                </div>
            </div>
            </transition>
            
            `,

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