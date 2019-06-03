import { FightView } from "./FightView";
import { Comate_cfgVo } from "../../../../db/sheet/vo/Comate_cfgVo";
import { Fashion_cfgVo } from "../../../../db/sheet/vo/Fashion_cfgVo";
import { Debug } from "../../../../debug/Debug";

export class FightComateView extends FightView {
    constructor() {
        super();
    }

    public async updateSkin() {
        if (this.info == null) return;
        var id: number = this.info.ParentPartnerNo;
        var vo: Comate_cfgVo = Comate_cfgVo.get(id);
        if(!vo||(vo&&vo.body_anim == null))
        {
            Debug.serverLog(`伙伴表id${id}不存在请检查表！`);
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
        var res: string = vo.body_anim;
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
        //this.updateWeapon(this.info.Weapon, this.info.Sex == 1 ? 0 : 1);
    }

    public get width():number
    {
        return this.getBodyRealSize().x;
    }

    public get height():number
    {
        return this.getBodyRealSize().y;
    }

    public dispose(): void {
        Laya.Pool.recover("FightComateView", this);
        this.mBody.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        super.dispose();
    }
}