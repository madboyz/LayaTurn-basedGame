export class MONSTER_BASE{
     no : any;
     name : any;
     type : any;
     title : any;
     lv : any;
     body : any;
     bmon_group_no_list : any;
     is_combative : any;
     att_area : any;
     trace_area : any;
     existing_time : any;
     can_concurrent_battle : any;
     can_be_killed_times : any;
     need_cleared_after_die : any;
     talk_ok_1 : any;
     talk_ok_2 : any;
     talk_fail_1 : any;
     talk_fail_2 : any;
     tips : any;
     res_scale : any;
      protected keys():string{
            return  "no,name,type,title,lv,body,bmon_group_no_list,is_combative,att_area,trace_area,existing_time,can_concurrent_battle,can_be_killed_times,need_cleared_after_die,talk_ok_1,talk_ok_2,talk_fail_1,talk_fail_2,tips,res_scale";

        }
}