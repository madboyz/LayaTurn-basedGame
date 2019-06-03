import { S12002_1, S12005_1 } from "../../net/pt/pt_12";

export class AoiInfo{
    private _PlayerInfo: S12002_1;//其他玩家信息
    private _ObjectInfo: S12005_1;//怪物信息
    constructor()
    {
    }

    public getInfo(objType : RoleType):any
    {
        if(objType == RoleType.OBJ_PLAYER)
        {
            return this._PlayerInfo;
        }
        else
        {
            return this._ObjectInfo;
        }
    }

    public set PlayerInfo(data: S12002_1)
    {
        this._PlayerInfo = data;
    }

    public set ObjeInfo(data: S12005_1)
    {
        this._ObjectInfo = data;
    }
}