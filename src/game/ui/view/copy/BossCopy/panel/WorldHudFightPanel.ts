import { SNewBattleData, SNewBattleEvent } from "../../../../../../net/data/SNewBattleData";
import { SRoleData } from "../../../../../../net/data/SRoleData";
import { S57013, S57103, S57103_1, S57013_1 } from "../../../../../../net/pt/pt_57";
import { ProgressBar } from "../../../../compent/ProgressBar";

export class WorldHudFightPanel extends ui.main.WorldHudFightPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [

            // { url: "res/atlas/chat.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private BossHpProgressBar: ProgressBar

    public initComp() {
        super.initComp();

        this.BossHpProgressBar = new ProgressBar();
        this.BossHpProgressBar.setBg(ResUtils.getCompUIUrl("progressBg"), ResUtils.getCompUIUrl("img_redBar"), 215, 27, 1, 1, 1, 1);
        this.BossHpProgressBar.centerX = this.BossHpProgressBar.centerY = NaN;
        this.BossHpProgressBar.x = 7;
        this.BossHpProgressBar.y = 253;
        this.BossHpProgressBar.setValue(10, 10);
        this.box.addChildAt(this.BossHpProgressBar, 2);
        this.MyRank.text = "";
        this.RankText.text = "";
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }


    private changeHp: number;//战斗中变化的血量
    private curHp: number;
    private curMaxHp: number;
    private fakeData: S57103;
    private myFakeData: S57103_1;

    public updateBossRank(data: S57103 = null) {
        if (data) {
            this.fakeData = new S57103;
            this.fakeData.item_1 = [];
            for (let i = 0; i < data.item_1.length; i++) {
                const element = data.item_1[i];
                var oneFakeData = new S57103_1;
                oneFakeData.roleId = element.roleId;
                oneFakeData.roleName = element.roleName;
                oneFakeData.damage = element.damage;
                if (oneFakeData.roleId == SRoleData.instance.roleId) {
                    this.myFakeData = oneFakeData;
                }
                this.fakeData.item_1.push(oneFakeData);
            }
            if (!this.myFakeData) {
                this.myFakeData = new S57103_1;
                this.myFakeData.damage = 0;
                this.myFakeData.roleId = SRoleData.instance.roleId;
                this.myFakeData.roleName = SRoleData.instance.roleName;
                this.fakeData.item_1.push(this.myFakeData);
            }
        }
        this.fakeData.item_1.sort((a: S57103_1, b: S57103_1): any => {
            return b.damage - a.damage;
        });


        //原来刷新的逻辑=================

        var strName = "";
        var strDamage = "";
        var myRankStr = "";
        var myDamageStr = "";
        for (let i = 0; i < this.fakeData.item_1.length; i++) {
            const element = this.fakeData.item_1[i];
            if (element.roleId == SRoleData.instance.roleId) {
                var indexStr = `${i + 1}.`;
                if (i > 9) {
                    indexStr = "未上榜 ";
                }
                myRankStr = `${indexStr}${element.roleName}`;
                myDamageStr = `${element.damage}`;
            }
        }
        for (let i = 0; i < 5; i++) {
            const element = this.fakeData.item_1[i];
            if (element) {
                var enterStr = "\n";
                strName += `${i + 1}.${element.roleName}${enterStr}`;
                strDamage += `${element.damage}${enterStr}`;
            }
        }
        this.RankText.text = strName;
        this.DamageText.text = strDamage;

        this.MyRank.text = myRankStr;
        this.MyDamage.text = myDamageStr;
    }

    public updateBossHp(hp: number = null, max_hp: number = null) {
        this.curMaxHp = max_hp || this.curMaxHp;
        this.curHp = hp || this.curHp;
        if (this.curHp < 0) {
            this.curHp = 0;
        } else if (this.curHp > this.curMaxHp) {
            this.curHp = this.curMaxHp;
        }
        var showHp = (this.curHp + this.changeHp) > 0 ? this.curHp + this.changeHp : 0;
        this.BossHpProgressBar.setValue(showHp, this.curMaxHp);
        this.bossHp.text = `${showHp}/${this.curMaxHp}`;
    }

    public open(...args): void {
        super.open();
        this.changeHp = 0;
        this.curHp = 0;
        this.curMaxHp = 0;
        this.fakeData = null;
        this.myFakeData = null;
    }

    public initEvent(): void {
        SNewBattleData.instance.on(SNewBattleEvent.BATTLE_DAM_EVENT, this, this.battleDamage);
    }

    public removeEvent(): void {
        SNewBattleData.instance.off(SNewBattleEvent.BATTLE_DAM_EVENT, this, this.battleDamage);
    }

    private battleDamage(type: number, changeHp: number): void {
        if (type == BOTYPE.WORLD_BOSS) {
            this.changeHp += changeHp;
            this.myFakeData && (this.myFakeData.damage -= changeHp);
            this.updateBossHp();
            this.updateBossRank();
        }

    }

    public close(): void {
        super.close();
    }
}