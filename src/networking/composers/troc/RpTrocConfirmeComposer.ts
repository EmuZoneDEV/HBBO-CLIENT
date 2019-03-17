import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpTrocConfirmeComposer extends ServerPacket {
    constructor() {
        super(ComposerHeader.RpTrocConfirme); //HeadId

    }
}