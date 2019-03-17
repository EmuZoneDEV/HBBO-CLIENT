import Vue from 'vue';
import OptionsComponent from './components/gui/OptionsComponent';
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
        OptionsComponent;

        YoutubeComponent;
        YoutubEditTvComponent;
        YoutubePlayerComponent;

        WibboToolComponent;
        HotelAlertComponent;
        ChatlogPubComponent;

        RoomOptionsComponent;
        SettingsBoxComponent;
        InfoBulleComponent;

        NotifAlertComponent;
        NotifTopComponent;

        RpStatsComponent;
        RpBoxBuyItemsComponent;
        RpInventoryComponent;
        RpInventoryChoiceComponent;
        RpInventoryTrocComponent;
    }
}