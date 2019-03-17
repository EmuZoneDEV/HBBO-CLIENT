import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class PingComposer extends ServerPacket {
    constructor() {
        super(ComposerHeader.Ping); //HeadId
    }
}