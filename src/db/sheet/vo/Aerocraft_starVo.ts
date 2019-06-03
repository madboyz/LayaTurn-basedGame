
import { SheetManager } from "../SheetManager";
import { AEROCRAFT_STAR_BASE } from "../base/AEROCRAFT_STAR_BASE";
import { Aerocraft_skinVo } from "./Aerocraft_skinVo";

export class Aerocraft_starVo extends AEROCRAFT_STAR_BASE{

   public static get(id : number,index : number = -1):Aerocraft_starVo{
           if(this[id])return this[id];
           var vo : Aerocraft_starVo = new Aerocraft_starVo();
             this[id] = vo;
           return SheetManager.get("aerocraft_star",id,this[id],vo.keys(),index);
    }

    private static List: Aerocraft_starVo[];
    public static get getAll(): Aerocraft_starVo[] {
      if(!this.List)
      {
        this.List = []
        var list: any = SheetManager.getList("aerocraft_star");
        var vo:Aerocraft_starVo;
        for (var key in list) {
          vo = this.get(parseInt(key));
          if(vo.body_anim)
          {
            this.List.push(vo);
          }
        }
      }
      return this.List;
    }

    public static getCfgBySkinNo(skinNo:number):Aerocraft_starVo{
      var list = this.getAll;
      for (let i = 0; i < list.length; i++) {
        var cfg:Aerocraft_starVo = list[i];
        if(cfg.illusion_no == skinNo){
          return cfg;
        }
      }
      return null;
    }

    // public static getAnim(mountId:number):string
    // {
    //   var anim = "";
    //   var vo:Aerocraft_starVo = Aerocraft_starVo.get(mountId);
    //   if(!vo) return "";
    //   if(vo.body_anim == ""||!vo.body_anim)
    //   {
    //     var list = this.getAll;
    //     for (let i = 0; i < list.length; i++) {
    //       const element = list[i];
    //       if(mountId >= element.no)
    //       {
    //         anim = element.body_anim;
    //       }
    //     }
    //   }
    //   else
    //   anim = vo.body_anim;
    //   return anim;
    // }

    public static getSkinNumByStar(star:number):number{
      var cfgs = this.getAll;
      for (let i = cfgs.length - 1; i >= 0 ; i--) {
        var cfg = cfgs[i];
        if(star >= cfg.no){
          return cfg.illusion_no;
        }
      }
      return 0;
    }

    public static canTrans(no:number):boolean
    {
      var arr:Array<Aerocraft_starVo> = this.getAll;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element.no == no)
        {
          return true;
        }
      }
      return false;
    }

    public static get maxVo():Aerocraft_starVo
    {
        var arr:Array<Aerocraft_starVo> = this.getAll;
        var len:number = arr.length - 1;
        return arr[len];
    }

    public static nextStar(no:number):Aerocraft_starVo
    {
      var arr:Array<Aerocraft_starVo> = this.getAll;
      var len:number = arr.length;
      for (let index = 0; index < len; index++) {
        var element = arr[index];
        if(element.no == no)
        {
          return arr[index + 1];
        }
      }
    }
}