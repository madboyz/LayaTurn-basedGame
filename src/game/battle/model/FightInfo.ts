import { S20007_1 } from "../../../net/pt/pt_20";
import { SRoleData } from './../../../net/data/SRoleData';

export class FightInfo {
    public objInfo: S20007_1;

    //是否是主队,true为主队，false为客队
    public isMain: boolean;

    public isFlg: boolean = false;//是否操作过
    public dead = DEAD_TYPE.NODEAD;
    public Side = 0;//服务端认为的哪一边
    public get boid(): number {
        return this.objInfo.BoId;
    }

    public dispose(): void {
        this.objInfo = null;
        this.isFlg = false;
        this.dead = DEAD_TYPE.NODEAD;
        Laya.Pool.recover("FightInfo", this);
    }

    public get isPlayer(): boolean {
        if (this.isMain && (this.objInfo.ParentObjId == SRoleData.instance.roleId)) {
            return true;
        }
        return false;
    }

    public get isPet(): boolean {
        if (this.isMain && this.objInfo.OwnerPlayerBoId > 0) {
            return true;
        }
        return false;
    }
}