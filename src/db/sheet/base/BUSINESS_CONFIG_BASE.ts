export class BUSINESS_CONFIG_BASE{
     no : any;
     type : any;
     sub_type : any;
     init_num : any;
     refresh_cycle : any;
     buy_count_limit : any;
     global_buy_count_limit : any;
     group_name : any;
     group_id : any;
     sell_count_limit : any;
     global_sell_count_limit : any;
     price_type : any;
     price : any;
     extent : any;
     c_order : any;
     need_show : any;
      protected keys():string{
            return  "no,type,sub_type,init_num,refresh_cycle,buy_count_limit,global_buy_count_limit,group_name,group_id,sell_count_limit,global_sell_count_limit,price_type,price,extent,c_order,need_show";

        }
}