import ServerPacket from '../ServerPacket';
import ComposerHeader from '../ComposerHeader';

export default class RpBotChooseComposer extends ServerPacket {
    constructor(Code: string) {
        super(ComposerHeader.RpBotChoose); //HeadId

        this.AppendString(Code);
    }
}