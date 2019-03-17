import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpUseItemComposer extends ServerPacket {
    constructor(ItemId: number, Count: number) {
        super(ComposerHeader.RpUseItems); //HeadId

        this.AppendInt(ItemId);
        this.AppendInt(Count);
    }
}