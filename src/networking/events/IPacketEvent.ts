import ClientPacket from "./ClientPacket";

export default interface IPacketEvent {
    Parse(packet: ClientPacket): void;
}