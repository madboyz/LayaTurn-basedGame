import { S20050 } from "../../../../../net/pt/pt_20";
import { FightInfo } from "../../../../battle/model/FightInfo";
import { SkillVo } from "../../../../../db/sheet/vo/SkillVo";
import { SkillItem1 } from "../../skill/item/SkillItem1";
import { Skill } from "../../../../skill/Skill";
import { SNewBattleData } from "../../../../../net/data/SNewBattleData";
import { MsgManager } from "../../../manager/MsgManager";

export class FightSkillPanel extends ui.main.BattleSkillPanelUI {
    private mItems: Laya.List;
    public isPlayer:boolean = true;
    constructor() {
        super();
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        this.initList();
    }

    private initList(): void {
        if (!this.mItems) {
            this.mItems = new Laya.List();
            this.addChild(this.mItems);
            this.mItems.itemRender = SkillItem1;
            this.mItems.size(438, 264);
            this.mItems.pos(90, 320);
            this.mItems.spaceX = 20;
            this.mItems.spaceY = 5;
            this.mItems.repeatX = 4;
            this.mItems.repeatY = 2;
            this.mItems.vScrollBarSkin = "";
            // this.mItems.content.left = 60;
            this.mItems.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            this.mItems.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
            this.mItems.mouseHandler = new Laya.Handler(this, this.onListMouseHandle);
            this.mItems.renderHandler = new Laya.Handler(this, this.onListRender);

        }
    }

    private onListRender(cell: SkillItem1, index: number): void {
        //cell.gray = cell.dataSource.IsUsable == 0;
        //cell.Frame.skin = "itemBase/skillBg_2.png";
        cell.updateBg();
        cell.EnableUpgrade(this.isPlayer);
    }

    private onListMouseHandle(e: Event, index: number) {
        if (e.type != Laya.Event.CLICK) return;
        var cell: SkillItem1 = this.mItems.getCell(index) as SkillItem1;
        var skill: Skill = cell.dataSource;
        if(skill == null)
        return;
        if(skill.LeftCDRounds > 0)
        {
            MsgManager.instance.showRollTipsMsg(`技能冷却剩余${skill.LeftCDRounds}回合`);
        }
        else
        {
            this.noti.send(NotityData.create(CMD.USE_SKILL, [skill.Id, skill.Boid]));
            this.close();
        }
    }

    public update() {
        super.update();
    }

    public open(...args): void {
        super.open();
        this.showSkill();
    }

    public showSkill(): void {
        var mainInfo:FightInfo[] = SNewBattleData.instance.getFightSelfBosInfo();
        for (let i = 0; i < mainInfo.length; i++) {
            const info = mainInfo[i];
            if (info.isFlg||info.dead == DEAD_TYPE.DISAPPEAR) continue;
            var skills: Skill[] = SNewBattleData.instance.allBoSkill.get(info.boid).values;
            skills.sort((item1:Skill , item2:Skill)=>{
                return item2.Lv - item1.Lv;
            });
            if (!skills.length||(skills.length == 0)) {
                this.tileTxt.text = '您目前还没有学习技能';
                this.mItems.array = null;
            } else {
                var str: string = info.isPlayer ? "主角" : "宠物";
                this.isPlayer = info.isPlayer;
                var txt: string = `选择${str}技能`;
                this.tileTxt.text = txt;
                this.mItems.array = skills;
            }
            break;
        }
    }

    public initEvent(): void {
        this.btnClose.on(Laya.Event.CLICK, this, this.close);
    }
    private noti: Notice = new Notice();

    public removeEvent(): void {
        this.btnClose.offAll(Laya.Event.CLICK);
    }
}