import { Debug } from '../../debug/Debug';
import { Byte } from './Byte';
import { MessageBase } from "./MessageBase";
export class MessageUtils {

	/**
	 * @private 消息工具类
	 */
	private static _msgDic: Object = {};
	private static _desDic: Object = {};
	public static msgID: number = 1;
	public static IDSign: string = "__MID";
	public static KEYSign: string = "KEY";

	/**
	 * 如果是负数的返回值
	 * @param value 
	 */
	public static signedValue(value: number) {
		if (value > 2147483648)//0x80000000
		{
			return value - 2147483648 - 2147483648;
		}
		else {
			return value;
		}
	}

	public static messageInit(): void {
		for (let i = 0; i < 32; i++) {
			this.data32[i] = Math.pow(2, (32 - (i + 1)));
		}
	}

	public static regMessage(clz: Function): void {
		if (!clz[MessageUtils.IDSign]) {
			clz[MessageUtils.IDSign] = MessageUtils.msgID;
			MessageUtils._msgDic[MessageUtils.msgID] = clz;
			MessageUtils._desDic[MessageUtils.msgID] = clz[MessageBase.DES_SIGN];
			MessageUtils.msgID++;
		}
	}

	public static registMessageById(clz: any, id: any): void {
		if (!clz[MessageUtils.IDSign]) {
			clz[MessageUtils.IDSign] = id;
			MessageUtils._msgDic[id] = clz;
			MessageUtils._desDic[id] = clz[MessageBase.DES_SIGN];
		}
	}

	public static regMessageList(msgList: Array<any>): void {
		var i: number, len: number = msgList.length;
		for (i = 0; i < len; i++) {
			MessageUtils.regMessage(msgList[i]);
		}
	}

	public static setMessagesKey(msgList: Array<any>): void {
		var i: number, len: number = msgList.length;
		for (i = 0; i < len; i++) {
			MessageUtils.setMessageKey(msgList[i]);
		}
	}

	public static setMessageKey(msg: Function, key: string = null): void {
		if (!key) key = msg["name"];
		msg[MessageUtils.KEYSign] = key;
	}

	public static replaceClass(newClz: Function, oldClz: Function): void {
		var id: string;
		id = MessageUtils.getClassID(oldClz);
		newClz[MessageUtils.IDSign] = id;
		MessageUtils._msgDic[id] = newClz;
	}

	public static getDesByObject(obj: Object): Array<any> {
		return obj["__proto__"]["constructor"]["DES"];//MessageUtils._desDic[MessageUtils.getObjectClassID(obj)];
	}

	public static getClassByID(id: number): Function {
		return MessageUtils._msgDic[id];
	}

	public static getClassID(clz: Function): string {
		return clz[MessageUtils.IDSign];
	}

	public static getClassKey(clz: Function): string {
		return clz[MessageUtils.KEYSign];
	}

	public static getObjectClassID(obj: any): string {
		return MessageUtils.getClassID(obj["__proto__"]["constructor"]);
	}

	public static getObjectClass(obj: any): Function {
		return obj["__proto__"]["constructor"];
	}

	private static _lastId: number;
	public static readMessageFromByte(byte: Byte): any {
		var len: number = byte.getUint16();//包体长度
		//if (len == 20041) {
		//	var id = 20041;
		//}
		//else 
		var id: number = byte.getUint16();//协议号
		var isZip: boolean = byte.getUint8() == 1;//是否压缩

		try {
			//暂时不复用，需要重复的协议
			var clz: any;// = DataManager.instance.get(id);
			// if (!clz) {
			clz = MessageUtils.getClassByID(id);//协议类，获取
			clz = new clz();
			// }
			//TODO:复用
			var rst: MessageBase = clz;
			rst.read(byte);//读取字段
		} catch (error) {
			throw new Error("=====" + id + "=====协议或者这条协议前面一条协议=========" + this._lastId + "=======，数据解析和.hrl文件对应不上，后端看下咯");
		}
		this._lastId = id;
		return rst;
	}

	public readUint64(byte: Byte): number {
		var pow: number = Math.pow(2, 32);
		const high: number = byte.getUint32();
		const low: number = byte.getUint32();
		return high * pow + (low >>> 0);
	}


	private static packet_index: number = 1;
	public static writeMessageToByte(byte: Byte, message: any): void {
		byte.endian = Laya.Byte.BIG_ENDIAN;
		byte.pos = 2;//协议号写入偏移,给len留位置
		var cbuf: number = 0;
		var str: string = MessageUtils.getObjectClassID(message) as any;
		var protocol: number = ~~str.substr(1, str.length)//获得协议号
		byte.writeUint16(protocol);//写入协议号
		byte.writeUint32(this.packet_index);//写入包索引
		this.packet_index++;//每发送一个包，就记录一次
		message.write(byte);//写入包体
		byte.pos = cbuf;//len 写入包前面，从0开始写
		byte.writeUint16(byte.length + 2);//写入长度

		var check_code: number = this.SendEncryption(byte, 2, byte.length - 2);//获得加密码
		Debug.serverLog("check_code===" + check_code);
		byte.pos = byte.length;//写到最后
		byte.writeUint32(check_code);//写入加密值

		// byte.writeInt32();
		// message.write(byte);
	}
	private static data32: Object = {};

	/*发送加密*/
	private static SendEncryption(byte: Laya.Byte, n_pos: number, length: number): number {
		var nums: Array<number> = [];
		var buf = 0;
		var count = Math.floor(length / 2)
		var buffer_index = n_pos;
		var dataView: DataView = byte['_d_'];
		for (let i = 0; i < count; i++) {
			var v = dataView.getUint16(buf + buffer_index);
			nums.push(v);
			buffer_index = buffer_index + 2
		}

		if (length % 2 == 1) {
			v = dataView.getUint8(buf + buffer_index);
			nums.push(v);
			buffer_index = buffer_index + 1;
		}

		function d2b(arg: any) {
			var tr = {};
			for (let i = 0; i < 32; i++) {
				if (arg >= MessageUtils.data32[i]) {
					tr[i] = 1;
					arg = arg - MessageUtils.data32[i];
				}
				else {
					tr[i] = 0;
				}
			}
			return tr;
		}

		function b2d(arg: Array<number>) {
			var nr = 0;
			for (let i = 0; i < 32; i++) {
				if (arg[i] == 1) {
					nr = nr + Math.pow(2, (32 - (i + 1)));
				}
			}
			return nr;
		}



		function _xor(a, b): number {
			var op1 = d2b(a)
			var op2 = d2b(b)
			var r: Array<number> = [];
			for (let i = 0; i < 32; i++) {
				if (op1[i] == op2[i]) {
					r[i] = 0;
				}
				else {
					r[i] = 1;
				}
			}

			return b2d(r);
		}

		function _XXPP() {
			let _FNV_offset_basis = 2166136
			let _FNV_prime = 16777
			var value = _FNV_offset_basis
			for (const key in nums) {
				value = _xor(value, nums[key]);
				value = value * _FNV_prime
				value = value % 4294967295
			}
			return value;
		}


		return _XXPP();
	}

}