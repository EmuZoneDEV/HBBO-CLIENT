import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class FollowUserIdComposer extends ServerPacket {
    constructor(UserId: number) {
        super(ComposerHeader.FollowUserId); //HeadId

        this.AppendInt(UserId);
    }
}