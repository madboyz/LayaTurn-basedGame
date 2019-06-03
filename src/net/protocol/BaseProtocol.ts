import { SocketManager } from './../SocketManager';
import { MessageBase } from './../../message/messageBase/MessageBase';

export class BaseProtocol {
    protected send(msg: MessageBase): void {
        SocketManager.instance.send(msg);
    }
}