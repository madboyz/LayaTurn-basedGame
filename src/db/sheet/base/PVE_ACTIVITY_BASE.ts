export class PVE_ACTIVITY_BASE{
     no : any;
     name : any;
     lv_range : any;
     reward_type : any;
     bind_gamemoney : any;
     gamemoney : any;
     exp : any;
     par_exp : any;
     goods : any;
     goods_extra : any;
     times : any;
     times_use_goods : any;
     use_goods_no : any;
     dungeon_no : any;
     max_wave : any;
     mb_limit : any;
     show_goods : any;
     preview : any;
     level_tip : any;
      protected keys():string{
            return  "no,name,lv_range,reward_type,bind_gamemoney,gamemoney,exp,par_exp,goods,goods_extra,times,times_use_goods,use_goods_no,dungeon_no,max_wave,mb_limit,show_goods,preview,level_tip";

        }
}