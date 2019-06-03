import { MessageBase } from "../message/messageBase/MessageBase";
import { MessageUtils } from "../message/messageBase/MessageUtils";
import { DataManager } from './../message/manager/DataManager';
import { Debug } from "../debug/Debug";
import { Byte } from './../message/messageBase/Byte';

export class GameSocket extends Laya.EventDispatcher {
    private mSokcet: Laya.Socket = new Laya.Socket();;
    private _byte: Laya.Byte;
    private isConneted = false;
    private readonly frameReadMessageCount = 30;
    constructor() {
        super();
        this.mSokcet.on(Laya.Event.OPEN, this, this.onConnect);
        this.mSokcet.on(Laya.Event.MESSAGE, this, this.onMessage);
        this.mSokcet.on(Laya.Event.ERROR, this, this.onError);
        this.mSokcet.on(Laya.Event.CLOSE, this, this.onClose);
        this._byte = new Laya.Byte();
        this.mSokcet.endian = Laya.Socket.BIG_ENDIAN;
        this._byte.endian = Laya.Byte.BIG_ENDIAN;
        this.mSokcet.timeout = 10000;
    }

    /**
     * 连接服务器
     * @param ip 服务器地址
     * @param port 服务器端口 
     */
    public connect(ip: string = "120.78.14.138", port: number = 7999): void {
        if (!this.mSokcet.connected) {
            //this.mSokcet = new Laya.Socket();
            if (GameConfig.WSS_CONNENT) {
                this.mSokcet.connectByUrl(GameConfig.GAME_URL);
                Debug.serverLog("connect ==="+GameConfig.GAME_URL);
            }
            else {
                this.mSokcet.connect(ip, port);
                Debug.serverLog("try connect new+" + GameConfig.GAME_URL);
            }
        } else {
            //if (this.mSokcet.connected) {
                Debug.serverLog("重复初始化连接socket. GameSocketManager.initByUrl");
                // this.mSokcet.close();
                // this.mSokcet.connect(ip, port);
                return;
            //}
        }
    }
    /**
     * 关闭连接 
     */
    public close(): void {
        if (!this.mSokcet) return;
        Debug.serverLog("socket close");
        this.mSokcet.close();
        //this.mSokcet = null;
    }

    private onError(e: Laya.Event): void {
        Debug.serverLog("socket Error" + e);
        this.event(SocketEvent.SERVER_ERROR);
    }

    private onClose(e: Laya.Event): void {
        Debug.serverLog("socket close" + e);
        this.isConneted = false;
        this.event(SocketEvent.SERVER_CLOSE);
    }

    private onConnect(): void {
        Debug.serverLog("socket onConnect。");
        this.isConneted = true;
        this.event(SocketEvent.SERVER_SUCCESS);
    }

    /**
     * 服务器返回信息
     * @private
     * @param {*} msg 
     * @memberof GameSocket
     */
    private onMessage(msg: any): void {
        // this._byte.endian = Laya.Byte.BIG_ENDIAN;
        // this._byte.clear();
        // this._byte.writeArrayBuffer(msg);
        // this._byte.pos = 0;

        var byte: Byte = new Byte();
        byte.endian = Laya.Byte.BIG_ENDIAN;
        byte.writeArrayBuffer(msg);
        byte.pos = 0;
        var messageList = [];
        while (byte.pos < byte.length) {
            var messageBase: MessageBase = MessageUtils.readMessageFromByte(byte);
            Debug.serverLog(`收到协议:${messageBase.msgId}  收到数据`, JSON.parse(JSON.stringify(messageBase)));
            messageList.push(messageBase);
            //DataManager.instance.add(messageBase.msgId, messageBase);
        }
        byte.clear();
        var frameCount = Math.ceil(messageList.length/this.frameReadMessageCount);
        for (let i = 0; i < frameCount; i++) {
            if(i == 0)
            {
                for (let j = 0; j < this.frameReadMessageCount; j++) {
                    var _messageBase = messageList.shift();
                    if(_messageBase)
                    DataManager.instance.add(_messageBase.msgId, _messageBase);
                    else
                    break;
                }
            }   
            else
            {
                Laya.timer.frameOnce(1,this, function(){
                    for (let j = 0; j < this.frameReadMessageCount; j++) {
                        var _messageBase = messageList.shift();
                        if(_messageBase)
                        DataManager.instance.add(_messageBase.msgId, _messageBase);
                        else
                        break;
                    }
                });
            }         
        }
    }

    /**
     * @param cls 发送给服务器的数据 参数是类的实例
     */
    public sendServer(cls: MessageBase) {

        if(this._byte&&this.isConneted)
        {
            this._byte.clear();
            MessageUtils.writeMessageToByte(this._byte, cls);
            this._byte.pos = 0;
            Debug.serverLog(`发送协议:${cls.msgId}  发送数据`, JSON.parse(JSON.stringify(cls)));
            this.mSokcet.send(this._byte.buffer);
        }
    }
}