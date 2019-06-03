import { SCopyData } from "../../../../../../net/data/SCopyData";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { S57019_1 } from "../../../../../../net/pt/pt_57";
import { FightMonsterView } from "../../../../../battle/role/fight/FightMonsterView";
import { Delay } from "../../../../../../framework/utils/Delay";

export class PetCopyItem extends ui.main.petCopyItemUI {
    private role:FightMonsterView;
    public no:number;
    constructor() {
        super();
        this.initRole();
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private initRole():void
    {
        this.role = Laya.Pool.getItemByClass("FightMonsterView", FightMonsterView);
        this.role.interval = GameConfig.GAME_NORMAL_ANIMATION_SPEED;
        this.addChildAt(this.role,1);
    }

    private mData:FbVo;

    public set dataSource(data:FbVo)
    {
        if(!data) return;
        this.mData = data;
        this.updateData();
    }

    private async updateData()
    {
        if(this.role)
        {
            if(this.role.info == null)
            {
                this.role.info = {};
            }
            this.role.info.ParentObjId = this.mData.mon_show_no;
            this.role.info.LookIdx = 1;
            this.role.updateSkin();
            this.role.scale(0.7,0.7);
        }
        this.role.x = this.head.x + this.head.width/2 - 28;
        this.role.y = this.head.y + this.head.height/2;
        var curItemInfo:S57019_1 = SCopyData.instance.getPetCopyItemInfo(this.no,this.mData.no);
        if(curItemInfo)
        {
            if(curItemInfo.pass == 1 && curItemInfo.times > 0)
            {
                this.hasPass.visible = true;
            }
            else
            {
                this.hasPass.visible = false;
            }
            
            for (let index = 0; index < 3; index++) {
                if(curItemInfo.Star > 0 && curItemInfo.Star >= (index + 1) )
                {
                    this["star_" + index].skin = "comp/img_lightStar.png";
                }
                else
                {
                    this["star_" + index].skin = "comp/img_grayStar.png";
                }
            }
        }
        else
        {
            this.hasPass.visible = false;
            for (let index = 0; index < 3; index++) {
                this["star_" + index].skin = "comp/img_grayStar.png";
            }
        }
    }

    public get dataSource():FbVo
    {
        return this.mData;
    }

    private onClick():void
    {
        this.parent["selectPass"](this.mData);
    }

    public dispose():void
    {
        
    }

    public removeSelf():any
    {
        this.role.dispose();
        this.role = null;
        super.removeSelf();
    }
}