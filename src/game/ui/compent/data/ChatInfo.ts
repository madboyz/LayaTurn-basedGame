import { S11001, S11002, S11003, S11004, S11005, S11006, S11007, S11008, S11011 } from "../../../../net/pt/pt_11";

/**
 * 聊天所有结构
 * @export
 * @class ChatInfo
 */
export class ChatInfo {
    public type:number = -1;//聊天类型
    public Msg:string = "";//内容
    public identity:number = -1;//身份
    public name:string = "";//名字
    public PrivLv:number = 0;//权限级别（0：普通玩家，1：指导员，2：GM）
    public Race:number = 0;//种族
    public Sex:number = 0;//职业
    public Lv:number = 0;//等级
    public Grade:number = 0;//排位赛段位
    public FromId:number = -1;//发送方用户ID
    public ToId:number = -1;//接受方用户ID
    public FromPrivLv:number = 0;//发送方的权限级别（0：普通玩家，1：指导员，2：GM）
    public Id:number = -1;//用户ID
    public Pos:number = -1;//职位
    public SId:number = -1;//样式id

    public NoticeVo:number = 0;//系统消息No;
    constructor() {
        
    }

    /**
     * 初始化聊天信息
     * @param {*} info
     * @memberof ChatInfo
     */
    public initInfo(data:any):void
    {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
        if(data instanceof S11001)//世界聊天
        {
            this.type = ChatType.WORLD;
        }
        else if(data instanceof S11002)//私聊
        {
            this.type = ChatType.PRIVATE;
        }
        else if(data instanceof S11003)//场景聊天
        {
            this.type = ChatType.SENCE;
        }
        else if(data instanceof S11004)//系统聊天
        {
            this.type = ChatType.SYSTEM;
        }
        else if(data instanceof S11005)//帮派聊天
        {
            this.type = ChatType.GUILD;
        }
        else if(data instanceof S11006)//队伍聊天
        {
            this.type = ChatType.TEAM;
        }
        else if(data instanceof S11007)//喇叭聊天
        {
            this.type = ChatType.HORN;
        }
        else if(data instanceof S11008)//种族聊天
        {
            this.type = ChatType.RACE;
        }
        else if(data instanceof S11011)//跨服竞技聊天
        {
            this.type = ChatType.CROSS;
        }
    }

    /**
     * 获得聊天频道
     * @readonly
     * @type {number}
     * @memberof ChatInfo
     */
    public get channel():number
    {
        if(this.type == ChatType.TEAM)
        {
            return ChatChannel.TEAM;
        }
        else if(this.type == ChatType.GUILD)
        {
            return ChatChannel.GUILD;
        }
        else if(this.type == ChatType.SYSTEM)
        {
            return ChatChannel.SYSTEM;
        }
        else
        {
            return ChatChannel.WORLD;
        }
    }
}