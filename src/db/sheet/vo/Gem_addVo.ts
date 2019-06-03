import { SheetManager } from "../SheetManager";
import { GEM_ADD_BASE } from "../base/GEM_ADD_BASE";

export class Gem_addVo extends GEM_ADD_BASE{

   public static get(id : number,index : number = -1):Gem_addVo{
           if(this[id])return this[id];
           var vo : Gem_addVo = new Gem_addVo();
             this[id] = vo;
           return SheetManager.get("gem_add",id,this[id],vo.keys(),index);
    }
}