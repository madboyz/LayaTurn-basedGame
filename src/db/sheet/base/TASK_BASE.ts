export class TASK_BASE{
     no : any;
     name : any;
     target : any;
     desc : any;
     display : any;
     max_reward_round : any;
     type : any;
     team : any;
     lv : any;
     lv_down : any;
     lv_limit : any;
     prev_id : any;
     next : any;
     content : any;
     reward : any;
     actionType : any;
     action : any;
     accepted_submit : any;
     start_npc : any;
     end_npc : any;
     start_talk : any;
     end_talk : any;
     accept_start_event : any;
     battle_mon_type : any;
     unfinish_talk : any;
     finish_event : any;
     end_event : any;
     mon_type : any;
     end_item : any;
     start_item : any;
     end_cost : any;
     exp : any;
     is_repeat : any;
     repeat : any;
     week_task : any;
     day_task : any;
     race : any;
     career : any;
     prest : any;
     time_limit : any;
     tigger_item : any;
     start_ub_cost : any;
     start_cost : any;
     start_recycle : any;
     year : any;
     month : any;
     week : any;
     day : any;
     hour : any;
     server_start : any;
     ring : any;
     auto_accept : any;
      protected keys():string{
            return  "no,name,target,desc,display,max_reward_round,type,team,lv,lv_down,lv_limit,prev_id,next,content,reward,actionType,action,accepted_submit,start_npc,end_npc,start_talk,end_talk,accept_start_event,battle_mon_type,unfinish_talk,finish_event,end_event,mon_type,end_item,start_item,end_cost,exp,is_repeat,repeat,week_task,day_task,race,career,prest,time_limit,tigger_item,start_ub_cost,start_cost,start_recycle,year,month,week,day,hour,server_start,ring,auto_accept";

        }
}