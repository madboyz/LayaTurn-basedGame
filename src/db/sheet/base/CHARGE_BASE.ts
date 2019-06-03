export class CHARGE_BASE{
     no : any;
     money : any;
     yuanbao : any;
     name : any;
     is_first : any;
     type : any;
     first_feedback_goods : any;
     first_recharge_goods : any;
     normal_feekback_type : any;
     normal_feekback_num : any;
      protected keys():string{
            return  "no,money,yuanbao,name,is_first,type,first_feedback_goods,first_recharge_goods,normal_feekback_type,normal_feekback_num";

        }
}