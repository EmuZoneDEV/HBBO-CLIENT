import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class YoutubeTvEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        let ItemId = packet.PopInt();
        let VideoId = packet.PopString();

        if(ItemId == 0 && VideoId == "")
            return;

        Wibbo.GetStore().youtube_open = true;
        Wibbo.GetStore().youtube_itemid = ItemId;
        Wibbo.GetStore().youtube_videoid = VideoId;
        Wibbo.GetStore().youtube_edit_mode = (VideoId == "");
    }

}