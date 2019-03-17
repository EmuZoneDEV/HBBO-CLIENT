import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpTrocStopComposer extends ServerPacket {
    constructor() {
        super(ComposerHeader.RpTrocStop); //HeadId

    }
}