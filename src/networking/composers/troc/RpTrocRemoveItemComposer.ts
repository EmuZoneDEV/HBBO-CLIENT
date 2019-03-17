import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpTrocRemoveItemComposer extends ServerPacket {
    constructor(ItemId: number) {
        super(ComposerHeader.RpTrocRemoveItem); //HeadId

        this.AppendInt(ItemId);
    }
}