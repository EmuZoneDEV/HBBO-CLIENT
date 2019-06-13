export default class ServerPacket {

    private _id: number;
    private _body: Array<ByteType>;
    private _byteLength: number;
    
    constructor(Header: number) {
        this._id = Header;
        this._body = new Array();
        this._byteLength = 0;

        this.AppendShort(Header);
    }

    AppendString(s: string) {
        let text: string = unescape(encodeURIComponent(s));

        this._body.push(new ByteType(text.length, "Short"));
        this._body.push(new ByteType(text, "String"));
        this._byteLength += text.length + 2;
    }

    AppendInt(b: number) {
        this._body.push(new ByteType(b, "Int"));
        this._byteLength += 4;
    }

    AppendShort(b: number) {
        this._body.push(new ByteType(b, "Short"));
        this._byteLength += 2;
    }

    AppendBoolean(Bool: boolean) {
        this._body.push(new ByteType(Bool ? 1 : 0, "Byte"));
        this._byteLength += 1;
    }

    AppendBytes(b: number) {
        this._body.push(new ByteType(b, "Byte"));
        this._byteLength += 1;
    }

    GetBytes(): Uint8Array {
        let TotalLengh: number = this._byteLength + 4;

        let buff: ArrayBuffer = new ArrayBuffer(TotalLengh);
        let bytearray: Uint8Array = new Uint8Array(buff);

        let Pos: number = 0;

        bytearray[Pos++] = TotalLengh >> 24;
        bytearray[Pos++] = TotalLengh >> 16;
        bytearray[Pos++] = TotalLengh >> 8;
        bytearray[Pos++] = TotalLengh;


        for (let element of this._body) {
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