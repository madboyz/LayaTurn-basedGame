export class RMB_SHOP_BASE{
     no : any;
     money : any;
     name : any;
     type : any;
     subtype : any;
     get_goods : any;
     feedback_goods : any;
     extra : any;
      protected keys():string{
            return  "no,money,name,type,subtype,get_goods,feedback_goods,extra";

        }
}