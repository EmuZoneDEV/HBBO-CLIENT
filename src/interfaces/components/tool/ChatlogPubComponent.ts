import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import FollowUserIdComposer from '../../../networking/composers/wibbotool/FollowUserIdComposer';

export default Vue.component('wibbotool-chatlogpub', {
    template: `
            <transition name="opacity">
            <div v-if="data.wibbotool_chatlogpub" class="wibbotool_windows" style="width: 100%;">
            <div class="scroll_bar">
                <div class="title">ChatLog Pub</div>
                <center v-if="data.chatlog_pub.length == 0"><h1>Aucune log disponible</h1></center>

                <table v-else>
                <tr>
                    <th>Date</th>
                    <th>Pseudo</th>
                    <th>Message</th>
                </tr>
                
                <tr v-for="(log, index) in GetLogs" v-bind:style="isOdd(index) ? 'background-color: #FFFFFF;' : '' ">
                    <td><i>{{log.time}}</i></td>
                    <td class="log_pseudo" v-on:click="FollowUser(log.userid)" v-infobulle="'Rejoindre ' + log.pseudo">{{log.pseudo}}</td>
                    <td class="log_message">{{log.message}}</td>
                </tr>
                </table>
                </div>
            </div>
            </transition>
            
            `,

    data: function () {
        return {
            data: Wibbo.GetStore(),
        }
    },
    computed: {
        GetLogs: function () {
            return Wibbo.GetStore().chatlog_pub.slice(0).reverse();
        }
    },
    methods: {
        isOdd: function (Num: number) {
            return Num % 2;
        },
        FollowUser: function (UserId: number) {
            Wibbo.GetWebSocketManager().SendPacket(new FollowUserIdComposer(UserId));
        }
    }
});