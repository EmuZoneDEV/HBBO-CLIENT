import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';
import SoundType from '../../../sound/SoundType';

export default class NotifAlertEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        Wibbo.GetStore().notif_alert_open = true;
        Wibbo.GetStore().notif_alert_image = packet.PopString();
        Wibbo.GetStore().notif_alert_title = packet.PopString();
        Wibbo.GetStore().notif_alert_message = packet.PopString();
        Wibbo.GetStore().notif_alert_textbutton = packet.PopString();
        Wibbo.GetStore().notif_alert_roomid = packet.PopInt();
        Wibbo.GetStore().notif_alert_url = packet.PopString();

        if(Wibbo.GetStore().notif_alert_url == "")
            Wibbo.GetTimeoutManager().CloseNotifAlert();

        if(Wibbo.GetStore().notif_alert_roomid > 0)
            Wibbo.GetSoundManager().playSound("animation_warn", SoundType.SYSTEME, false);
    }

}