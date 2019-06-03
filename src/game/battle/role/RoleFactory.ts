import { FactionVo } from "../../../db/sheet/vo/FactionVo";
import { MonsterVo } from "../../../db/sheet/vo/MonsterVo";
import { NpcVo } from "../../../db/sheet/vo/NpcVo";
import { PetVo } from "../../../db/sheet/vo/PetVo";
import { ObjView } from "./ObjView";
import { PlayerView } from "./PlayerView";

export class RoleFactory{
    /**
     * 穿件一个aoi玩家
     * @param data 
     */
    public static CreateAOiPlayer(faction:number , sex:number):PlayerView
    {
        var player: PlayerView = Laya.Pool.getItemByClass("PlayerView", PlayerView);
        player.SheetData = FactionVo.get(faction);
        player.resPath = player.SheetData.body_anim[sex == 1 ? 0 : 1];
        return player;
    }

    /**
     * 创建一个非战斗场景的非玩家view
     * @param roleType 
     * @param roleNo 
     */
    public static CreateNormalSceneObj(roleType:RoleType , roleNo:number):ObjView
    {
        var obj:ObjView = Laya.Pool.getItemByClass("ObjView", ObjView);
        obj.Type = roleType;
        RoleFactory.UpdateNormalSceneObj(roleType, roleNo, obj);
        return obj;
    }
    /**
     * 更新一个非战斗场景单位数据
     * @param roleType 
     * @param roleNo 
     * @param obj 
     */
    public static UpdateNormalSceneObj(roleType:RoleType , roleNo:number , obj: ObjView)
    {
        switch(roleType)
        {
            case RoleType.OBJ_PARTNER:
            obj.SheetData = PetVo.get(roleNo);
            break;
            case RoleType.OBJ_NPC:
            obj.SheetData = NpcVo.get(roleNo);
            break;
            case RoleType.OBJ_MONSTER:
            obj.SheetData = MonsterVo.get(roleNo);
            break;
        }
        
        if(obj.SheetData&&obj.SheetData.body != null)
        obj.resPath = obj.SheetData.body;
        if(roleType == RoleType.OBJ_MONSTER){
            obj.scaleX = obj.scaleY = obj.SheetData.res_scale;
        }else{
            obj.scaleX = obj.scaleY = 1;
        }
    }
}