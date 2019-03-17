import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class EditTvComposer extends ServerPacket {
    constructor(ItemId: number, VideoId: string) {
        super(ComposerHeader.EditTv); //HeadId

        this.AppendInt(ItemId);
        this.AppendString(VideoId);
    }
}