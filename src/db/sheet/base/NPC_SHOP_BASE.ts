export class NPC_SHOP_BASE{
     no : any;
     goods_no : any;
     quality : any;
     bind_state : any;
     goods_name : any;
     price_type : any;
     price : any;
     consumer_goods_list : any;
     goods_type : any;
     count_limit_type : any;
     buy_count_limit_time : any;
     lv_need : any;
     repu_need : any;
     race_need : any;
     sex_need : any;
     faction_need : any;
     year : any;
     month : any;
     week : any;
     day : any;
     hour : any;
     server_start_day : any;
     refresh_interval : any;
     continue_day : any;
     continue_time : any;
      protected keys():string{
            return  "no,goods_no,quality,bind_state,goods_name,price_type,price,consumer_goods_list,goods_type,count_limit_type,buy_count_limit_time,lv_need,repu_need,race_need,sex_need,faction_need,year,month,week,day,hour,server_start_day,refresh_interval,continue_day,continue_time";

        }
}