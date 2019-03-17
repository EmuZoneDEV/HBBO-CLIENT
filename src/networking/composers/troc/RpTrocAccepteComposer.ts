import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpTrocAccepteComposer extends ServerPacket {
    constructor() {
        super(ComposerHeader.RpTrocAccepte); //HeadId
        
    }
}