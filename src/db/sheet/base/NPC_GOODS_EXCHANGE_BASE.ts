export class NPC_GOODS_EXCHANGE_BASE{
     no : any;
     limit_time : any;
     goods_no : any;
     need_goods_list : any;
     func_name : any;
     tips : any;
      protected keys():string{
            return  "no,limit_time,goods_no,need_goods_list,func_name,tips";

        }
}