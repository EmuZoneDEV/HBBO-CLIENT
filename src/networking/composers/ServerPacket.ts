export default class ServerPacket {

    private Id: number;
    private Body: Array<ByteType>;
    private ByteLength: number;
    
    constructor(Header: number) {
        this.Id = Header;
        this.Body = new Array();
        this.ByteLength = 0;

        this.AppendShort(Header);
    }

    AppendString(s: string) {
        let text: string = unescape(encodeURIComponent(s));

        this.Body.push(new ByteType(text.length, "Short"));
        this.Body.push(new ByteType(text, "String"));
        this.ByteLength += text.length + 2;
    }

    AppendInt(b: number) {
        this.Body.push(new ByteType(b, "Int"));
        this.ByteLength += 4;
    }

    AppendShort(b: number) {
        this.Body.push(new ByteType(b, "Short"));
        this.ByteLength += 2;
    }

    AppendBoolean(Bool: boolean) {
        this.Body.push(new ByteType(Bool ? 1 : 0, "Byte"));
        this.ByteLength += 1;
    }

    AppendBytes(b: number) {
        this.Body.push(new ByteType(b, "Byte"));
        this.ByteLength += 1;
    }

    GetBytes(): Uint8Array {
        let TotalLengh: number = this.ByteLength + 4;

        let buff: ArrayBuffer = new ArrayBuffer(TotalLengh);
        let bytearray: Uint8Array = new Uint8Array(buff);

        let Pos: number = 0;

        bytearray[Pos++] = TotalLengh >> 24;
        bytearray[Pos++] = TotalLengh >> 16;
        bytearray[Pos++] = TotalLengh >> 8;
        bytearray[Pos++] = TotalLengh;


        for (let element of this.Body) {
            if (element.Type == "Byte") {
                bytearray[Pos++] = <number>element.Content;
            }
            else if (element.Type == "Short") {
                let MonChiffre: number = <number>element.Content;

                bytearray[Pos++] = MonChiffre >> 8;
                bytearray[Pos++] = MonChiffre;
            }
            else if (element.Type == "Int") {
                let MonChiffre: number = <number>element.Content;

                bytearray[Pos++] = MonChiffre >> 24;
                bytearray[Pos++] = MonChiffre >> 16;
                bytearray[Pos++] = MonChiffre >> 8;
                bytearray[Pos++] = MonChiffre;
            }
            else if (element.Type == "String") {
                let Text = <string>element.Content;
                let strLen: number = Text.length

                for (let i: number = 0; i < strLen; i++) {
                    bytearray[Pos++] = Text.charCodeAt(i);
                }
            }
        }

        return bytearray;
    }
}

class ByteType {

    Type: string;
    Content: string|number;

    constructor(Body: string|number, type: string) {
        this.Type = type;
        this.Content = Body;
    }
}