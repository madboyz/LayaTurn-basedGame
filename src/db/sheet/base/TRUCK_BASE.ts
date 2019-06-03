export class TRUCK_BASE{
     no : any;
     truck_lv : any;
     ts_time : any;
     ts_money_type : any;
     ts_money_num : any;
     reward_money_type : any;
     reward_money_num : any;
     deduct_coef : any;
     evolve_money_type : any;
     evolve_money_num : any;
     evolve_rate_money : any;
     evolve_rate_goods : any;
     event_rate : any;
     direct_evolve_money_type : any;
     direct_evolve_money_num : any;
     refresh_money_type : any;
     refresh_money_num : any;
      protected keys():string{
            return  "no,truck_lv,ts_time,ts_money_type,ts_money_num,reward_money_type,reward_money_num,deduct_coef,evolve_money_type,evolve_money_num,evolve_rate_money,evolve_rate_goods,event_rate,direct_evolve_money_type,direct_evolve_money_num,refresh_money_type,refresh_money_num";

        }
}