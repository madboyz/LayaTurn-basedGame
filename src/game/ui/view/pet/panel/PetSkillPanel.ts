import { PetInfo } from "../../../compent/data/PetInfo";
import { PetSkillSlotItem } from "../item/PetSkillSlotItem";
import { MsgManager } from "../../../manager/MsgManager";
import { SPetEvent } from "../../../../../net/data/SPetData";
import { Alert } from "../../../compent/Alert";
import { HtmlUtils } from "../../../../utils/HtmlUtils";

export class PetSkillPanel extends ui.main.PetSkillPanelUI{
    private selectVo:PetInfo;
    private _curIndex:number = 0;
    private _changePet:boolean = false;
    constructor() {
        super();
    }

    public initComp():void
    {
        this.initEvent();
        this.initList();
    }

    private initList():void
    {
        this.skillList.itemRender = PetSkillSlotItem;
        this.skillList.array = null;
        this.skillList.vScrollBarSkin = "";
        this.skillList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.skillList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.skillList.selectEnable = true;
        this.skillList.selectHandler = Laya.Handler.create(this,this.onSlotChange,null,false);
        this.skillList.mouseHandler = Laya.Handler.create(this,this.onClickSkill,null,false);
    }

    public updatePetInfo(vo:PetInfo):void
    {
        if(vo.active)
        {
            if(this.selectVo && this.selectVo.PartnerId != vo.PartnerId)
            {
                this._changePet = true;
            }
            else{
                this._changePet = false;
            }
            this.selectVo = vo;
            this.updateSkillList();
            this.updateData();
            this._changePet && this.skillList.tweenTo(0);
        }
    }

    private initEvent():void
    {
        this.btn_forget.on(Laya.Event.CLICK,this,this.onForget);
        this.tujianBtn.on(Laya.Event.CLICK,this,this.tujianBtnClick);
    }
    
    private removeEvent():void
    {
        this.btn_forget.off(Laya.Event.CLICK,this,this.onForget);
        this.tujianBtn.off(Laya.Event.CLICK,this,this.tujianBtnClick);
    }

    private changeSelect():void
    {
        var i:number = 0,cells:Array<any> = this.skillList.cells,len:number = cells.length,cell:any;
        for (i ; i < len ; i ++){
            cell = cells[i];
            cell && cell.checkSelect(this.oldItem);
        }
    }

    public updateData():void
    {
        this.updateInfo();
    }

    public updateSkillList():void
    {
        this.skillList.array = this.selectVo.skillSlots;
    }

    public updateInfo():void
    {
        this.txt_lv.text = this.selectVo.vo.name + " Lv." + this.selectVo.Lv;
        this.parent && this.parent["updateCombatPos"](178,false);
    }

    public updateCost():void
    {
    }

    private oldItem:any;
    private selectItem:PetSkillSlotItem;
    private onSlotChange():void
    {
        this.selectItem = this.skillList.getCell(this.skillList.selectedIndex) as PetSkillSlotItem;
        this.oldItem = this.skillList.selectedItem;
        this._curIndex = this.skillList.selectedIndex;
        Laya.timer.callLater(this,this.changeSelect);
    }

    private onClickSkill(e:Laya.Event):void
    {
        if(e.type != Laya.Event.CLICK)
        {
            return;
        }

        if(this.selectItem)
        {
            if(this.selectItem.active && this.selectItem.needLearn)
            {
                UIManager.instance.openUI(UIID.SYS_PAR_CHANGE_SKILL);
            }
        }
    }
    
    private tujianBtnClick():void{
        UIManager.instance.openUI(UIID.PET_SKILL_TUJIAN_PANEL);
    }

    private onForget():void
    {
        if(this.selectItem)
        {
            if(this.selectItem.active && !this.selectItem.needLearn)
            {
                var isInBornSkill = false;
                var inborn_skill_pool = this.selectVo.vo.inborn_skill_pool;
                for (let i = 0; i < inborn_skill_pool.length; i++) {
                    const no = inborn_skill_pool[i];
                    if(this.selectItem.dataSource.vo.no == no)
                    {
                        isInBornSkill = true;
                        break;
                    }
                }
                if(isInBornSkill)
                {
                    MsgManager.instance.showRollTipsMsg("天生技能不能遗忘!");
                    return;
                }
                var str:string = HtmlUtils.addColor("您确定要遗忘掉宠物技能","#8a5428",20) + HtmlUtils.addColor(this.selectItem.vo.name,"#ffdd00",20) +
                HtmlUtils.addColor("?遗忘技能后宠物将失去这个技能.","#8a5428",20);
                Alert.show(str,this,()=>{
                    this.parent.event(SPetEvent.PET_REQUEST_FORGETSKILL,[[this.selectVo.PartnerId,this.selectItem.skillId]]);
                },null,null,null,true,"遗忘技能");
            }
            else
            {
                if(this.selectItem.needLearn)
                {
                    MsgManager.instance.showRollTipsMsg("技能槽无技能");
                }
                else
                {
                    MsgManager.instance.showRollTipsMsg("技能槽未解锁");
                }
            }
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("请先选择技能！");
        }
    }

    public removeSelf():any
    {
        this._changePet = false;
        this._curIndex = -1;
        this.selectVo = null;
        this.removeEvent();
        super.removeSelf();
    }
}