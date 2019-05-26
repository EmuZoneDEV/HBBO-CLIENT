export default class ClientPacket {

    private Body: Uint8Array;
    private Pointer: number;

    constructor(body: Uint8Array) {
        this.Body = body;
        this.Pointer = 0;
    }

    private RemainingLength(): number {
        return this.Body.length - this.Pointer;
    }

    PopInt(): number {
        let len: Uint8Array = this.ReadBytes(4);
        return this.DecodeInt32(len);
    }

    PopShort(): number {
        let len: Uint8Array = this.ReadBytes(2);
        return this.DecodeInt16(len);
    }

    PopString(): string {
        let len: number = this.PopShort();
        let bytes: Uint8Array = this.ReadBytes(len);

        let Value: string = String.fromCharCode.apply(null, <any>bytes);
        try {
            Value = decodeURIComponent(escape(Value));
        } catch{}

        return Value;
    }

    PopBoolean(): boolean {
        return this.ReadBytes(1)[0] == 1;
    }

    private ReadBytes(Bytes: number): Uint8Array {
        if (Bytes > this.RemainingLength())
            Bytes = this.RemainingLength();

        let buffer: ArrayBuffer = new ArrayBuffer(Bytes);
        let data: Uint8Array = new Uint8Array(buffer);
        for (let i = 0; i < Bytes; i++)
            data[i] = this.Body[this.Pointer++];

        return data;
    }

    private DecodeInt32(v: Uint8Array): number {
        return (v[0] << 24) + (v[1] << 16) + (v[2] << 8) + (v[3]);
    }

    private DecodeInt16(v: Uint8Array): number {
        return (v[0] << 8) + (v[1]);
    }
}