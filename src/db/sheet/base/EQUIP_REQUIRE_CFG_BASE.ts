export class EQUIP_REQUIRE_CFG_BASE{
     no : any;
     name : any;
     need_talent : any;
     exclude : any;
     need_talent_coef : any;
     attr_coef : any;
      protected keys():string{
            return  "no,name,need_talent,exclude,need_talent_coef,attr_coef";

        }
}