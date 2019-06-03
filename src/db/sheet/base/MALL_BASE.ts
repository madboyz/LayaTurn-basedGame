export class MALL_BASE{
     no : any;
     goods_no : any;
     quality : any;
     bind_state : any;
     sell_type : any;
     tppe_1 : any;
     tppe_limit : any;
     tppe_dec : any;
     price_type : any;
     price : any;
     discount_price : any;
     goods_type : any;
     buy_count_limit : any;
     count_limit_type : any;
     buy_count_limit_time : any;
     lv_need : any;
     vip_lv_need : any;
     repu_need : any;
     sex : any;
     race_need : any;
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
     is_appstore : any;
      protected keys():string{
            return  "no,goods_no,quality,bind_state,sell_type,tppe_1,tppe_limit,tppe_dec,price_type,price,discount_price,goods_type,buy_count_limit,count_limit_type,buy_count_limit_time,lv_need,vip_lv_need,repu_need,sex,race_need,faction_need,year,month,week,day,hour,server_start_day,refresh_interval,continue_day,continue_time,is_appstore";

        }
}