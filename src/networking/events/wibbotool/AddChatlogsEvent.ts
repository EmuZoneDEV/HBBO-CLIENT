import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class AddChatlogsEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        let UserId = packet.PopInt();
        let Pseudo = packet.PopString();
        let Message = packet.PopString();
        Message = decodeURIComponent(Message);

        let d = new Date();
        let h = d.getHours().toString();
        let m = d.getMinutes().toString();

        if(h.length < 2)
            h = "0" + h;

        if(m.length < 2)
            m = "0" + m;

        Wibbo.GetStore().chatlog_pub.push({'userid': UserId, 'time': h + ":" + m, 'pseudo': Pseudo, 'message': Message});

        if(Wibbo.GetStore().chatlog_pub.length > 50)
            Wibbo.GetStore().chatlog_pub.shift();

        Wibbo.GetStore().wibbotool_chatlogpub = true;
    }
}