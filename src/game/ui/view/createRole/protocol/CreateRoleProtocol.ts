import { C10003 } from './../../../../../net/pt/pt_10';
import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
import { SdkManager } from '../../../../../net/SdkManager';
export class CreateRoleProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    /**
     * 申请创建角色
     * @param {number} [rece=3] 种族
     * @param {number} [sex=1] 性别
     * @param {number} [faction=1] 门派
     * @param {string} [name="onlyWe"] 姓名 
     * @param {string} [channel="ios"] 渠道
     * @memberof CreateRoleProtocol
     */
    public requestCreateRole(race:number = 3,sex:number = 1,faction:number = 1,name:string = "onlyWe",channel:string = "ios"):void
    {
        var msg:C10003 = new C10003();
        msg.Race = race;
        msg.Sex = sex;
        msg.Faction = faction;
        msg.Name = name;
        msg.Channel = GameConfig.GAME_CHANNEL;
        var user_id = "";
        try {
            
            if(SdkManager.instance.LoginInfo&&SdkManager.instance.LoginInfo.user_id)
            {
                user_id = SdkManager.instance.LoginInfo.user_id.toString();
            }
        } catch (error) {
            
        }
        msg.UserID = user_id;
        this.send(msg);
    }
}