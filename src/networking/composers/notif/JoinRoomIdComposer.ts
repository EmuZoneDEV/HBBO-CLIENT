import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class JoinRoomIdComposer extends ServerPacket {
    constructor(RoomId: number) {
        super(ComposerHeader.JoinRoomId); //HeadId

        this.AppendInt(RoomId);
    }
}