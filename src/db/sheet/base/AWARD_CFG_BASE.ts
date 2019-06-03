export class AWARD_CFG_BASE{
     no : any;
     goods_rule : any;
     source_type : any;
     money : any;
     exp : any;
     vip_exp : any;
     talents : any;
     goods_list : any;
     condition : any;
     goods_added : any;
     extra_reward : any;
     mind_lv : any;
     train_point : any;
     contribute : any;
     life_skill_proficiency : any;
     sys_activity_times : any;
      protected keys():string{
            return  "no,goods_rule,source_type,money,exp,vip_exp,talents,goods_list,condition,goods_added,extra_reward,mind_lv,train_point,contribute,life_skill_proficiency,sys_activity_times";

        }
}