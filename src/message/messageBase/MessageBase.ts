import { Byte } from './Byte';
import { MessageUtils } from "./MessageUtils";
export class MessageBase {
    public static DES_SIGN: string = "DES";
    public static KEY: string = "";

    /**占用1个字节，值为true和false*/
    public static BOOLEAN: number = 0;
    /**占用1个字节，值为-128~127*/
    public static INT8: number = 1;
    /**占用1个字节，值为0-255*/
    public static UINT8: number = 2;
    /**占用2个字节，值为-32,768~32,767*/
    public static INT16: number = 3;
    /**占用2个字节，值为0~65,535*/
    public static UINT16: number = 4;
    /**占用4个字节，值为-2,147,483,648~2,147,483,647*/
    public static INT32: number = 5;
    /**占用4个字节，值为0~4,294,967,295*/
    public static UINT32: number = 6;
    /**占用4个字节，存储小数*/
    public static FLOAT32: number = 7;
    /**占用8个字节，存储比较大的小数*/
    public static FLOAT64: number = 8;
    /**字符串，根据内容多少动态占用内存*/
    public static STRING: number = 9;
    /**数组类型*/
    public static ARRAY: number = 10;
    /**Class类型*/
    public static CLASS: number = 11;
    /**占用8个字节，存储比较大的数*/
    public static UINT64: number = 12;

    public get msgId(): string {
        return MessageUtils.getObjectClassID(this);
    }

    public set msgId(value: string) {
        var clz = this["__proto__"]["constructor"]
        clz[MessageUtils.IDSign] = value;
    }

    public get msgKey(): string {
        return MessageUtils.getObjectClass(this)[MessageUtils.KEYSign];
    }

    public read(byte: Byte): Boolean {
        var des: Array<any> = MessageUtils.getDesByObject(this);
        var i: number, len: number;
        if (des) {
            len = des.length;
            var tArr: Array<any>;
            for (i = 0; i < len; i++) {
                tArr = des[i];
                this[tArr[0]] = this._readObj(byte, tArr[1], tArr[2]);
            }
        }
        return true;
    }

    public write(byte: Byte): Boolean {
        this.writeByDes(this, byte, MessageUtils.getDesByObject(this));
        return true;
    }

    /**消息发出后自动调用 (服务器) */
    public clear(): void {

    }

    public _readObj(byte: Byte, type: number, des: any): any {
        var v: any;
        switch (type) {
            case MessageBase.BOOLEAN:
                v = byte.getUint8() != 0;
                break;
            case MessageBase.INT8:
                v = byte.readByte();
                break;
            case MessageBase.UINT8:
                v = byte.getUint8();
                break;
            case MessageBase.INT16:
                v = byte.getInt16();
                break;
            case MessageBase.UINT16:
                v = byte.getUint16();
                break;
            case MessageBase.INT32:
                v = byte.getInt32();
                break;
            case MessageBase.UINT32:
                v = byte.getUint32();
                break;
            case MessageBase.FLOAT32:
                v = byte.getFloat32();
                break;
            case MessageBase.FLOAT64:
                v = byte.getFloat64();
                break;
            case MessageBase.STRING:
                v = byte.readUTFString();
                break;
            case MessageBase.CLASS:
                v = this.readClass(byte, des);
                break;
            case MessageBase.ARRAY:
                v = this.readArray(byte, des);
                break;
            case MessageBase.UINT64:
                v = this.readUint64(byte);
                break;
        }
        return v;
    }

    public wrireUint64(byte: Byte, value: number): void {
        if (!value) value = 0;
        var pow: number = Math.pow(2, 32);
        const high: number = Math.floor(value / pow);
        const low: number = value % pow;
        byte.writeUint32(high);
        byte.writeUint32(low);
    }

    public readUint64(byte: Byte): number {
        var pow: number = Math.pow(2, 32);
        const high: number = byte.getUint32();
        const low: number = byte.getUint32();
        return high * pow + (low >>> 0);
    }


    public readClass(byte: Byte, Clz: any): any {
        var Clz0: any = Clz;//MessageUtils.getClassByID(MessageUtils.getClassID(Clz));
        var rst: MessageBase = new Clz0();
        rst.read(byte);
        return rst;
    }

    public readArray(byte: Byte, des: Array<any>): Array<any> {
        if (!des) return;
        //读数组
        var rst = [];
        var i: number, len: number;
        rst.length = len = byte.getUint16();//读长度
        for (i = 0; i < len; i++) {//在循环读
            rst[i] = this._readObj(byte, des[0], des[1]);//des[0]是class,des[1]字段类
        }
        return rst;
    }

    public writeByDes(data: MessageBase, byte: Byte, des: Array<any>): void {
        if (!des) return;
        var i: number, len: number;
        len = des.length;
        var tArr: Array<any>;
        for (i = 0; i < len; i++) {
            tArr = des[i];
            var v: any = data[tArr[0]];
            this._writeObj(v, byte, tArr[1], tArr[2]);
        }
    }

    private _writeObj(v: any, byte: Byte, type: number, des: any): void {
        switch (type) {
            case MessageBase.BOOLEAN:
                byte.writeUint8(v ? 1 : 0);
                break;
            case MessageBase.INT8:
                byte.writeByte(v);
                break;
            case MessageBase.UINT8:
                byte.writeUint8(v);
                break;
            case MessageBase.INT16:
                byte.writeInt16(v);
                break;
            case MessageBase.UINT16:
                byte.writeUint16(v);
                break;
            case MessageBase.INT32:
                byte.writeInt32(v);
                break;
            case MessageBase.UINT32:
                byte.writeUint32(v);
                break;
            case MessageBase.FLOAT32:
                byte.writeFloat32(v);
                break;
            case MessageBase.FLOAT64:
                byte.writeFloat64(v);
                break;
            case MessageBase.STRING:
                byte.writeUTFString(v);
                break;
            case MessageBase.CLASS:
                this.writeClass(v, byte, des);
                break;
            case MessageBase.ARRAY:
                this.writeArray(v, byte, des);
                break;
            case MessageBase.UINT64:
                this.wrireUint64(byte, v);
                break;
        }
    }

    public writeClass(data: MessageBase, byte: Byte, clz: FunctionConstructor): void {
        data.writeByDes(data, byte, clz[MessageBase.DES_SIGN]);
    }

    public writeArray(arr: Array<any>, byte: Byte, des: Array<any>): void {
        if (!des) return;
        var i: number, len: number = arr.length;
        byte.writeUint16(len);
        for (i = 0; i < len; i++) {
            this._writeObj(arr[i], byte, des[0], des[1]);
        }
    }
}
