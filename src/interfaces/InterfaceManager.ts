import Vue from 'vue';
import FullScreenComponent from './components/gui/FullScreenComponent';
import YoutubeComponent from './components/youtube/YoutubeComponent';
import YoutubEditTvComponent from './components/youtube/YoutubEditTvComponent';
import YoutubePlayerComponent from './components/youtube/YoutubePlayerComponent';
import WibboToolComponent from './components/tool/WibboToolComponent';
import HotelAlertComponent from './components/tool/HotelAlertComponent';
import ChatlogPubComponent from './components/tool/ChatlogPubComponent';
import RoomOptionsComponent from './components/room/RoomOptionsComponent';
import SettingsBoxComponent from './components/room/SettingsBoxComponent';
import InfoBulleComponent from './components/gui/InfoBulleComponent';
import RpStatsComponent from './components/rp/RpStatsComponent';
import RpBoxBuyItemsComponent from './components/rp/RpBoxBuyItemsComponent';
import RpInventoryComponent from './components/rp/RpInventoryComponent';
import RpInventoryChoiceComponent from './components/rp/RpInventoryChoiceComponent';
import NotifAlertComponent from './components/notif/NotifAlertComponent';
import NotifTopComponent from './components/notif/NotifTopComponent';
import RpInventoryTrocComponent from './components/rp/RpInventoryTrocComponent';

import DraggableDirective from './directives/DraggableDirective';
import InfoBulleDirective from './directives/InfoBulleDirective';

export default class InterfaceManager {

    constructor() {
        InterfaceManager.RegisterDirectives();
        InterfaceManager.RegisterComponents();

        new Vue({
            el: '#client-ui'
        });
    }
    
    private static RegisterDirectives() {
        DraggableDirective.Register();
        InfoBulleDirective.Register();
    }

    private static RegisterComponents() {
        Vue.component('youtube-box', YoutubeComponent);
        Vue.component('youtube-edit', YoutubEditTvComponent);
        Vue.component('youtube-player', YoutubePlayerComponent);

        Vue.component('wibbotool-hotelalert', HotelAlertComponent);
        Vue.component('wibbotool', WibboToolComponent);
        Vue.component('wibbotool-chatlogpub', ChatlogPubComponent);

        Vue.component('rpbox-buyitems', RpBoxBuyItemsComponent);
        Vue.component('rpbox-inventory-choice', RpInventoryChoiceComponent);
        Vue.component('rpbox-inventory', RpInventoryComponent);
        Vue.component('rpbox-inventory-troc', RpInventoryTrocComponent);
        Vue.component('rpstats', RpStatsComponent);

        Vue.component('room-options', RoomOptionsComponent);
        Vue.component('settings-box', SettingsBoxComponent);

        Vue.component('notifalert', NotifAlertComponent);
        Vue.component('notiftop', NotifTopComponent);

        Vue.component('infobulle', InfoBulleComponent);
        Vue.component('fullscreen', FullScreenComponent);
    }
}