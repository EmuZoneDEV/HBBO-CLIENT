import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class SendAlertComposer extends ServerPacket {
    constructor(eventalert: boolean, message: string, url: string) {
        super(ComposerHeader.SendAlert); //HeadId

        this.AppendBoolean(eventalert);
        this.AppendString(message);
        this.AppendString(url);
    }
}