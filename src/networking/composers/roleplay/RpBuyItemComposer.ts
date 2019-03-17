import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpBuyItemsComposer extends ServerPacket {
    constructor(ItemId: number, Count: number) {
        super(ComposerHeader.RpBuyItems); //HeadId

        this.AppendInt(ItemId);
        this.AppendInt(Count);
    }
}