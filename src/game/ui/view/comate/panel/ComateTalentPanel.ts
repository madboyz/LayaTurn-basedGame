import { SComateData } from "../data/SComateData";
import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { CustomizeTexture } from "../../../../battle/scene/comp/CustomizeTexture";
import { Comate_attrVo } from "../../../../../db/sheet/vo/Comate_attrVo";
import { MsgManager } from "../../../manager/MsgManager";
import { RedDotType } from "../../../../redDot/RedDotList";
import { RedDotManager } from "../../../../redDot/RedDotManager";
import { Alert } from "../../../compent/Alert";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { ItemData } from "../../../compent/data/ItemData";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class ComateTalentPanel extends ui.main.ComateTalentPanelUI {
    constructor() {
        super();
        this.sameLevelEliminate = false;
        this.isShowEffect = false;
        this.mResouce = [
            
            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/comate.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private Icons:Laya.Dictionary = new Laya.Dictionary();
    private Boxs:Laya.Dictionary = new Laya.Dictionary();
    private TalentCountTexts:Laya.Dictionary = new Laya.Dictionary();
    private AttrVo:Laya.Dictionary = new Laya.Dictionary();

    public initComp() {
        super.initComp();
        this.BattleText.url = "res/atlas/number/fight.atlas";
        this.SelectImg.visible = false;
        for (let i = 1; i <= 12; i++) {
            var box = this.getChildByName(`box${i}`) as Laya.Box;
            this.Boxs.set(i,box);
            var text:Laya.Text = box.getChildAt(0) as Laya.Text;
            this.TalentCountTexts.set(i,text);
            var icon:Laya.Sprite = box.getChildAt(1) as Laya.Sprite;
            this.Icons.set(i,icon);
        }
        this.initIcon();
    }

    private async initIcon()
    {
        for (let i = 0; i < this.Icons.keys.length; i++) {
            const key = this.Icons.keys[i];
            var spr:Laya.Sprite = this.Icons.get(key);
            var url: string = `art/uiAnim/comate_skill_${key}.png`;
            var uuid = 1120+i;
            var customText = await CustomizeTexture.asyncGetTextureByUrl(url, uuid, spr.x, spr.y);
            if(! customText||(customText&&! customText.texture))continue;
            spr.texture = customText.texture;
            customText.dispose();
        }
    }

    public open(...args): void {
        super.open();
        this.SelectUpdate();
        this.updateRed();
    }

    public initEvent():void {
        for (let i = 0; i < this.Boxs.keys.length; i++) {
            const key = this.Boxs.keys[i];
            var box:Laya.Box = this.Boxs.get(key);
            box.on(Laya.Event.CLICK , this, this.onClickIcon , [key]);
        }
        this.ChangeTalentBtn.on(Laya.Event.CLICK , this, this.onClickExchangeBtn);
        // this.ResetTalentBtn.on(Laya.Event.CLICK , this, this.onClickResetExchangeBtn);
        this.AutoLearnBtn.on(Laya.Event.CLICK , this, this.onClickAutoLearnBtn);
        this.AttrBtn.on(Laya.Event.CLICK , this , this.OpenComateAttr);
        RedDotManager.instance.on(RedDotType.RDComateTalentLearn,this,this.learnRed);
        RedDotManager.instance.on(RedDotType.RDComateTalentChange,this,this.changeRed);
    }
    

    public removeEvent():void {
        for (let i = 0; i < this.Boxs.keys.length; i++) {
            const key = this.Boxs.keys[i];
            var box:Laya.Box = this.Boxs.get(key);
            box.off(Laya.Event.CLICK , this, this.onClickIcon);
        }
        this.ChangeTalentBtn.off(Laya.Event.CLICK , this, this.onClickExchangeBtn);
        // this.ResetTalentBtn.off(Laya.Event.CLICK , this, this.onClickResetExchangeBtn);
        this.AutoLearnBtn.off(Laya.Event.CLICK , this, this.onClickAutoLearnBtn);
        this.AttrBtn.off(Laya.Event.CLICK , this , this.OpenComateAttr);
        RedDotManager.instance.off(RedDotType.RDComateTalentLearn,this,this.learnRed);
        RedDotManager.instance.off(RedDotType.RDComateTalentChange,this,this.changeRed);
    }

    private OpenComateAttr():void
    {
        if(SComateData.instance.CurrentComate == null)
        return;
        if(!SComateData.instance.CurrentComate.IsHave)
        {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        UIManager.instance.openUI(UIID.SYS_LOOKPROP,[SComateData.instance.CurrentComate]);
    }

    public updateRed():void{
        this.learnRed(RedDotManager.instance.GetRD(RedDotType.RDComateTalentLearn)._isActiveSave);
        this.changeRed(RedDotManager.instance.GetRD(RedDotType.RDComateTalentChange)._isActiveSave);
       
    }

    private learnRed(show:boolean):void{
        this.AutoLearnBtn.refreshRed(show);
    }

    private changeRed(show:boolean):void{
        this.ChangeTalentBtn.refreshRed(show);
    }

    private onClickAutoLearnBtn()
    {
        if(SComateData.instance.CurrentComate == null)
        return;
        if(SComateData.instance.CurrentComate.IsHave == false)
        {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }
        if(SComateData.instance.CurrentComate.TalentPoint == 0)
        {
            MsgManager.instance.showRollTipsMsg("可用天赋不足！");
            return;
        }
        this.GetOnekeyPoint();
    }


    private GetOnekeyPoint()
    {
        var noUsePoint = SComateData.instance.CurrentComate.TalentPoint;
        /**
         * 拷贝一份数据用来动态处理
         */
        var usePointProject:Laya.Dictionary = new Laya.Dictionary();
        for (let i = 0; i < SComateData.instance.CurrentComate.AddPoint.keys.length; i++) {
            const key = SComateData.instance.CurrentComate.AddPoint.keys[i];
            var value = SComateData.instance.CurrentComate.AddPoint.get(key);
            usePointProject.set(key , value);
        }

        var finalData = [];
        for (let i = 0; i < this.AttrVo.keys.length; i++) {
            const key = this.AttrVo.keys[i];
            var usedPoint = usePointProject.get(key);
            var vo:Comate_attrVo = this.AttrVo.get(key);
            if(noUsePoint == 0)
            {
                break;
            }
            if(usedPoint == null)
            {
                usedPoint = 0;
            }
            while(usedPoint < vo.max_point&& noUsePoint > 0)
            {
                noUsePoint--;
                usedPoint++;
            }
            var talentInfo = {No:key , Point:usedPoint};
            finalData.push(talentInfo);
        }
        if(finalData.length > 0)
        SComateData.instance.protocol.send37006(SComateData.instance.CurrentComate.Id ,finalData);
    }
    

    private onClickResetExchangeBtn()
    {
        if(SComateData.instance.CurrentComate == null)
        return;
        if(SComateData.instance.CurrentComate.IsHave == false)
        {
            MsgManager.instance.showRollTipsMsg("未激活！");
            return;
        }

        var cfgCost = ConstVo.get("GAME_COMRADE_TALENTS_RESET_COST").val;
        var newData: ItemData = new ItemData(cfgCost[0]);
        var str: string = HtmlUtils.addColor("消耗", "#8a5428", 20) +
            HtmlUtils.addImage("art/item/" + newData.clientInfo.icon.replace(".png", ""), 25, 25) +
            HtmlUtils.addColor(cfgCost[1], "#3f8f4f", 20) +
            HtmlUtils.addColor("重置伙伴天赋加点", "#8a5428", 20);

        Alert.show(str, this, () => {
            SComateData.instance.protocol.send37005(SComateData.instance.CurrentComate.Id);
            this.SelectImg.visible = false;
        }, null, null, null, true, "重置加点");
    }

    public onClickExchangeBtn()
    {
        UIManager.instance.openUI(UIID.COMATE_CHANGE_TALENT);
    }

    public close(): void {
        Laya.timer.clear(this ,this.CheckCanUpgardeTalent);
        this.SelectImg.visible = false;
        super.close();
    }

    private onClickIcon(id:number)
    {
        var box:Laya.Box = this.Boxs.get(id);
        if(box == null)
        return;
        this.SelectImg.visible = true;
        this.SelectImg.x = box.x;
        this.SelectImg.y = box.y;
        var vo:Comate_attrVo = this.AttrVo.get(id);
        if(vo == null)
        return;
        UIManager.instance.openUI(UIID.COMATE_TALENT_INFO, [vo]);
    }

    private CheckCanUpgardeTalent()
    {
        if(SComateData.instance.CurrentComate == null||this.TalentCountTexts.keys.length == 0)
        return;
        var vos:Array<Comate_attrVo> = Comate_attrVo.getComateAttr(SComateData.instance.CurrentComate.No);
        for (let i = 0; i < vos.length; i++) {
            const vo:Comate_attrVo = vos[i];
            var curPoint = SComateData.instance.CurrentComate.AddPoint.get(vo.attr_no);
            
            var icon:Laya.Sprite = this.Icons.get(vo.attr_no);
            if(curPoint == null&&vo.pre_attr_no != 0&&SComateData.instance.CurrentComate.TalentPoint > 0)
            {
                var lastPoint = SComateData.instance.CurrentComate.AddPoint.get(vo.pre_attr_no);
                if(lastPoint&& lastPoint>= vo.pre_point)
                {
                    if(icon.filters&&icon.filters.length > 0)
                    {
                        icon.filters = [];
                    }
                    else
                    {
                        var GrayFilter:Laya.ColorFilter = new Laya.ColorFilter(ResUtils.colorMatrix);
                        icon.filters = [GrayFilter];
                    }
                }
            }
        }
    }

    public updateTalentAttr()
    {
        if(SComateData.instance.CurrentComate == null||this.TalentCountTexts.keys.length == 0)
        return;
        this.AttrVo.clear();
        var vos:Array<Comate_attrVo> = Comate_attrVo.getComateAttr(SComateData.instance.CurrentComate.No);
        for (let i = 0; i < vos.length; i++) {
            const vo:Comate_attrVo = vos[i];
            this.AttrVo.set(vo.attr_no , vo);
            var text:Laya.Text = this.TalentCountTexts.get(vo.attr_no);
            var curPoint = SComateData.instance.CurrentComate.AddPoint.get(vo.attr_no);
            var icon:Laya.Sprite = this.Icons.get(vo.attr_no);
            if(curPoint == null)
            {
                curPoint = 0;
                if(i == 0)
                {
                    icon.filters = [];
                }
                else
                {
                    var GrayFilter:Laya.ColorFilter = new Laya.ColorFilter(ResUtils.colorMatrix);
                    icon.filters = [GrayFilter];
                }
                
            }
            else
            {
                icon.filters = [];
            }
            
            text.text = `${curPoint}/${vo.max_point}`;
        }
    }

    public updateTalentPoint()
    {
        if(SComateData.instance.CurrentComate == null||this.TalentPointText == null)
        return;
        this.TalentPointText.text =  `拥有天赋点:${SComateData.instance.CurrentComate.TalentPoint}`;
    }

    public updateBattle()
    {
        if(SComateData.instance.CurrentComate == null||this.BattleText == null)
        return;

        this.sp_combat.visible = SComateData.instance.CurrentComate.IsHave;
        
        var bat = SComateData.instance.CurrentComate.BaseAttribute.get(PropertyEnumCode.OI_CODE_BATTLE_POWER);
        if(bat != null&& bat != 0)
        this.BattleText.text = bat.toString();
        else
        this.BattleText.text = SComateData.instance.CurrentComate.Sheet.battle.toString();
    }

    public SelectUpdate()
    {
        this.updateBattle();
        this.updateTalentPoint();
        this.updateTalentAttr();
        Laya.timer.clear(this ,this.CheckCanUpgardeTalent);
        Laya.timer.loop(500 , this , this.CheckCanUpgardeTalent);
    }
}