import { SheetManager } from "../SheetManager";
import { FB_BASE } from "../base/FB_BASE";

export class FbVo extends FB_BASE{

   public static get(id : number,index : number = -1):FbVo{
           if(this[id])return this[id];
           var vo : FbVo = new FbVo();
             this[id] = vo;
           return SheetManager.get("fb",id,this[id],vo.keys(),index);
    }

    private static List: Array<any>;
    public static getAll(): void{
      if(!this.List)
      {
        this.List = []
        var list: any = SheetManager.getList("fb");
        var vo:FbVo;
        for (var key in list) {
          vo = this.get(parseInt(key));
          if(this.List[vo.type] == null)
          {
            this.List[vo.type] = [];
          }
          this.List[vo.type].push(vo);
        }
      }
    }

    /**
     * 通过类型获得副本列表
     * @static
     * @param {number} type
     * @returns {Array<FbVo>}
     * @memberof FbVo
     */
    public static getListByType(type:number):Array<FbVo>
    {
        this.getAll();
        return this.List[type];
    }

    /**
     * 是否宠物类型副本
     * @readonly
     * @type {boolean}
     * @memberof FbVo
     */
    public get isPetCopy():boolean
    {
      return this.type == CopyType.PET;
    }

    /**
     * 是否世界boss
     * @readonly
     * @type {boolean}
     * @memberof FbVo
     */
    public get isWorldBoss():boolean
    {
      return this.type == CopyType.WORLD;
    }

    //帮派BOSS
    public get isGuildBoss():boolean
    {
      return this.type == CopyType.GUILD_BOSS;
    }

    public get isGrid():boolean
    {
      return this.type == CopyType.Grid;
    }
}