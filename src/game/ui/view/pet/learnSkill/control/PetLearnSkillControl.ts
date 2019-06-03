import { PetLearnSkillProtocol } from "../protocol/PetLearnSkillProtocol";
import { PetLearnSkillPanel } from "../panel/PetLearnSkillPanel";
import { SPetEvent, SPetData } from "../../../../../../net/data/SPetData";
import { SBagData, SGoodsEvent } from "../../../../../../net/data/SBagData";
import { ItemData } from "../../../../compent/data/ItemData";

export class PetLearnSkillControl extends BaseControl {
    private protocol:PetLearnSkillProtocol;
    constructor() {
        super();
        this.panel = new PetLearnSkillPanel();
        this.protocol = new PetLearnSkillProtocol();
    }

    public set panel(value: PetLearnSkillPanel) {
        this.mPanel = value;
    }

    public get panel(): PetLearnSkillPanel {
        return this.mPanel as PetLearnSkillPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        SPetData.instance.on(SPetEvent.PET_LEARNSKILL_SUCCEFUL,this,this.onUpdateDatat);

        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD,this,this.onUpdateCost);

        this.panel.on(SPetEvent.PET_REQUEST_LEARNSKILL,this,this.onSend17041);
    }
    private removeEvent() {
        this.panel.off(SPetEvent.PET_REQUEST_LEARNSKILL,this,this.onSend17041);
        SPetData.instance.off(SPetEvent.PET_LEARNSKILL_SUCCEFUL,this,this.onUpdateDatat);

        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD,this,this.onUpdateCost);
    }

    private onSend17041(obj:any):void
    {
        this.protocol.send17041.apply(this.protocol,obj);
    }

    private onUpdateDatat():void
    {
        this.panel.update();
    }

    private onUpdateCost(data:ItemData):void
    {
        if(data && data.IsPetSkill)
        {
            this.panel.update();
        }
    }
}