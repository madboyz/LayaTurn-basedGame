import { SPetData } from "../../../../../net/data/SPetData";
import { RoleView } from "../../../../battle/role/RoleView";
import { PetInfo } from "../../../compent/data/PetInfo";
import { MsgManager } from "../../../manager/MsgManager";
import { OtherPetEquipPart } from "../comp/OtherPetEquipPart";
import { OtherPetSkillIcon } from "../comp/OtherPetSkillIcon";

export class OtherPetInfoPanel extends ui.main.OtherPetInfoPanelUI {
    private role: RoleView;
    private equipPart: OtherPetEquipPart;//宠物装备
    private selectVo: PetInfo;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.mResouce = [
            { url: "res/atlas/pet.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp(): void {
        super.initComp();
        this.combat.url = "res/atlas/number/fight.atlas";
        this.mouseThrough = true;
        this.initPart();
        this.initRole();
        this.initList();
    }

    private initPart(): void {
        if(!this.equipPart){
            this.equipPart = new OtherPetEquipPart();
            this.equipBox.addChild(this.equipPart);
            this.equipPart.y = 55;
        }

    }

    private initList(): void {
        this.skillList.itemRender = OtherPetSkillIcon;
        this.skillList.array = null;
        this.skillList.selectEnable = true;
        this.skillList.hScrollBarSkin = "";
        this.skillList.selectHandler = Laya.Handler.create(this, this.onSlotChange, null, false);
        // this.skillList.mouseHandler = Laya.Handler.create(this, this.onClickSkill, null, false);
    }

    private initRole(): void {
        if(!this.role){
            this.role = new RoleView();
            this.role.info = "";
            this.role.angle = 0;
            this.addChild(this.role);
            this.role.x = 285;
            this.role.y = 490;
        }
    }

    public open(...args): void {
        this.initWindow(true, true, "宠物详情", 550, 590, 140);
        super.open();
        this.initPart();
        this.initRole();
        this.selectVo = this.arg[0];
        this.updatePetInfo();
    }


    public initEvent(): void {
        this.btn_look.on(Laya.Event.CLICK,this,this.btn_lookClick);
    }
    
    public removeEvent(): void {
        this.btn_look.off(Laya.Event.CLICK,this,this.btn_lookClick);
    }

    public updatePetInfo(): void {
        this.updateData();
        this.skillList.tweenTo(0);
    }


    public updateInfo(): void {
        if (this.role) {
            this.role.resPath = this.selectVo.vo.body;
            this.role.updateSkin();
            this.role.scaleX = this.role.scaleY = this.selectVo.vo.res_scale_ui;
        }
        this.updateCombat(this.selectVo.BattlePower);
        this.txt_level.text = "Lv." + this.selectVo.Lv + " " + this.selectVo.stateName;
        this.addChild(this.pingfenLb);
        this.pingfenLb.text = "评分:" + this.selectVo.vo.battle;//评分
        this.txt_name.text = this.selectVo.vo.name;
    }

    public updateCombat(value: number): void {
        this.combat.text = value.toString();
    }

    private updateState(): void {
        if (this.selectVo.vo.grade == PetGradeType.TYPE_4) {
            this.god.visible = true;
        }
        else {
            this.god.visible = false;
        }

    }

    public updateData(): void {
        this.updateInfo();
        this.updateState();
        this.updateListData();
        this.updateEquip();
    }

    public updateEquip(): void {
        this.equipPart.updateAllEquip(this.selectVo);
    }

    private updateListData(): void {
        this.skillList.array = this.selectVo.skillSlots;
    }

    private oldItem: any;
    private selectItem: OtherPetSkillIcon;
    private onSlotChange(): void {
        this.selectItem = this.skillList.getCell(this.skillList.selectedIndex) as OtherPetSkillIcon;
        this.oldItem = this.skillList.selectedItem;
    }

    private onClickSkill(e: Laya.Event): void {
        // if (e.type != Laya.Event.CLICK) {
        //     return;
        // }

        // if (this.selectItem) {
        //     if (SPetData.instance.curInfo && SPetData.instance.curInfo.active) {
        //         if (this.selectItem.active && this.selectItem.needLearn) {
        //             UIManager.instance.openUI(UIID.SYS_PAR_CHANGE_SKILL);
        //         }
        //     }
        //     else {
        //         if (this.selectItem.active && this.selectItem.needLearn) {
        //             MsgManager.instance.showRollTipsMsg("该宠物暂未激活");
        //         }
        //     }
        // }
    }

    private btn_lookClick():void{
        UIManager.instance.openUI(UIID.SYS_LOOKPROP, [this.selectVo]);
    }

    public removeSelf(): any {
        this.role.dispose();
        this.role = null;
        this.selectVo = null;
        this.equipPart && this.equipPart.dispose();
        this.equipPart = null;
        super.removeSelf();
    }
}