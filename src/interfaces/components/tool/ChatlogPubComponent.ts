import Vue from 'vue';
import Wibbo from '../../../Wibbo';
import FollowUserIdComposer from '../../../networking/composers/wibbotool/FollowUserIdComposer';
import Html from './html/Chatlog.html';

export default Vue.extend({

    template: Html,

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