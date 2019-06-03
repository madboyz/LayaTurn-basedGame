import { BuffVo } from "../../../../../db/sheet/vo/BuffVo";

export enum BuffShowType{
    Top = 1,//头顶BUFF,用于显示小图标BUFF
    Forward = 3,//人物前面（用显示于BUFF特效）
    Back = 4,//人物后面（用显示于BUFF特效）
}
export class Buff{
    public static GetBuffPos(buffId: number)
    {
        var data = BuffVo.get(buffId);
        if(data != null)
            return data.show_pos;
        else
        return 0;
    }
    constructor(id: number)
    {
        var data = BuffVo.get(id);
        if(data == null)
        return;
        this.Id = id;
        this.NeedShow = data.need_show == 1?true:false;
        this.Name = data.buff_name;
        this.Desc = data.buff_desc;
        this.ShowPos = data.show_pos;
        this.Res = data.res;
        this.TypeName = data.name;
    }

    public Update(data: any)
    {
        if(!data)
        return;
        if(data.ExpireRound != undefined)
            this.ExpireRound = data.ExpireRound;
        if(data.ProtectionRound != undefined)
            this.ProtectionRound = data.ProtectionRound;
        if(data.OverlapCount != undefined)
            this.OverlapCount = data.OverlapCount;
    }
    public Id = 0;
    public Name = "";
    public NeedShow = true;
    public Desc = "";
    public ShowPos = BuffShowType.Top;
    public Res = "";
    public ExpireRound = 0;//buff的到期回合（表示buff到了该回合即过期）， 若是永久性buff（战斗结束或死亡后才移除），则返回一个比较大的数值（大于9999）
    public ProtectionRound = 0;//buff保护回合，不可驱散回合
    public OverlapCount = 0;//buff当前的叠加层数（不可叠加的buff固定返回1），对于护盾类buff，表示护盾剩余的层数	 如果buff不可叠加，则以下都统一返回0 
    //public Para1_Type = 0;//buff参数1的类型（0:表示参数无意义，1：整数，2：百分比。下同）
    //public Para1_Value = 0;//buff参数1的值（如果是百分比，则返回的是一个放大100倍后的整数，比如：0.32对应返回的是32，下同）
    //public Para2_Type = 0;//buff参数2的类型
    //public Para2_Value = 0;//buff参数2的值
    public TypeName = "";
}

export class FightBuff{
    public BindTarget: any = null;//buff拥有者
    private Buffs:Laya.Dictionary = new Laya.Dictionary();
    constructor(tartget : any) {
        this.BindTarget = tartget;
    }

    public get AllBuff():Laya.Dictionary{
        return this.Buffs;
    }

    /**
     * 添加一个buff
     * @param id 
     * @param data //战斗协议返回的各种字段
     */
    public AddBuff(id: number , data: any):Buff
    {
        if(id == 0)
        return;
        var buff:Buff = this.Buffs.get(id);
        if(buff == null)
        {
            buff = new Buff(id);
            this.Buffs.set(id , buff);
        }
        buff.Update(data);
        return buff;
    }
    
    /**
     * 获得一个buff
     * @param id 
     */
    public GetBuff(id: number):Buff
    {
        return this.Buffs.get(id);
    }

    /**
     * 移除一个buff
     * @param id 
     */
    public RemoveBuff(id: number)
    {
        this.Buffs.remove(id);
    }

    public Clear()
    {
       this.Buffs.clear();
    }
}