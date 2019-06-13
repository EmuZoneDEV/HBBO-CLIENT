import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class BotChooseEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {

        Wibbo.GetStore().rp_botchoose.splice(0, Wibbo.GetStore().rp_botchoose.length); //Clean
        
        let Count = packet.PopInt();

        if(Count > 0)
        {
            for(let i: number = 0;i < Count;i++)
            {
                let username = packet.PopString();
                let code = packet.PopString();
                let message = decodeURIComponent(packet.PopString());
                let look = packet.PopString();
                Wibbo.GetStore().rp_botchoose.push( { username: username, message: message, code: code, look: look });
            }
        }
    }
}