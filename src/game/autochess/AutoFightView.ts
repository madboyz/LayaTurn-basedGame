import { FightView } from "../battle/role/fight/FightView";
import { PetVo } from "../../db/sheet/vo/PetVo";
import { Debug } from "../../debug/Debug";
import { Fashion_cfgVo } from "../../db/sheet/vo/Fashion_cfgVo";

export class AutoFightView extends FightView {
    constructor() {
        super();
        this.mWeapon.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.mBody.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.mMount.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
    }

    public updateSkin(): void {
        if (!this.info) return;
        var id: number = this.info.ParentPartnerNo;
        var vo: PetVo = PetVo.get(id);
        if(!vo||(vo&&vo.body == null))
        {
            Debug.serverLog(`宠物表id${id}不存在请检查表！`);
            return;
        }
        var _scale = 0.8;
        if(vo.res_scale != 0)
        {
            _scale = vo.res_scale;
        }
        this.scaleY = _scale;
        if(this.scaleX < 0)
        {
            this.scaleX = -_scale;
        }
        else
        {
            this.scaleX = _scale;
        }
        var path: number = GMath.getPath(this.angle);
        try {
            var res: string = vo.body;
            if(this.info.Clothes == 0||!this.info.Clothes)
            {
                this.resPath = `${res}`;
            }
            else
            {
                var fashionVo:Fashion_cfgVo = Fashion_cfgVo.get(this.info.Clothes);
                if(fashionVo&&fashionVo.body_anim)
                {
                    this.resPath = fashionVo.body_anim;
                }
                else
                this.resPath = `${res}`;
            }
            if(this.resPath == "")
            return;
            if(vo.has_fight_res == 0)
            this.mAction = Action.stand;
            var url: string = ResUtils.getRoleUrl(this.resPath, this.action, path);
            this.asyncUpdateSKin(url);
        } catch (error) {
            Debug.serverLog(error);
        }
    }

    public dispose() {
        Laya.Pool.recover("AutoFightView", this);
        this.mBody.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        super.dispose();
    }
}