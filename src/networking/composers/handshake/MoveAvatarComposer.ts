import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class MoveAvatarComposer extends ServerPacket {
    constructor(X: number, Y: number) {
        super(ComposerHeader.MoveAvatar); //HeadId

        this.AppendInt(X);
        this.AppendInt(Y);
    }
}