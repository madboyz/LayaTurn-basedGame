import { GameLayer } from "../../../../../GameLayer";
import { RoleView } from "../../../../battle/role/RoleView";
import { RoleFactory } from "../../../../battle/role/RoleFactory";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { SMountData } from "../../../../../net/data/SmountData";
import { Aerocraft_starVo } from "../../../../../db/sheet/vo/Aerocraft_starVo";

export class UnLockMountView extends ui.main.UnLcokMountPanelUI{
    private _mask: Laya.Sprite;
    private static view:UnLockMountView;
    private mount:RoleView;
    private noti: Notice = new Notice();//用来通知controll的
    constructor() {
        super();
        this.addMask();
    }

    private addMask() {
        this._mask = new Laya.Sprite;
        this._mask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this._mask.name = "mask";
        this._mask.alpha = 0.5;
        this._mask.width = Laya.stage.width;
        this._mask.height = Laya.stage.height;
        this.addChildAt(this._mask, 0);
    }

    private initMount():void
    {
        if(!this.mount)
        {
            this.mount = new RoleView();
            this.mount.info = "";
            this.mount.angle = 0;
            this.mount.scaleX = this.mount.scaleY=1.5;
            this.addChildAt(this.mount,2);
            this.mount.x = 285;
            this.mount.y = 400;
        }
        this.mount.resPath = SMountData.instance.curInfo.curStarInfo.body_anim;
        this.mount.updateSkin();
        this.txt_name.text = SMountData.instance.curInfo.curStarInfo.name;
    }

    public pop(): void {
        this.initMount();
        this.show();
    }

    public static show(): void {
        if (this.view == null) {
            this.view = new UnLockMountView();
        }
        this.view.pop();
        if (this.view.parent == null) {
            GameLayer.instacne.uiLayer.addChild(this.view);
        }
    }

    private show() {
        this.btn_tran.on(Laya.Event.CLICK, this, this.onTran);
    }

    private hide() {
        this.btn_tran.off(Laya.Event.CLICK, this, this.onTran);
        this.mount && this.mount.dispose();
        this.mount = null;
        this.removeSelf();
    }

    private onOk(e: Laya.Event): void {
        UnLockMountView.hide();
    }

    private onTran(e: Laya.Event): void {
        //本身有问题，而且现在会自动幻化
        //this.noti.send(NotityData.create(NotityEvents.MOUNT_TRANS,Aerocraft_starVo.getSkinNumByStar(SMountData.instance.curInfo.curStarInfo.no)));
        UnLockMountView.hide();
    }

    /**
     * 隐藏提示框
     *
     */
    public static hide(): void {
        if (this.view != null) {
            this.view.hide();
        }
    }
}