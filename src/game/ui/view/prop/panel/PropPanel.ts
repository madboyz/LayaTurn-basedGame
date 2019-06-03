import { PropertyEnumCode } from "../../../../property/RoleProperty";
import { MountInfo } from "../../../compent/data/MountInfo";
import { PetInfo } from "../../../compent/data/PetInfo";
import { RoleInfo } from "../../../compent/data/RoleInfo";
import { ComateInfo } from "../../comate/data/ComateInfo";

export class PropPanel extends ui.main.PropPanelUI {
    private info: any;
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.sameLevelEliminate = false;
        this.mResouce = [

        ];
    }

    public initComp() {
        super.initComp();
        this.updateData();
    }

    public update(): void {
        this.updateData();
    }

    public updateData(): void {
        this.updateTitle();
        this.updateValue();
    }

    private updateTitle(): void {
        if (this.info instanceof RoleInfo) {
            this.txt_sys.text = "人物属性";
        }
        else if (this.info instanceof PetInfo) {
            this.txt_sys.text = "宠物属性";
        }
        else if (this.info instanceof MountInfo) {
            this.txt_sys.text = "坐骑属性";
        }
        else if (this.info instanceof ComateInfo) {
            this.txt_sys.text = "伙伴属性";
        }
    }

    private updateValue(): void {
        if (this.info instanceof RoleInfo) {
            this.value_0.text = this.info.Hp + "";
            this.value_1.text = this.info.ActSpeed + "";
            this.value_2.text = this.info.PhyAtt + "";
            this.value_3.text = this.info.MagAtt + "";
            this.value_4.text = this.info.PhyDef + "";
            this.value_5.text = this.info.MagDef + "";
            this.value_6.text = this.info.Crit / 100 + "%";
            this.value_7.text = this.info.Ten / 100 + "%";
            this.value_8.text = this.info.PHY_COMBO_ATT_PROBA / 100 + "%";
            this.value_9.text = this.info.MAG_COMBO_ATT_PROBA / 100 + "%";
            this.value_10.text = this.info.STRIKEBACK_PROBA / 100 + "%";
            this.value_11.text = this.info.ABSORB_HP_COEF / 100 + "%";

        }
        else if (this.info instanceof PetInfo) {
            this.value_0.text = this.info.Hp + "";
            this.value_1.text = this.info.ActSpeed + "";
            this.value_2.text = this.info.PhyAtt + "";
            this.value_3.text = this.info.MagAtt + "";
            this.value_4.text = this.info.PhyDef + "";
            this.value_5.text = this.info.MagDef + "";
            this.value_6.text = this.info.Crit / 100 + "%";
            this.value_7.text = this.info.Ten / 100 + "%";
            this.value_8.text = this.info.PhyComboAttProba / 100 + "%";
            this.value_9.text = this.info.MagComboAttProba / 100 + "%";
            //this.value_10.text = this.info.ABSORB_HP_COEF + "";
            this.value_10.text = this.info.StrikebackProba / 100 + "%";
            this.value_11.text = this.info.AbsorbHpCoef / 100 + "%";
        }
        else if (this.info instanceof MountInfo) {
            this.value_0.text = this.info.getAttrValue(PropertyEnumCode.OI_CODE_HP_LIM);
            this.value_1.text = this.info.getAttrValue(PropertyEnumCode.OI_CODE_ACT_SPEED);
            this.value_2.text = this.info.getAttrValue(PropertyEnumCode.OI_CODE_PHY_ATT);
            this.value_3.text = this.info.getAttrValue(PropertyEnumCode.OI_CODE_MAG_ATT);
            this.value_4.text = this.info.getAttrValue(PropertyEnumCode.OI_CODE_PHY_DEF);
            this.value_5.text = this.info.getAttrValue(PropertyEnumCode.OI_CODE_MAG_DEF);
            this.value_6.text = Number(this.info.getAttrValue(PropertyEnumCode.OI_CODE_CRIT))/100 + "%";
            this.value_7.text = Number(this.info.getAttrValue(PropertyEnumCode.OI_CODE_TEN))/100 + "%";
            this.value_8.text = Number(this.info.getAttrValue(PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA))/100 + "%";
            this.value_9.text = Number(this.info.getAttrValue(PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA))/100 + "%";
            this.value_10.text = Number(this.info.getAttrValue(PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA))/100 + "%";
            this.value_11.text = Number(this.info.getAttrValue(PropertyEnumCode.OI_CODE_ABSORB_HP_COEF))/100 + "%";
        }
        
        else if (this.info instanceof ComateInfo) {
            this.value_0.text = this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_HP_LIM) + "";
            this.value_1.text = this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_ACT_SPEED) + "";
            this.value_2.text = this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_PHY_ATT) + "";
            this.value_3.text = this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_ATT) + "";
            this.value_4.text = this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_PHY_DEF) + "";
            this.value_5.text = this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_DEF) + "";
            this.value_6.text = Number(this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_CRIT))/100 + "%";
            this.value_7.text = Number(this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_TEN))/100 + "%";
            this.value_8.text = Number(this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA))/100 + "%";
            this.value_9.text = Number(this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA))/100 + "%";
            this.value_10.text = Number(this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA))/100 + "%";
            this.value_11.text = Number(this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_ABSORB_HP_COEF))/100 + "%";

            // this.value_0.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_HP_LIM, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_HP_LIM));
            // this.value_1.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_ACT_SPEED, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_ACT_SPEED));
            // this.value_2.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_PHY_ATT, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_PHY_ATT));
            // this.value_3.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_MAG_ATT, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_ATT));
            // this.value_4.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_PHY_DEF, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_PHY_DEF));
            // this.value_5.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_MAG_DEF, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_DEF));
            // this.value_6.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_CRIT, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_CRIT));
            // this.value_7.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_TEN, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_TEN));
            // this.value_8.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_PHY_COMBO_ATT_PROBA));
            // this.value_9.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_COMBO_ATT_PROBA));
            // this.value_10.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_ABSORB_HP_COEF, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_ABSORB_HP_COEF));
            // this.value_11.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA, this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_STRIKEBACK_PROBA));

            // var critValue = this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_ATT) + this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_ATT)
            // this.value_3.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_PHY_CRIT,critValue);
            // this.value_4.text = this.value_3.text;
            // this.value_5.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_ACT_SPEED,this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_ACT_SPEED));
            // this.value_6.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_MAG_ATT,this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_ATT));
            // this.value_7.text = PropertyUtil.GetPropertyDec(PropertyEnumCode.OI_CODE_MAG_DEF,this.info.getBaseAttributeValue(PropertyEnumCode.OI_CODE_MAG_DEF));
            // this.value_8.text = this.value_3.text;
            // this.value_9.text = this.value_3.text;
        }
    }

    public open(...args): void {
        this.info = args[0];
        super.open();
    }
    public initEvent(): void {
    }
    public removeEvent(): void {
    }

    public close(): void {
        super.close();
    }
}