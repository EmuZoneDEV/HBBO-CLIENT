import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import SendAlertComposer from '../../../networking/composers/wibbotool/SendAlertComposer';

export default Vue.component('wibbotool-hotelalert', {
    template: `
            <transition name="opacity">
            <div v-if="data.wibbotool_hotelalert" class="wibbotool_windows">
                <div class="title">Hotel alert</div>
                <div id="contenue">
                    <div class="help">Envoie une alert à tout l'hôtel</div>
                    <textarea v-model="message" placeHolder="Écris ici ton texte..." maxlength="1000"></textarea>
                    <input type="text" v-model="url" value="" placeHolder="Entre ici l'url du site"/><br />
                    <div class="checkbox"><input type="checkbox" v-model="checked"><label for="alert">Alert d'animation</label></div>
                    <div class="submit" v-on:click="SendMessage">Lancer</div><br />
                    <div class="submit" v-on:click="Preview">Prévisualisation</div>
                </div>
            </div>
            </transition>
            
            `,

    data: function () {
        return {
            data: Wibbo.GetStore(),
            message: "",
            checked: true,
            url: ""
        }
    },

    methods: {
        SendMessage: function () {
            if (this.message == "")
                return;
            Wibbo.GetWebSocketManager().SendPacket(new SendAlertComposer(this.checked, this.message, this.url));
            this.message = "";
            this.url = "";
        }, 
        Preview: function() {
            if (this.message == "")
                return;

            let MessageParseBbcode = this.message;
            MessageParseBbcode = MessageParseBbcode.replace(/</g, "&lt;");
            MessageParseBbcode = MessageParseBbcode.replace(/>/g, "&gt;");
            MessageParseBbcode = MessageParseBbcode.replace(/\[b\](.*?)\[\/b\]/g, '<b>$1</b>');
            MessageParseBbcode = MessageParseBbcode.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>');
            MessageParseBbcode = MessageParseBbcode.replace(/\[i\](.*?)\[\/i\]/g, '<i>$1</i>');

            Wibbo.GetStore().notif_alert_open = true;
            Wibbo.GetStore().notif_alert_image = "game_promo_small";
            Wibbo.GetStore().notif_alert_title = "Prévisualisation";
            Wibbo.GetStore().notif_alert_message = MessageParseBbcode;
            Wibbo.GetStore().notif_alert_url = this.url;
            Wibbo.GetStore().notif_alert_textbutton = "Je veux y jouer !";
            Wibbo.GetStore().notif_alert_roomid = 0;
        }
    }
});