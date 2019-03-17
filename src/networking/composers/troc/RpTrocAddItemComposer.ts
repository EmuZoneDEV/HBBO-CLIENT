import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpTrocAddItemComposer extends ServerPacket {
    constructor(ItemId: number) {
        super(ComposerHeader.RpTrocAddItem); //HeadId

        this.AppendInt(ItemId);
    }
}