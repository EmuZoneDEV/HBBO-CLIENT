import Logger from '../util/Logger';
import ServerPacket from './composers/ServerPacket';
import Wibbo from '../Wibbo';

export default class WebSocketManager {

    private _webSocket: WebSocket;
    
    constructor(WSUrl: string) {
        this._webSocket = new WebSocket(WSUrl);
        this._webSocket.binaryType = 'arraybuffer';

        this._webSocket.onopen = this.OnOpen;
        this._webSocket.onclose = this.OnClose;
        this._webSocket.onmessage = this.OnMessage;
        this._webSocket.onerror = this.OnError;

    }

    private OnOpen() {
        Logger.Log("WebSocket connected");

        //Send Ssoticket packet
        Wibbo.OnConnect();
    }

    private OnClose() {
        Logger.Log("WebSocket close");

        Wibbo.OnDisconnect();
    }

    private OnMessage(event: MessageEvent) {
        if (!(event.data instanceof ArrayBuffer))
            return;

        Wibbo.GetPacketManager().TryExecutePacket(event.data);
    }

    private OnError() {
        Logger.Log("WebSocket Error");
    }

    public close() {
        this._webSocket.close();
    }

    public SendPacket(message: ServerPacket) {
        if (this._webSocket.readyState != WebSocket.OPEN)
            return;

        this._webSocket.send(message.GetBytes());
    }
}