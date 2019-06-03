export class LOTTERY_BASE{
     no : any;
     lv_limit : any;
     cost_goods : any;
     cost_byuanbao : any;
     cost_reset_goods : any;
     cost_reset : any;
     show_reward : any;
      protected keys():string{
            return  "no,lv_limit,cost_goods,cost_byuanbao,cost_reset_goods,cost_reset,show_reward";

        }
}