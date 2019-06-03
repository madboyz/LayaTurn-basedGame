import { S40010_1 } from "../../../../../net/pt/pt_40";
import { SGuildData, SGuildEvent } from "../data/SGuildData";
import { GuildPositionType, GuildHelper } from "../data/GuildHelper";
import { Alert } from "../../../compent/Alert";
import { HtmlUtils } from "../../../../utils/HtmlUtils";

export class GuildMenberHandlePanel extends ui.main.BasePanelUI {
    private param;//第一个参数为点的对象，第二个为点击的坐标点Y值
    private targetData: S40010_1;
    private clickPoint: Laya.Point;

    private funcBox1: Laya.Box;
    private funcBox2: Laya.Box;
    private bgImg1: Laya.Image;
    private bgImg2: Laya.Image;
    private maskClick: Laya.Sprite;

    private mainBtnList: Array<component.ScaleButton>;
    private subBtnList: Array<component.ScaleButton>;

    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.sameLevelEliminate = false;
        this.mResouce = [
        ];
    }


    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public initComp() {
        super.initComp();
        this.addMaskClick();
        this.initImg();
    }

    private addMaskClick() {
        this.maskClick = new Laya.Sprite;
        this.maskClick.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.maskClick.name = "mask";
        this.maskClick.alpha = 0;
        this.maskClick.width = Laya.stage.width;
        this.maskClick.height = Laya.stage.height;
        this.maskClick.on(Laya.Event.CLICK, this, this.close);
        this.addChild(this.maskClick);
    }

    private initImg(): void {
        this.funcBox1 = new Laya.Box;
        this.funcBox1.x = 136;
        this.funcBox1.width = 168;
        this.addChild(this.funcBox1);
        this.funcBox2 = new Laya.Box;
        this.funcBox2.x = 136;
        this.funcBox2.width = 168;
        this.addChild(this.funcBox2);
        this.bgImg1 = new Laya.Image;
        this.bgImg1.skin = "comp/img_tipsBg1.png";
        this.bgImg1.sizeGrid = "25,25,25,25";
        this.bgImg1.width = 168;
        this.funcBox1.addChild(this.bgImg1);
        this.bgImg2 = new Laya.Image;
        this.bgImg2.skin = "comp/img_tipsBg1.png";
        this.bgImg2.sizeGrid = "25,25,25,25";
        this.bgImg2.width = 168;
        this.funcBox2.addChild(this.bgImg2);
    }

    public open(...args): void {
        this.targetData = this.arg[0];
        this.clickPoint = this.arg[1];
        this.initWindow(false, false, "", 486, 390, 170);
        super.open();
        this.update();
    }

    public update(): void {
        var myGuildPosition = SGuildData.instance.myGuildPosition;
        var canRenmin = myGuildPosition.Position == GuildPositionType.leader && myGuildPosition.Position < this.targetData.Position;
        var canTiren = (myGuildPosition.Position == GuildPositionType.leader || myGuildPosition.Position == GuildPositionType.subLeader)
            && myGuildPosition.Position < this.targetData.Position;

        this.funcBox1.visible = this.funcBox2.visible = false;
        //第一列按钮
        if (!this.mainBtnList || !this.subBtnList) {
            this.mainBtnList = [];
            this.subBtnList = [];
            if (canRenmin) {
                var renminBtn = this.createBtn();
                renminBtn.on(Laya.Event.CLICK, this, this.mainBtnClick, [1]);
                this.funcBox1.addChild(renminBtn);
                renminBtn.label = "任命";
                this.mainBtnList.push(renminBtn);
                for (let i = myGuildPosition.Position + 1; i <= 4; i++) {
                    if (this.targetData.Position != i) {
                        var subRenminBtn = this.createBtn();
                        subRenminBtn.on(Laya.Event.CLICK, this, this.subBtnClick, [i]);
                        this.funcBox2.addChild(subRenminBtn);
                        subRenminBtn.label = GuildHelper.getPositionName(i);
                        this.subBtnList.push(subRenminBtn);
                    }
                }
            }
            if (canTiren) {
                var tirenBtn = this.createBtn();
                tirenBtn.on(Laya.Event.CLICK, this, this.mainBtnClick, [2]);
                this.funcBox1.addChild(tirenBtn);
                tirenBtn.label = "请离";
                this.mainBtnList.push(tirenBtn);
            }
        }
        this.layoutBtn();
        this.funcBox1.visible = true;
    }

    private mainY: number = 0;
    private subY: number = 0;
    private layoutBtn(): void {
        this.mainY = 50;
        for (let i = 0; i < this.mainBtnList.length; i++) {
            var btn = this.mainBtnList[i];
            btn.y = this.mainY;
            this.mainY += 58;
        }
        this.mainY -= 10;
        this.bgImg1.height = this.mainY;
        this.funcBox1.y = (this.clickPoint.y + this.mainY) > 654 ? (654 - this.mainY) : this.clickPoint.y

        this.subY = 50;
        for (let i = 0; i < this.subBtnList.length; i++) {
            var btn = this.subBtnList[i];
            btn.y = this.subY;
            this.subY += 58;
        }
        this.subY -= 10;
        this.bgImg2.height = this.subY;
        this.funcBox2.y = (this.clickPoint.y + this.subY) > 654 ? (654 - this.subY) : this.clickPoint.y

    }

    private createBtn(): component.ScaleButton {
        var btn = new component.ScaleButton;
        btn.skin = "comp/btn_bg3.png";
        btn.x = 82;
        btn.width = 114;
        btn.height = 56;
        btn.sizeGrid = "13,39,24,39";
        btn.stateNum = 1;
        btn.anchorX = btn.anchorY = 0.5;
        btn.labelSize = 25;
        btn.labelColors = "#b2660d";
        btn.labelPadding = "-3,0,0,0";
        return btn;
    }

    private mainBtnClick(index: number): void {
        if (index == 1) {
            this.funcBox1.visible = false;
            this.funcBox2.visible = true;
        } else if (index == 2) {
            //退出帮派
            var str: string = HtmlUtils.addColor("确定要将", "#8a5428", 20) + HtmlUtils.addColor(this.targetData.Name, "#00b007", 20)
                + HtmlUtils.addColor("请离帮派？", "#8a5428", 20);
            Alert.show(str, this, () => {
                SGuildData.instance.event(SGuildEvent.ASK_OTHER_EXIT_GUILD, this.targetData.PlayerId);
                this.close();
            }, null, null, null, true, "请离帮派");
        }
    }

    private subBtnClick(position: number): void {
        SGuildData.instance.event(SGuildEvent.ASK_GUILD_POSITION_CHANGE, [this.targetData.PlayerId, position]);
        this.close();
    }

    public close(): void {
        if (this.mainBtnList) {
            for (let i = 0; i < this.mainBtnList.length; i++) {
                this.mainBtnList[i].removeSelf();
                this.mainBtnList[i].destroy();
            }
            this.mainBtnList = null;
        }
        if (this.subBtnList) {
            for (let i = 0; i < this.subBtnList.length; i++) {
                this.subBtnList[i].removeSelf();
                this.subBtnList[i].destroy();
            }
            this.subBtnList = null;
        }
        this.param = null;
        this.targetData = null;
        this.clickPoint = null;
        super.close();
    }
}