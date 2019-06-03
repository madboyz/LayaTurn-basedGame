import { Comate_attrVo } from "../../../../../db/sheet/vo/Comate_attrVo";
import { CustomizeTexture } from "../../../../battle/scene/comp/CustomizeTexture";
import { SComateData } from "../data/SComateData";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { MsgManager } from "../../../manager/MsgManager";

export class ComateTalentInfoPanel extends ui.main.ComateTalentInfoPanelUI 
{
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.mResouce = [
            
            { url: "res/atlas/comate.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private CurrentVo:Comate_attrVo;

    public initComp() {
        super.initComp();
    }

    public open(...args): void {
        super.open();
        this.CurrentVo = args[0];
        this.LoadIcon();
        this.updateDes();
    }

    public initEvent():void {
        this.MaxBtn.on(Laya.Event.CLICK , this, this.onClickMaxBtn);
        this.OneBtn.on(Laya.Event.CLICK , this, this.onClickOneBtn);
    }

    public removeEvent():void {
        this.MaxBtn.off(Laya.Event.CLICK , this, this.onClickMaxBtn);
        this.OneBtn.off(Laya.Event.CLICK , this, this.onClickOneBtn);
    }

    private async LoadIcon()
    {
        if(this.CurrentVo == null)
        return;
        var url: string = `art/uiAnim/comate_skill_${this.CurrentVo.attr_no}.png`;
        var uuid = 1120+this.CurrentVo.attr_no;
        var customText = await CustomizeTexture.asyncGetTextureByUrl(url, uuid, this.TalentIcon.x, this.TalentIcon.y);
        if(! customText||(customText&&! customText.texture))return;
        this.TalentIcon.texture = customText.texture;
        customText.dispose();
    }

    public updateDes()
    {
        if(this.CurrentVo == null||SComateData.instance.CurrentComate == null)
        return;
        var vo = PropertyVo.getByInfo(this.CurrentVo.attr_name);
        if(vo == null)
        return;
        var usedPoint = SComateData.instance.CurrentComate.AddPoint.get(this.CurrentVo.attr_no);
        if(usedPoint == null)
        {
            usedPoint = 0;
        }
        this.NameText.text = this.CurrentVo.name;
        this.LvText.text = `等级：${usedPoint}/${this.CurrentVo.max_point}`;
        var currentDes = "";
        if(usedPoint == 0)
        currentDes = "未学习";
        else
        {
            var value = usedPoint*this.CurrentVo.add_value;
            currentDes = `伙伴 ${vo.name} +${PropertyUtil.GetPropertyDec(vo.no,value)}`;
        }
        this.CurrentDesText.text = currentDes;

        var nextDes = "";
        if(usedPoint == this.CurrentVo.max_point)
        nextDes = "已学满";
        else
        {
            var value = (usedPoint+1)*this.CurrentVo.add_value;
            nextDes = `下一级:\n伙伴 ${vo.name} +${PropertyUtil.GetPropertyDec(vo.no,value)}`;
        }
        this.NextDesText.text = nextDes;
        
    }

    private CheckLearn(point:number)
    {
        var finalData = [];
        var currentFreePoint = SComateData.instance.CurrentComate.TalentPoint;
        if(SComateData.instance.CurrentComate.IsHave == false)
        {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        if(currentFreePoint == 0)
        {
            MsgManager.instance.showRollTipsMsg("天赋点数不足请前往兑换！");
            return;
        }

        for (let i = 0; i < SComateData.instance.CurrentComate.AddPoint.keys.length; i++) {
            const key = SComateData.instance.CurrentComate.AddPoint.keys[i];
            var value = SComateData.instance.CurrentComate.AddPoint.get(key);
            if(value != null)
            {
                var talentInfo = {No:key , Point:value};
                finalData.push(talentInfo);
            }
        }

        var usedPoint = SComateData.instance.CurrentComate.AddPoint.get(this.CurrentVo.attr_no);

        if(usedPoint != null && usedPoint == this.CurrentVo.max_point)
        {
            MsgManager.instance.showRollTipsMsg("已学满！");
            return;
        }

        if(usedPoint == null&&this.CurrentVo.pre_attr_no != 0)
        {
            var lastVo:Comate_attrVo = Comate_attrVo.getComateAttrByAttrId(SComateData.instance.CurrentComate.No , this.CurrentVo.pre_attr_no);
            var lastPoint = SComateData.instance.CurrentComate.AddPoint.get(this.CurrentVo.pre_attr_no);
            if(lastPoint == null||(lastPoint&& lastPoint< this.CurrentVo.pre_point))
            {
                //var vo = PropertyVo.getByInfo(lastVo.attr_name);
                MsgManager.instance.showRollTipsMsg(`需要前置天赋：${lastVo.name}等级${this.CurrentVo.pre_point}`);
                return;
            }
        }
        if(usedPoint == null)
        {
            usedPoint = 0;
        }
        var finaleValue = usedPoint;
        var needFinal = (finaleValue + point) > this.CurrentVo.max_point?this.CurrentVo.max_point:(finaleValue + point);
        var needPoint = needFinal - usedPoint;
        if(needPoint <= currentFreePoint)
        {
            finaleValue = needPoint + usedPoint;
        }
        else
        {
            finaleValue = currentFreePoint;
        }
        var isHave = false;
        
        for (let i = 0; i < finalData.length; i++) {
            const element = finalData[i];
            if(element.No == this.CurrentVo.attr_no)
            {
                element.Point = finaleValue;
                isHave = true;
            }
        }
        if(!isHave)
        {
            var talentInfo = {No:this.CurrentVo.attr_no , Point:finaleValue};
            finalData.push(talentInfo);
        }
        if(finalData.length > 0)
        SComateData.instance.protocol.send37006(SComateData.instance.CurrentComate.Id ,finalData);
    }

    private onClickOneBtn():void {
        if(this.CurrentVo == null||SComateData.instance.CurrentComate == null)
        return;
        this.CheckLearn(1);
    }

    private onClickMaxBtn():void {
        if(this.CurrentVo == null||SComateData.instance.CurrentComate == null)
        return;
        this.CheckLearn(this.CurrentVo.max_point);

    }

    public close(): void {
        super.close();
    }
}