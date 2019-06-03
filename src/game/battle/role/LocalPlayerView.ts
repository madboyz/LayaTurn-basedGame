import { PlayerView } from "./PlayerView";
import { FactionVo } from "../../../db/sheet/vo/FactionVo";
import { SRoleData, SRoleEvent } from './../../../net/data/SRoleData';
import { SMountData, SMountEvent } from "../../../net/data/SmountData";
import { Fashion_cfgVo } from "../../../db/sheet/vo/Fashion_cfgVo";
export class LocalPlayerView extends PlayerView {
    constructor() {
        super();
        this.isLocalPlayer = true;
        this.initEvent();
    }

    private initEvent(): void {
        SRoleData.instance.on(SRoleEvent.ROLE_WEAPON_CHANGE, this, this.updateSkin);
        
        SMountData.instance.on(SMountEvent.MOUNT_UPDATE_INFO , this, this.updateSkin);
    }

    

    public updateSkin() {
        if (this.info == null) return;
        if (this.info.Faction == null && this.info.Sex == null) return;
        var vo = FactionVo.get(this.info.Faction);
        var path: number = GMath.getPath(this.angle);
        if(SRoleData.instance.info.Clothes == 0)
        {
            this.resPath = vo.body_anim[this.info.Sex == 1 ? 0 : 1];
        }
        else
        {
            var fashionVo:Fashion_cfgVo = Fashion_cfgVo.get(SRoleData.instance.info.Clothes);
            if(fashionVo&&fashionVo.body_anim)
            {
                this.resPath = fashionVo.body_anim;
            }
            else
            this.resPath = vo.body_anim[this.info.Sex == 1 ? 0 : 1];
        }
        if(this.resPath != "")
        {
            var url: string = ResUtils.getRoleUrl(this.resPath, this.action, path);
            this.asyncUpdateSKin(url);
        }
        //模型自带武器
        //this.updateWeapon(SRoleData.instance.info.Weapon, this.info.Sex == 1 ? 0 : 1);
        if(SMountData.instance.curShowNo != 0)
        {
            this.isFly = true;
            this.updateMount(SMountData.instance.curShowNo);
        }
        else
        {
            this.isFly = false;
            this.updateMount(0);
        }
    }




    public dispose(): void {
        SRoleData.instance.off(SRoleEvent.ROLE_WEAPON_CHANGE, this, this.updateSkin);
        SMountData.instance.off(SMountEvent.MOUNT_UPDATE_INFO , this, this.updateSkin);
        Laya.Pool.recover("LocalPlayerView", this);
        super.dispose();
        this.isLocalPlayer = true;
    }
}