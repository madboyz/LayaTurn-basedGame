import { PetInfo } from "../../../compent/data/PetInfo";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { ProgressBar } from "../../../compent/ProgressBar";
import { Add_pointsVo } from "../../../../../db/sheet/vo/Add_pointsVo";
import { SPetEvent, SPetData } from "../../../../../net/data/SPetData";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { Alert } from "../../../compent/Alert";
import { ItemData } from "../../../compent/data/ItemData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class PetAddPoint extends ui.main.PetAddPointUI{
    private vo:PetInfo;
    private readonly attrkey = ["hp_lim","act_speed","phy_att","mag_att","phy_def","mag_def","crit","ten"
    ,"phy_combo_att_proba","mag_combo_att_proba","absorb_hp_coef"];//用于读表的key
    private readonly attrChinese = ["生命上限","出手速度","物理攻击","魔法攻击","物理防御","魔法防御","暴击概率","抗暴概率"
    ,"物理连击","法术连击","反击概率","攻击吸血"];
    private attrValues = [];
    private addAttr:Laya.Dictionary = new Laya.Dictionary();
    private addAttrProgress:Laya.Dictionary = new Laya.Dictionary();
    private addAttrBtns:Laya.Dictionary = new Laya.Dictionary();
    private cutAttrBtns:Laya.Dictionary = new Laya.Dictionary();
    private progressLabels:Laya.Dictionary = new Laya.Dictionary();
    private freedPoint = 0;
    private isSure:boolean = false;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        this.updateAttr();
        for (let i = 0; i < 12; i++) {
            const attrLabel:laya.html.dom.HTMLDivElement = this[`sub_attr_${i}`];
            HtmlUtils.setHtml(attrLabel.style,3,19,"left","middle");
            var chinese = this.attrChinese[i];
            
            if(chinese)
            {
                var table = this.attrValues[i];
                var valueStr = PropertyUtil.GetPropertyDec(table.key , table.value);
                attrLabel.innerHTML = HtmlUtils.addColor(`${chinese}:${valueStr}`,"#8e5213",20);
            }
            else
            {
                attrLabel.innerHTML = "";
            }
        }
        for (let i = 0; i < 5; i++) {
            var Progress:ProgressBar = new ProgressBar();
            Progress.setBg(ResUtils.getCompUIUrl("progressBg"),ResUtils.getCompUIUrl("img_yellowBar"),230,23);
            Progress.x = 194;
            Progress.y = 407 + i*43;
            this.addChild(Progress);
            this.addAttrProgress.set(i+1,Progress);

            var addBtn:component.ScaleButton = new component.ScaleButton();
            addBtn.skin = ResUtils.getCompUIUrl("btn_stepAdd");
            addBtn.anchorX = addBtn.anchorY = 0.5;
            addBtn.scaleX = addBtn.scaleY = 0.8;
            addBtn.x = 456;
            addBtn.y = 419 + i*43;
            this.addChild(addBtn);
            this.addAttrBtns.set(i+1,addBtn);


            var cutBtn:component.ScaleButton = new component.ScaleButton();
            cutBtn.skin = ResUtils.getCompUIUrl("btn_stepshut");
            cutBtn.anchorX = cutBtn.anchorY = 0.5;
            cutBtn.scaleX = cutBtn.scaleY = 0.8;
            cutBtn.x = 165;
            cutBtn.y = 419 + i*43;
            this.addChild(cutBtn);
            this.cutAttrBtns.set(i+1,cutBtn);

            var text:laya.html.dom.HTMLDivElement  = new laya.html.dom.HTMLDivElement();
            HtmlUtils.setHtml(text.style,3,19,"center","middle");
            text["_width"] = 230;
            text["_height"] = 23;
            text.x = 194;
            text.y = 407 + i*43;
            this.progressLabels.set(i+1,text);
            this.addChild(text);
            this.UpdateProgress(i+1);
        }
    }

    public update():void
    {
        this.updateAttr();
        this.updateDisPlayerValue();
    }

    public open(...args): void {
        this.vo = this.arg[0];
        this.initWindow(true,true,"宠物加点",486,560,165);
        super.open();
    }

    public initEvent():void 
    {
        this.helpAdd.on(Laya.Event.CLICK,this,this.OnClickHelpBtn);
        this.restPoint.on(Laya.Event.CLICK,this,this.OnClickResetBtn);
        this.sureAdd.on(Laya.Event.CLICK,this,this.OnClickSureBtn);
        SPetData.instance.on(SPetEvent.PET_PROPUPDATE,this,this.onAttrUpdate);
        SPetData.instance.on(SPetEvent.PET_PETINFO_SUCCEFUL,this,this.onAttrUpdate);

        for (let i = 0; i < this.addAttrBtns.keys.length; i++) 
        {
            var key = this.addAttrBtns.keys[i];
            var btn = this.addAttrBtns.get(key);
            btn.on(Laya.Event.CLICK,this,this.OnClickAddBtns,[key]);
            btn.on(Laya.Event.MOUSE_DOWN,this,this.OnMoreAddBtns,[key]);
            btn.on(Laya.Event.MOUSE_UP,this,this.onclearAdd);
        }

        for (let i = 0; i < this.cutAttrBtns.keys.length; i++) 
        {
            var key = this.cutAttrBtns.keys[i];
            var btn = this.cutAttrBtns.get(key);
            btn.on(Laya.Event.CLICK,this,this.OnClickCutBtns,[key]);
            btn.on(Laya.Event.MOUSE_DOWN,this,this.OnMoreCutBtns,[key]);
            btn.on(Laya.Event.MOUSE_UP,this,this.onclearCut);
        }
    }
    public removeEvent():void
    {
        this.helpAdd.off(Laya.Event.CLICK,this,this.OnClickHelpBtn);
        this.restPoint.off(Laya.Event.CLICK,this,this.OnClickResetBtn);
        this.sureAdd.off(Laya.Event.CLICK,this,this.OnClickSureBtn);
        SPetData.instance.off(SPetEvent.PET_PROPUPDATE,this,this.onAttrUpdate);
        SPetData.instance.off(SPetEvent.PET_PETINFO_SUCCEFUL,this,this.onAttrUpdate);
        for (let i = 0; i < this.addAttrBtns.keys.length; i++) 
        {
            var key = this.addAttrBtns.keys[i];
            var btn =this.addAttrBtns.get(key);
            btn.off(Laya.Event.CLICK,this,this.OnClickAddBtns,[key]);
            btn.off(Laya.Event.MOUSE_DOWN,this,this.OnMoreAddBtns,[key]);
            btn.off(Laya.Event.MOUSE_UP,this,this.onclearAdd);
        }

        for (let i = 0; i < this.cutAttrBtns.keys.length; i++) 
        {
            var key = this.cutAttrBtns.keys[i];
            var btn =this.cutAttrBtns.get(key);
            btn.off(Laya.Event.CLICK,this,this.OnClickCutBtns,[key]);
            btn.off(Laya.Event.MOUSE_DOWN,this,this.OnMoreCutBtns,[key]);
            btn.off(Laya.Event.MOUSE_UP,this,this.onclearCut);
        }
    }

    private onAttrUpdate()
    {
        // if(this.isSure)
        // {
            this.updateAttr();
            this.updateDisPlayerValue();
        // }
    }

    private updateAttr()
    {
        this.attrValues = [];
        this.addAttr.clear();
        if(this.vo)
        {
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_HP_LIM, value:this.vo.Hp});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_ACT_SPEED ,value:this.vo.ActSpeed});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_ATT ,value:this.vo.PhyAtt});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_ATT ,value:this.vo.MagAtt});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_DEF ,value:this.vo.PhyDef});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_DEF ,value:this.vo.MagDef});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_CRIT ,value:this.vo.Crit});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_TEN ,value:this.vo.Ten});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA ,value:this.vo.PhyComboAttProba});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA ,value:this.vo.MagComboAttProba});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_ABSORB_HP_COEF ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA ,value:this.vo.StrikebackProba});
            this.txt_leftPoint.text = this.vo.FeerPoint.toString();
            this.freedPoint = this.vo.FeerPoint;
            this.addAttr.set(1,{value:this.vo.Con , origin:this.vo.Con});
            this.addAttr.set(2,{value:this.vo.Str , origin:this.vo.Str});
            this.addAttr.set(3,{value:this.vo.Agi , origin:this.vo.Agi});
            this.addAttr.set(4,{value:this.vo.Spi , origin:this.vo.Spi});
            this.addAttr.set(5,{value:this.vo.Sta , origin:this.vo.Sta});
        }
    }

    private UpdateProgress(key:number)
    {
        if(!this.vo)
        return;
        var progress:ProgressBar = this.addAttrProgress.get(key);
        var table = this.addAttr.get(key);
        progress.setValue(table.value , this.vo.Lv *6 );
        var label:laya.html.dom.HTMLDivElement = this.progressLabels.get(key);
        if(table.value == table.origin)
        {
            label.innerHTML = HtmlUtils.addColor(`${table.origin}`,"#ffffff",19);
        }
        else
        {
            label.innerHTML = HtmlUtils.addColor(`${table.origin}`,"#ffffff",19) +  HtmlUtils.addColor(`+${table.value - table.origin}`,"#33ff00",19);
        }
    }

    private updateDisPlayerValue()
    {
        for (let i = 0; i < this.attrValues.length; i++) {
            const table = this.attrValues[i];
            const attrLabel:laya.html.dom.HTMLDivElement = this[`sub_attr_${i}`];
            var chinese = this.attrChinese[i];
            var valueStr = PropertyUtil.GetPropertyDec(table.key , table.value);
            attrLabel.innerHTML = HtmlUtils.addColor(`${chinese}:${valueStr}`,"#8e5213",19);
        }

        for (let i = 0; i < this.addAttr.keys.length; i++) {
            const key = this.addAttr.keys[i];
            this.UpdateProgress(key);
        }
    }

    public updateAddPoint(_key:number , value:number)
    {
        var data = Add_pointsVo.get(_key);
        if(data)
        {

            for (let i = 0; i < this.attrkey.length; i++) {
                const key = this.attrkey[i];
                if(data[key] && data[key] != 0)
                {
                    var chinese = this.attrChinese[i];
                    var table = this.attrValues[i];
                    var valueStr = PropertyUtil.GetPropertyDec(table.key , table.value);
                    const attrLabel:laya.html.dom.HTMLDivElement = this[`sub_attr_${i}`];
                    if(value != 0)
                    {
                        var addStr = PropertyUtil.GetPropertyDec(table.key , value*data[key]);
                        attrLabel.innerHTML = HtmlUtils.addColor(`${chinese}:${valueStr}`,"#8e5213",19) +  HtmlUtils.addColor(`+${addStr}`,"#33ff00",19);
                    }
                    else
                    {
                        attrLabel.innerHTML = HtmlUtils.addColor(`${chinese}:${valueStr}`,"#8e5213",19);
                    }
                }
            }
            this.UpdateProgress(_key);
        }
        
        this.txt_leftPoint.text = this.freedPoint.toString();
    }

    private OnClickCutBtns(key:number)
    {
        this.onCut(key);
    }

    private OnMoreCutBtns(key:number)
    {
        Laya.timer.loop(100,this,this.onCut,[key]);
    }

    private onclearCut():void
    {
        Laya.timer.clear(this,this.onCut)
    }

    private onCut(key:number):void
    {
        var table = this.addAttr.get(key);
        if(table.origin == table.value)
        return;
        table.value -=1; 
        this.freedPoint += 1;
        this.updateAddPoint(key, table.value - table.origin);
    }

    private OnClickAddBtns(key:number)
    {
        this.onAdd(key);
    }

    private OnMoreAddBtns(key:number):void
    {
        Laya.timer.loop(100,this,this.onAdd,[key]);
    }

    private onclearAdd():void
    {
        Laya.timer.clear(this,this.onAdd)
    }

    private onAdd(key:number):void
    {
        var table = this.addAttr.get(key);
        var max = this.vo.Lv *6;
        if(this.freedPoint == 0|| table.value ==  max)
        return;
        this.freedPoint -= 1;
        table.value +=1; 
        this.updateAddPoint(key, table.value - table.origin);
    }

    private OnClickHelpBtn()
    {
        if(!this.vo)
        return;
        if(this.freedPoint == 0)
        return;
        var ids:Laya.Dictionary = new Laya.Dictionary();
        if(!this.vo.natureVo)return;
        while(this.freedPoint > 0)
        {
            var cutVal = 0;
            if(this.vo.natureVo.str > 0)
            {
                var table = this.addAttr.get(2);
                cutVal = this.freedPoint < this.vo.natureVo.str?this.freedPoint:this.vo.natureVo.str;
                table.value = table.value + cutVal;
                this.freedPoint -= cutVal;
                ids.set(2 , table);
            }
            if(this.vo.natureVo.con > 0)
            {
                var table = this.addAttr.get(1);
                cutVal = this.freedPoint < this.vo.natureVo.con?this.freedPoint:this.vo.natureVo.con;
                table.value = table.value + cutVal;
                this.freedPoint -= cutVal;
                ids.set(1 , table);
            }
            if(this.vo.natureVo.sta > 0)
            {
                var table = this.addAttr.get(5);
                cutVal = this.freedPoint < this.vo.natureVo.sta?this.freedPoint:this.vo.natureVo.sta;
                table.value = table.value + cutVal;
                this.freedPoint -= cutVal;
                ids.set(5 , table);
            }
            if(this.vo.natureVo.spi > 0)
            {
                var table = this.addAttr.get(4);
                cutVal = this.freedPoint < this.vo.natureVo.spi?this.freedPoint:this.vo.natureVo.spi;
                table.value = table.value + cutVal;
                this.freedPoint -= cutVal;
                ids.set(4 , table);
            }
            if(this.vo.natureVo.agi > 0)
            {
                var table = this.addAttr.get(3);
                cutVal = this.freedPoint < this.vo.natureVo.agi?this.freedPoint:this.vo.natureVo.agi;
                table.value = table.value + cutVal;
                this.freedPoint -= cutVal;
                ids.set(3 , table);
            }
        }

        for (let i = 0; i < ids.keys.length; i++) {
            const id = ids.keys[i];
            var table = ids.get(id);
            this.updateAddPoint(id,table.value - table.origin);
        }
        
    }

    private OnClickResetBtn()
    {
        var cfgCost = ConstVo.get("GAME_ROLE_WASH_POINT_COST").val;
        var newData: ItemData = new ItemData(cfgCost[0]);

        var str: string = HtmlUtils.addColor("消耗", "#8a5428", 20) +
            HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 25, 25) +
            HtmlUtils.addColor(cfgCost[1], "#3f8f4f", 20) +
            HtmlUtils.addColor("重置宠物加点", "#8a5428", 20);

        Alert.show(str, this, () => {
            this.event(SPetEvent.PET_REQUEST_WASHPOINT,[[this.vo.PartnerId]]);
        }, null, null, null, true, "重置加点");
    }

    private OnClickSureBtn()
    {
        var attr:Array<any> = new Array<any>();
        for (let i = 0; i < this.addAttr.keys.length; i++) {
            var table = this.addAttr.get(this.addAttr.keys[i]);
            if(table.value > table.origin)
            {
                attr.push({TalentType:this.addAttr.keys[i] , AddPoints: table.value - table.origin});
            }
        }
        if(attr.length == 0)
        return;
        this.isSure = true;
        this.event(SPetEvent.PET_REQUEST_ADDPOINT,[[attr,this.vo.PartnerId]]);
    }

    public close(): void {
        this.onclearAdd();
        this.onclearCut();
        this.isSure = false;
        super.close();
    }
}