import { Add_pointsVo } from "../../../../../db/sheet/vo/Add_pointsVo";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { ProgressBar } from "../../../compent/ProgressBar";
import { S13002 } from "../../../../../net/pt/pt_13";
import { Alert } from "../../../compent/Alert";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { ItemData } from "../../../compent/data/ItemData";

export class RoleAddPoint extends ui.main.PetAddPointUI {
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
    private oriFreedPoint =0;
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

    public update():void{
        this.updateAttr();
        this.updateDisPlayerValue();
    }

    public open(...args): void {
        this.initWindow(true,true,"人物加点",486,560,165);
        super.open();
    }

    public initEvent():void 
    {
        this.helpAdd.on(Laya.Event.CLICK,this,this.OnClickHelpBtn);
        this.restPoint.on(Laya.Event.CLICK,this,this.OnClickResetBtn);
        this.sureAdd.on(Laya.Event.CLICK,this,this.OnClickSureBtn);
        SRoleData.instance.on(SRoleEvent.ROLE_WASH_POINT,this,this.onResetPoint);
        SRoleData.instance.on(SRoleEvent.ROLE_ADD_POINT,this,this.onAttrUpdate);

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
        SRoleData.instance.off(SRoleEvent.ROLE_WASH_POINT,this,this.onResetPoint);
        SRoleData.instance.off(SRoleEvent.ROLE_ADD_POINT,this,this.onAttrUpdate);
        for (let i = 0; i < this.addAttrBtns.keys.length; i++) 
        {
            var key = this.addAttrBtns.keys[i];
            var btn =this.addAttrBtns.get(key);
            btn.off(Laya.Event.CLICK,this,this.OnClickAddBtns,[key]);
        }

        for (let i = 0; i < this.cutAttrBtns.keys.length; i++) 
        {
            var key = this.cutAttrBtns.keys[i];
            var btn =this.cutAttrBtns.get(key);
            btn.off(Laya.Event.CLICK,this,this.OnClickCutBtns,[key]);
        }
    }

    private onResetPoint()
    {
        this.onAttrUpdate();
    }

    private onAttrUpdate()
    {
        this.updateAttr();
        this.updateDisPlayerValue();
    }

    private OnMoreCutBtns(key:number)
    {
        Laya.timer.loop(100,this,this.OnClickCutBtns,[key]);
    }

    private onclearCut():void
    {
        Laya.timer.clear(this,this.OnClickCutBtns)
    }

    private OnClickCutBtns(key:number)
    {
        var table = this.addAttr.get(key);
        if(table.origin == table.value)
        return;
        table.value -=1; 
        this.freedPoint += 1;
        this.updateAddPoint(key, table.value - table.origin);
    }

    private OnMoreAddBtns(key:number):void
    {
        Laya.timer.loop(100,this,this.OnClickAddBtns,[key]);
    }

    private onclearAdd():void
    {
        Laya.timer.clear(this,this.OnClickAddBtns)
    }

    private OnClickAddBtns(key:number)
    {
        var table = this.addAttr.get(key);
        var max = SRoleData.instance.info.Lv *6;
        if(this.freedPoint == 0|| table.value ==  max)
        return;
        this.freedPoint -= 1;
        table.value +=1; 
        this.updateAddPoint(key, table.value - table.origin);
    }

    private UpdateProgress(key:number)
    {
        if(!SRoleData.instance.info)
        return;
        var progress:ProgressBar = this.addAttrProgress.get(key);
        var table = this.addAttr.get(key);
        progress.setValue(table.value , SRoleData.instance.info.Lv *6 );
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

    public close(): void {
        this.onclearAdd();
        this.onclearCut();
        super.close();
    }

    private OnClickHelpBtn()
    {
        if(!SRoleData.instance.info)
        return;
        if(this.freedPoint == 0)
        return;
        var id = 0;
        if(SRoleData.instance.info.Faction == 1)
        {
            id = 2;
        }
        else if(SRoleData.instance.info.Faction == 2)
        {
            id = 4;
        }
        var table = this.addAttr.get(id);
        table.value = table.value + this.freedPoint;
        this.freedPoint = 0;
        this.updateAddPoint(id,table.value - table.origin);
        
    }

    private OnClickResetBtn()
    {
        var cfgCost = ConstVo.get("GAME_ROLE_WASH_POINT_COST").val;
        var newData: ItemData = new ItemData(cfgCost[0]);

        var str: string = HtmlUtils.addColor("消耗", "#8a5428", 20) +
            HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 25, 25) +
            HtmlUtils.addColor(cfgCost[1], "#3f8f4f", 20) +
            HtmlUtils.addColor("重置人物加点", "#8a5428", 20);

        Alert.show(str, this, () => {
            this.event(SRoleEvent.ROLE_REQUEST_WASH_POINT);
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

        this.event(SRoleEvent.ROLE_REQUEST_ADD_POINT,[attr]);
    }

    public updateAddPoint(key:number , value:number)
    {
        var data = Add_pointsVo.get(key);
        if(data)
        {

            for (let i = 0; i < this.attrkey.length; i++) {
                const ele = this.attrkey[i];
                if(data[ele] && data[ele] != 0)
                {
                    var chinese = this.attrChinese[i];
                    var table = this.attrValues[i];
                    var valueStr = PropertyUtil.GetPropertyDec(table.key , table.value);
                    const attrLabel:laya.html.dom.HTMLDivElement = this[`sub_attr_${i}`];
                    if(value != 0)
                    {
                        var addStr = PropertyUtil.GetPropertyDec(table.key , value*data[ele]);
                        attrLabel.innerHTML = HtmlUtils.addColor(`${chinese}:${valueStr}`,"#8e5213",19) +  HtmlUtils.addColor(`+${addStr}`,"#33ff00",19);
                    }
                    else
                    {
                        attrLabel.innerHTML = HtmlUtils.addColor(`${chinese}:${valueStr}`,"#8e5213",19);
                    }
                }
            }
            this.UpdateProgress(key);
        }
        
        this.txt_leftPoint.text = this.freedPoint.toString();
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

    private updateAttr()
    {
        this.attrValues = [];
        this.addAttr.clear();
        if(SRoleData.instance.info)
        {

            this.attrValues.push({key:PropertyEnumCode.OI_CODE_HP_LIM, value:SRoleData.instance.info.Hp});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_ACT_SPEED ,value:SRoleData.instance.info.ActSpeed});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_ATT ,value:SRoleData.instance.info.PhyAtt});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_ATT ,value:SRoleData.instance.info.MagAtt});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_DEF ,value:SRoleData.instance.info.PhyDef});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_DEF ,value:SRoleData.instance.info.MagDef});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_CRIT ,value:SRoleData.instance.info.Crit});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_TEN ,value:SRoleData.instance.info.Ten});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA ,value:SRoleData.instance.info.PHY_COMBO_ATT_PROBA});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA ,value:SRoleData.instance.info.MAG_COMBO_ATT_PROBA});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_ABSORB_HP_COEF ,value:SRoleData.instance.info.ABSORB_HP_COEF});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA ,value:SRoleData.instance.info.STRIKEBACK_PROBA});
            this.txt_leftPoint.text = SRoleData.instance.info.FreeTalentPoints.toString();
            this.freedPoint = SRoleData.instance.info.FreeTalentPoints;
            this.oriFreedPoint = SRoleData.instance.info.FreeTalentPoints;
            this.addAttr.set(1,{value:SRoleData.instance.info.Talent_Con , origin:SRoleData.instance.info.Talent_Con});
            this.addAttr.set(2,{value:SRoleData.instance.info.Talent_Str , origin:SRoleData.instance.info.Talent_Str});
            this.addAttr.set(3,{value:SRoleData.instance.info.Talent_Agi , origin:SRoleData.instance.info.Talent_Agi});
            this.addAttr.set(4,{value:SRoleData.instance.info.Talent_Spi , origin:SRoleData.instance.info.Talent_Spi});
            this.addAttr.set(5,{value:SRoleData.instance.info.Talent_Sta , origin:SRoleData.instance.info.Talent_Sta});
        }
        else
        {
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_HP_LIM, value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_ACT_SPEED ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_ATT ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_ATT ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_DEF ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_DEF ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_CRIT ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_TEN ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_ABSORB_HP_COEF ,value:0});
            this.attrValues.push({key:PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA ,value:0});
            this.txt_leftPoint.text = "0";
            this.freedPoint = 0;
            this.addAttr.set(1,{value:0 , origin:0});
            this.addAttr.set(2,{value:0 , origin:0});
            this.addAttr.set(3,{value:0 , origin:0});
            this.addAttr.set(4,{value:0 , origin:0});
            this.addAttr.set(5,{value:0 , origin:0});
        }

        
    }

}