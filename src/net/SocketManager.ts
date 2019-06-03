import { Debug } from './../debug/Debug';
import { MessageBase } from './../message/messageBase/MessageBase';
import { GameSocket } from './GameSocket';

export class SocketManager extends Laya.EventDispatcher {
    private mSocket: GameSocket;
    constructor() {
        super();
        this.mSocket = new GameSocket();
        this.mSocket.on(SocketEvent.SERVER_SUCCESS, this, this.onSuccess);
        this.mSocket.on(SocketEvent.SERVER_ERROR, this, this.onError);
        this.mSocket.on(SocketEvent.SERVER_CLOSE, this, this.onClose);
    }

    private onClose(): void {
        Debug.serverLog("服务器已关闭");
        this.event(Laya.Event.CLOSE);
    }

    private onError(): void {
        Debug.serverLog("连接服务器失败");
        this.event(Laya.Event.ERROR);
    }

    private onSuccess(): void {
        Debug.serverLog("连接服务器成功");
        this.event(Laya.Event.COMPLETE);
    }

    private static mInstance: SocketManager;

    public static get instance(): SocketManager {
        return SocketManager.mInstance || (SocketManager.mInstance = new SocketManager());

    }

    public close(): void {
        this.mSocket && this.mSocket.close();
    }

    public connect(ip?: string, port?: number): void {
        this.mSocket.connect(ip || GameConfig.TEST_IP, port || GameConfig.TEST_PORT);
        //this.mSocket.connect(ip || "mxxy.bqjoy.com", port || 29999);
        //this.mSocket.connect(ip || "192.168.0.196", port || 9999);
        //this.mSocket.connect(ip || "120.78.14.138", port || 7999);
    }

    public send(cls: MessageBase): void {
        this.mSocket.sendServer(cls);
    }
}