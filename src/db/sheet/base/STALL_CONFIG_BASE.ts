export class STALL_CONFIG_BASE{
     no : any;
     type : any;
     sub_type : any;
     price_type : any;
     price : any;
     c_order : any;
     need_show : any;
     name : any;
      protected keys():string{
            return  "no,type,sub_type,price_type,price,c_order,need_show,name";

        }
}