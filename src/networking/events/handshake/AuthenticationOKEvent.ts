import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';
import Wibbo from '../../../Wibbo';

export default class AuthenticationOKEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        console.log("Authentification réussi");

        Wibbo.StartPing();

        Wibbo.GetStore().connected = true;
    }

}