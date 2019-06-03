import { SheetManager } from "../SheetManager";
import { PET_CULTIVATE_BASE } from "../base/PET_CULTIVATE_BASE";

export class Pet_cultivateVo extends PET_CULTIVATE_BASE{

   public static get(id : number,index : number = -1):Pet_cultivateVo{
           if(this[id])return this[id];
           var vo : Pet_cultivateVo = new Pet_cultivateVo();
             this[id] = vo;
           return SheetManager.get("pet_cultivate",id,this[id],vo.keys(),index);
    }
    
  private static datas:Array<Pet_cultivateVo>;
  private static isAll: boolean;
  public static getAll(): void {
    if(!this.isAll)
    {
      this.isAll = true;
      this.datas = [];
      var ids: string = "pet_cultivate";
      var list: any = SheetManager.getList("pet_cultivate");
      for (var key in list) {
        this[ids] = null;
        var vo: Pet_cultivateVo = this.get(parseInt(key));
        this.datas.push(vo);
        if(!this[ids + "_" + vo.lv])
        {
          this[ids + "_" + vo.lv] = [];
        }
        this[ids + "_" + vo.lv].push(vo);
      }
    }
  }

  public static getByLv(lv: number,id:string = "pet_cultivate"):Array<Pet_cultivateVo> {
    this.getAll();
    var key: string = id + "_" + lv;
    this[key] && this[key].sort(this.sortCultivate);
    return this[key];
  }

  public static get maxVo():Pet_cultivateVo
  {
    this.getAll();
    this.datas.sort(this.sortCultivate);
    return  this.datas[this.datas.length - 1];
  }

  private static skillSlots:Array<Pet_cultivateVo>;
  public static get petSkillSlot():Array<Pet_cultivateVo>
  {
    if(!this.skillSlots)
    {
      this.skillSlots = [];
      this.getAll();
      for (let index = 0; index < this.datas.length; index++) {
        const element = this.datas[index];
        if(element.skill_slot > 0)
        {
          for (let index = 0; index < element.skill_slot; index++) {
              this.skillSlots.push(element);
          }
        }
      }
    }
    return this.skillSlots;
  }

  private static sortCultivate(a:Pet_cultivateVo,b:Pet_cultivateVo):number
  {
    if(a.no < b.no)
    {
      return -1;
    }
    return 1;
  }
}