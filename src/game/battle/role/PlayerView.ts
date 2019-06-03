import { RoleView } from "./RoleView";
import { RoleProperty, PropertyEnumCode, Attribute } from "../../property/RoleProperty";
import { S12002_1 } from "../../../net/pt/pt_12";
import { FactionVo } from "../../../db/sheet/vo/FactionVo";
import { AoiInfo } from "../../aoi/AoiInfo";
import { GoodsVo } from './../../../db/sheet/vo/GoodsVo';
import { Fashion_cfgVo } from "../../../db/sheet/vo/Fashion_cfgVo";
export class PlayerView extends RoleView {
    protected mWeapon: Laya.Animation;//武器（如果有时装 武器动画不需要显示）
    protected mAttr: RoleProperty;//角色属性
    constructor() {
        super();
        this.mAttr = new RoleProperty();
        this.mWeapon = new Laya.Animation();
        this.addChild(this.mWeapon);
        this.mWeapon.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.mWeapon.pivotX = 800 / 2;
        this.mWeapon.pivotY = 455;
        //test初始化几个基础属性
        // for (let i = 1; i <= 7; i++) {
        //     this.mAttr.AddAttribute(i,200);
        // }
    }

    
    public set isFly(value:boolean)
    {
        if(this._isFly ==value)
        return;
        if(value)
        {
            this.mBody.y = this.mBody.y - this.offsetY;
            this.mMount.y = this.mMount.y - this.offsetY;
            this.mWeapon.y = this.mWeapon.y - this.offsetY;
        }
        else
        {
            this.mBody.y = this.mBody.y + this.offsetY;
            this.mMount.y = this.mMount.y + this.offsetY;
            this.mWeapon.y = this.mWeapon.y + this.offsetY;
        }
        this._isFly = value;
    }
    
    public get isFly():boolean
    {
        return this._isFly;
    }

    public updateSkin(): void {
        if (this.info == null) return;
        var info: AoiInfo = this.info;
        var playerInfo = info.getInfo(RoleType.OBJ_PLAYER);
        if (playerInfo == null) return;
        //时装用的是这个playerInfo.Clothes
        var vo: FactionVo = FactionVo.get(playerInfo.Faction);
        var path: number = GMath.getPath(this.angle);
        if(playerInfo.Clothes == 0||!playerInfo.Clothes)
        {
            this.resPath = vo.body_anim[playerInfo.Sex == 1 ? 0 : 1];
        }
        else
        {
            var fashionVo:Fashion_cfgVo = Fashion_cfgVo.get(playerInfo.Clothes);
            if(fashionVo&&fashionVo.body_anim)
            {
                this.resPath = fashionVo.body_anim;
            }
            else
            this.resPath = vo.body_anim[playerInfo.Sex == 1 ? 0 : 1];
        }
        
        if(this.resPath != "")
        {
            var url: string = ResUtils.getRoleUrl(this.resPath, this.action, path);
            this.asyncUpdateSKin(url);
        }
        //模型自带武器
        //this.updateWeapon(playerInfo.Weapon, playerInfo.Sex == 1 ? 0 : 1);
        this.updateMount(playerInfo.AerocraftNo);
    }

    public updateWeapon(weaponId: number, index: number): void {
        if (!weaponId||weaponId == 0) 
        {
            this.mWeapon.clear();
            return;//没有武器
        }
        index = index == 0 ? 1 : 0;
        var goodsVo: GoodsVo = GoodsVo.get(weaponId);
        if(goodsVo == null||(goodsVo&&goodsVo.body_anim== null))
        return;
        var path: number = GMath.getPath(this.angle);
        this.weponPath = goodsVo.body_anim[index] + "/body";
        var url: string = ResUtils.getRoleUrl(this.weponPath, this.action, path);
        this.asyncUpdateSKin(url, this.mWeapon);
    }


    /**
     * 如果属性id存在只是赋值
     * @param id 
     * @param value 
     */
    public SetAttribute(id: number, value: number) {
        this.mAttr.AddAttribute(id, value);
    }

    /**
     * 有可能返回是null
     * @param id 
     */
    public GetAttribute(id: number): Attribute {
        return this.mAttr[id];
    }
    public dispose(): void {
        this.mWeapon.stop();
        this.mWeapon.clear();
        if (this.info != null&& this.info instanceof AoiInfo) {
            Laya.Pool.recover("AoiInfo", this.info);
        }
        if(this["__proto__"]["constructor"]["name"] == "PlayerView")
        Laya.Pool.recover("PlayerView", this);
        super.dispose();
    }

}