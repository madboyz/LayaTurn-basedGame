import { PetSkillSlotItem } from "../../item/PetlearnSkillItem";
import { SBagData } from "../../../../../../net/data/SBagData";
import { MsgManager } from "../../../../manager/MsgManager";
import { SPetData, SPetEvent } from "../../../../../../net/data/SPetData";

export class PetLearnSkillPanel extends ui.main.PetLearnSkillPanelUI {
    private _curIndex:number = 0;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.update();
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
    }

    public update():void
    {
        this.updateSkillList();
        this.updateInfo();
    }

    public open(...args): void {
        this.initWindow(true,true,"学习技能",489,560,165);
        super.open();
        if(SBagData.instance.prop.petSkillList.length > 0) {
            this.skillList.selectedIndex = 0;
            this.onSlotChange();
        }
    }

    public updateInfo():void
    {
        this.txt_lv.text = "所选宠物: " + SPetData.instance.curInfo.vo.name + " Lv." + SPetData.instance.curInfo.Lv ;
    }

    public updateSkillList():void
    {
        if(SBagData.instance.prop.petSkillList.length > 0)
        {
            this.txt_tips.visible = false;
        }
        else
        {
            this.txt_tips.visible = true;
        }
        this.skillList.array = SBagData.instance.prop.petSkillList;
    }

    private changeSelect():void
    {
        var i:number = 0,cells:Array<any> = this.skillList.cells,len:number = cells.length,cell:any;
        for (i ; i < len ; i ++){
            cell = cells[i];
            cell && cell.checkSelect(this.oldItem);
        }
    }

    public initEvent():void 
    {
        this.btn_learn.on(Laya.Event.CLICK,this,this.onLearnSkill);
        this.tujianBtn.on(Laya.Event.CLICK,this,this.tujianBtnClick);
    }

    public removeEvent():void
    {
        this.btn_learn.off(Laya.Event.CLICK,this,this.onLearnSkill);
        this.tujianBtn.off(Laya.Event.CLICK,this,this.tujianBtnClick);
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
    
    private tujianBtnClick():void{
        UIManager.instance.openUI(UIID.PET_SKILL_TUJIAN_PANEL);
    }

    private onLearnSkill():void
    {
        if(this.selectItem)
        {
            this.event(SPetEvent.PET_REQUEST_LEARNSKILL,[[SPetData.instance.curInfo.PartnerId,this.selectItem.dataSource.GoodsId]]);
            this.close();
        }
        else
        {
            MsgManager.instance.showRollTipsMsg("没有选择任何技能书！");
        }
    }

    public close(): void {
        this._curIndex = -1;
        super.close();
    }
}