

import { SNewBattleData } from "../../../net/data/SNewBattleData";
import { FightView } from "../role/fight/FightView";
import { FightInfo } from "../model/FightInfo";
import { Delay } from "../../../framework/utils/Delay";

//执行移动命令
export class Move {
    private time: number = 300;//执行移动时间
    /**
     * 
     * 
     * @param {number} curId  当前攻击者ID
     * @param {number} targetId 攻击目标ID
     * @returns 
     * 
     * @memberOf Move
     */
    public async moveToTarget(curId: number, targetId: number) {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(curId);
        var info: FightInfo = SNewBattleData.instance.allFightInfos.get(curId);
        if (!role&&!info) return;
        var targetRole: FightView = SNewBattleData.instance.allBattleBo.get(targetId);
        var targetInfo: FightInfo = SNewBattleData.instance.allFightInfos.get(targetId);
        if(!targetRole&&!targetInfo) return;
        var dis: number = targetInfo.isMain ? -100 : 100;
        var x: number = targetRole.x + dis;
        var y: number = targetRole.y + (targetInfo.isMain ? - 63 : 63);
        if(role.x == x&& role.y == y) return;
        role.action = Action.stand;
        await this.tweenMove(role, x, y);
        role.action = Action.stand;
    }

    

    public async moveToPrototed(pId: number, targetId: number) {
        var prototed: FightView = SNewBattleData.instance.allBattleBo.get(pId);
        if (!prototed) return;//没有保护者
        var targetRole: FightView = SNewBattleData.instance.allBattleBo.get(targetId);
        if (!targetRole) return;
        var info: FightInfo = SNewBattleData.instance.allFightInfos.get(targetId);
        if(!targetRole&&!info)
        return;
        var dis: number = info.isMain ? -50 : 50;
        var x: number = targetRole.x + dis;
        var y: number = targetRole.y + (info.isMain ? - 55 : 55);
        if(prototed.x == x&& prototed.y == y) return;
        await this.tweenMove(prototed, x, y);
        prototed.action = Action.stand;
    }

    public async moveToCenter(curId: number) {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(curId);
        if (!role) return;
        var x: number = Laya.stage.width / 2;
        var y: number = Laya.stage.height / 2;
        if(role.x == x&& role.y == y) return;
        await this.tweenMove(role, x, y);
        role.action = Action.stand;
    }


    private tweenMove(role, x, y , ease=Laya.Ease.strongOut) {
        if (!role) return;
        return new Promise((resolve) => {
            Laya.Tween.to(role, { x: x, y: y }, this.time, ease, Laya.Handler.create(this, () => {
                resolve(true );
            }));
        })
    }


    public async backToPlace(curId: number) {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(curId);
        var info: FightInfo = SNewBattleData.instance.allFightInfos.get(curId);
        if (!role&&!info) return;
        if (role.x == role.OriginalX && role.y == role.OriginalY) {
            role.action = Action.stand;
            return;//在原地，就不进行tween了
        }
        await this.tweenMove(role, role.OriginalX, role.OriginalY);
        if(info.isMain&&role.angle != -180)
            role.angle = -180;
        else if(!info.isMain&&role.angle != 45)
            role.angle = 45;
        role.action = Action.stand;
    }


    public async run(id: number, result: number) {
        var role: FightView = SNewBattleData.instance.allBattleBo.get(id);
        if (!role) return;
        role.action = Action.run;
        role.scaleX = -role.scaleX;
        await Delay.delay(300);
        if (result != 0) {
            role.scaleX = -role.scaleX;
            return;
        }
        await this.disappear(role);
    }

    //消失
    public disappear(role: FightView) {
        return new Promise((resolve) => {
            Laya.Tween.to(role, { x: -200 }, 300, null, Laya.Handler.create(this, () => {
                resolve();

            }));
        });

    }

    public dispose(): void {
        Laya.Pool.recover("Move", this);
    }
}