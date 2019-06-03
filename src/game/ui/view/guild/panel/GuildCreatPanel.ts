import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { ItemData } from "../../../compent/data/ItemData";
import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { MsgManager } from "../../../manager/MsgManager";

export class GuildCreatPanel extends ui.main.GuildCreatPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.mResouce = [

        ];
    }

    public initEvent(): void {
        this.creatBtn.on(Laya.Event.CLICK, this, this.creatBtnClick);
        this.cancelBtn.on(Laya.Event.CLICK, this, this.cancelBtnClick);
    }

    public removeEvent(): void {
        this.creatBtn.off(Laya.Event.CLICK, this, this.creatBtnClick);
        this.cancelBtn.off(Laya.Event.CLICK, this, this.cancelBtnClick);
    }

    public initComp() {
        super.initComp();
    }


    public open(...args): void {
        this.initWindow(true, false, "帮派列表", 550, 750, 50);
        super.open();
        this.guildInputLb.text = "";
        this.update();
    }

    private creatBtnClick(): void {
        if(!this.guildInputLb.text || this.guildInputLb.text == ""){
            MsgManager.instance.showRollTipsMsg("请先输入帮派名称");
            return;
        }
        SGuildData.instance.event(SGuildEvent.ASK_CREAT_GUILD,this.guildInputLb.text);
        this.close();
    }

    private cancelBtnClick(): void {
        this.close();
    }

    public update(): void {
        var cfg = ConstVo.get("CREATE_GANGS_COST").val[0];
        var costItem:ItemData = new ItemData(cfg[0]);
        // var haveItem: ItemData = SBagData.instance.prop.getItemDataByGoodsNo(cfg[0]);
        this.constNumLb.text = "x" + cfg[1];
        // if (haveItem.Count >= cfg[1]) {
        //     this.constNumLb.color = "#ffd521";
        // } else {
        //     this.constNumLb.color = "#ff0000";
        // }
        this.costIcon.skin = ResUtils.getItemIcon(costItem.clientInfo.icon);
    }

    public close(): void {
        super.close();
    }
}
