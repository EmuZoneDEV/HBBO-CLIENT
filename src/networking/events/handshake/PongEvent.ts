import IPacketEvent from '../IPacketEvent';
import ClientPacket from '../ClientPacket';

export default class PongEvent implements IPacketEvent {

    public Parse(packet: ClientPacket) {
        console.log("Ping!");
    }

}