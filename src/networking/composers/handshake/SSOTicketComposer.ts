import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class SSOTicketComposer extends ServerPacket {
    constructor(ticket: string) {
        super(ComposerHeader.SSOTicket); //HeadId

        this.AppendString(ticket);
    }
}