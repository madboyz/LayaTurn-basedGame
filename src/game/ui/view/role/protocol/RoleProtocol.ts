import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { C13008, C13008_1, C13112, C13048, C13045, C13117, C13031, C13301 } from '../../../../../net/pt/pt_13';
export class RoleProtocol extends BaseProtocol {
    constructor() {
        super();
    }
    /**
     * 使用时装
     * @param no 为0表示取消使用当前在显示的时装
     */
    public send13301(no:number)
    {
        var msg:C13301 = new C13301();
        msg.id = no;
        this.send(msg);
    }
    /**
     * 
     * @param no 
     * @param type 1显示称号 0是使用属性 2显示称号并使用属性 
     */
    public send13031(no:number)
    {
        var msg:C13031 = new C13031()
        msg.Num = no;
        msg.Pos = 1;
        msg.Type = 2;
        this.send(msg);
    }

    /**
     * 飞升
     */
    public send13117()
    {
        var msg:C13117 = new C13117();
        this.send(msg);
    }

    /**
     * 角色加点
     * @param data 
     */
    public send13008(data:Array<any>)
    {
        var msg:C13008 = new C13008();
        msg.item_1 = new Array<C13008_1>();
        if(data)
        {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                var _data:C13008_1 = new C13008_1();
                _data.TalentType = item.TalentType;
                _data.AddPoints = item.AddPoints;
                msg.item_1.push(_data);
            }
        }
        this.send(msg);
    }
    /**
     * 洗点
     */
    public send13112()
    {
        var msg:C13112 = new C13112();
        this.send(msg);
    }
    /**
     * 升级心法
     */
    public send13048()
    {
        var msg:C13048 = new C13048();
        this.send(msg);
    }
    /**
     * 升级经脉
     */
    public send13045(no:number)
    {
        var msg:C13045 = new C13045();
        msg.No = no;
        this.send(msg);
    }
    
}