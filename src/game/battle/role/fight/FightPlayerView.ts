import { FightView } from "./FightView";
import { FactionVo } from './../../../../db/sheet/vo/FactionVo';
import { FightInfo } from './../../model/FightInfo';
import { GoodsVo } from "../../../../db/sheet/vo/GoodsVo";
import { Debug } from "../../../../debug/Debug";
import { Fashion_cfgVo } from "../../../../db/sheet/vo/Fashion_cfgVo";

export class FightPlayerView extends FightView {
    protected mWeapon: Laya.Animation;//武器（如果有时装 武器动画不需要显示）
    constructor() {
        super();

        this.mWeapon = new Laya.Animation();
        this.addChild(this.mWeapon);
        this.mWeapon.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        this.mWeapon.pivotX = 800 / 2;
        this.mWeapon.pivotY = 455;
    }
    public updateSkin() {
        if (this.info == null) return;
        var Faction: number = this.info.Faction;
        var vo: FactionVo = FactionVo.get(Faction);
        if(!vo)
        return;
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
            if(this.info.Clothes == 0||!this.info.Clothes)
            {
                this.resPath = vo.body_anim[this.info.Sex == 1 ? 0 : 1];
            }
            else
            {
                var fashionVo:Fashion_cfgVo = Fashion_cfgVo.get(this.info.Clothes);
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
            if(this.mountPath != "")
            {
                var url: string = ResUtils.getRoleUrl(this.mountPath, Action.stand, path);
                this.asyncUpdateSKin(url, this.mMount);
            }
            //模型自带武器
            //this.updateWeapon(this.info.Weapon, this.info.Sex == 1 ? 0 : 1);
        } catch (error) {
            Debug.serverLog(error);
        }
    }


    public updateWeapon(weaponId: number, index: number): void {
        if (!weaponId) return;//没有武器
        // index = index == 0 ? 1 : 0;
        var goodsVo: GoodsVo = GoodsVo.get(weaponId);
        if(goodsVo == null||(goodsVo&&goodsVo.body_anim== null))
        return;
        var path: number = GMath.getPath(this.angle);
        this.weponPath = goodsVo.body_anim[index] + "/body";
        var url: string = ResUtils.getRoleUrl(this.weponPath , this.action, path);
        this.asyncUpdateSKin(url, this.mWeapon);
    }

    public dispose(): void {
        Laya.Pool.recover("FightPlayerView", this);
        this.mBody.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        super.dispose();
    }
}