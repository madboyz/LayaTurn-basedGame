import { MessageBase } from "../../message/messageBase/MessageBase";
//------------------------------------------------
// File: pt_comm.hrl（common protocol）
// Author: huangjf 
// Created : 2013.8.1
// Description: 通用协议（协议号都小于1000）
//------------------------------------------------
// 避免头文件多重包含
//-ifndef（__PT_COMM_H__）.
//-define（__PT_COMM_H__, 0）.
// 发送提示信息给客户端,客户端弹出提示暂定为998
//-define（PT_SEND_PROMPT_MSG, 998）. 
export class C998 extends MessageBase{
    //-define（PT_SEND_PROMPT_MSG,998）.
}
export class S998 extends MessageBase{
  public Type:number;//
  public MsgCode:number;//
  public static DES : Array<any> =
     [
      ["Type",MessageBase.UINT8],
      ["MsgCode",MessageBase.UINT32],

    ]
}
// 调试时的报错信息回显协议（发送报错信息给客户端）， 暂定为999
//-define（PT_DEBUG_ERR_MSG_ECHO, 999）.
export class C999 extends MessageBase{
    //-define（PT_DEBUG_ERR_MSG_ECHO,999）.
}
export class S999 extends MessageBase{
  public ErrMsg:string;//
  public static DES : Array<any> =
     [
      ["ErrMsg",MessageBase.STRING],

    ]
}
