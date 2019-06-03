import { FightView } from "./FightView";
import { FightInfo } from './../../model/FightInfo';
import { Fighting_monsterVo } from './../../../../db/sheet/vo/Fighting_monsterVo';
import { Debug } from "../../../../debug/Debug";
import { Fashion_cfgVo } from "../../../../db/sheet/vo/Fashion_cfgVo";

export class FightMonsterView extends FightView {
    public changeScale:number = 1;

    constructor() {
        super();
    }

    public async updateSkin() {
        if (this.info == null) return;
        var id: number = this.info.ParentObjId;
        var vo: Fighting_monsterVo = Fighting_monsterVo.get(id);
        if(!vo||(vo&&vo.action_res == null))
        {
            Debug.serverLog(`怪物表id${id}不存在请检查表！`);
            return;
        }
        var _scale = 0.8;
        if(vo.res_scale != 0)
        {
            _scale = vo.res_scale;
        }
        this.scaleY = _scale*this.changeScale;
        if(this.scaleX < 0)
        {
            this.scaleX = -_scale*this.changeScale;
        }
        else
        {
            this.scaleX = _scale*this.changeScale;
        }
        var path: number = GMath.getPath(this.angle);
        try {
            var res: string = vo.action_res[this.info.LookIdx - 1];
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

    public get width():number
    {
        return this.getBodyRealSize().x;
    }

    public get height():number
    {
        return this.getBodyRealSize().y;
    }

    public dispose(): void {
        this.changeScale = 1;
        Laya.Pool.recover("FightMonsterView", this);
        this.mBody.interval = GameConfig.GAME_BATTLE_ANIMATION_SPEED;
        super.dispose();
    }

}