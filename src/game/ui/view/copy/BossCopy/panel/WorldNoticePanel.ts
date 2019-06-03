import { HtmlUtils } from "../../../../../utils/HtmlUtils";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";

export class WorldNoticePanel extends ui.main.WorldNoticePanelUI {
    constructor() {
        super(); 
        this.layer = UILEVEL.POP_5;
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS},
        ];
        
    }
    private role:FightMonsterView;

    public initComp() {
        super.initComp();
        this.centerX = this.centerY = NaN;
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.changeScale = 0.6;
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.role.x = this.headBg.x + this.headBg.width*this.headBg.scaleX/2 
        this.role.y = this.headBg.y + this.headBg.height*this.headBg.scaleY/2+50 - 15;
        this.role.mouseEnabled = false;
        this.headBg.mouseEnabled = false;
        if(this.role.info == null)
        {
            this.role.info = {};
        }
        
        this.box.addChildAt(this.role,2);
        HtmlUtils.setHtml(this.Txt.style,3,20,"left","middle");
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }

    public open(...args): void {
        super.open();
        var currentInfo = args[0];
        this.DisplayerUI(currentInfo);
        this.y = Laya.stage.height - 204;
    }
    private DisplayerUI(currentInfo)
    {
        var vo:FbVo = FbVo.get(currentInfo.dun_no);
        if(!vo)
        return;
        var name = HtmlUtils.addColor(vo.name , "#fae512",20) + HtmlUtils.addColor("刷新了" , "#ffffff",20);
        this.Txt.innerHTML = name;
        this.role.info.ParentObjId = vo.mon_show_no;
        this.role.info.LookIdx = 1;
        this.role.updateSkin();
    }

    public initEvent(): void {
        this.BgImage.on(Laya.Event.CLICK , this, this.GoToBossPanel);
    }

    public removeEvent(): void {
        this.BgImage.off(Laya.Event.CLICK , this, this.GoToBossPanel);
    }

    private GoToBossPanel(): void {
        UIManager.instance.openUI(UIID.SYS_COPY_BOSS,null,1);
        this.close();
    }

    public close(): void {
        super.close();
    }
}