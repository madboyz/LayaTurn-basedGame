export class GUILD_SKILL_CONFIG_BASE{
     no : any;
     type : any;
     icon : any;
     name : any;
     cons_ratio : any;
     desc : any;
     sub_desc : any;
     vitality : any;
     goods_list : any;
     attr : any;
      protected keys():string{
            return  "no,type,icon,name,cons_ratio,desc,sub_desc,vitality,goods_list,attr";

        }
}