export class PORTAL_BASE{
     no : any;
     name : any;
     target_scene_no : any;
     target_xy : any;
     lv_need : any;
     race_need : any;
     faction_need : any;
     bind_gamemoney_cost : any;
     bind_yuanbao_cost : any;
      protected keys():string{
            return  "no,name,target_scene_no,target_xy,lv_need,race_need,faction_need,bind_gamemoney_cost,bind_yuanbao_cost";

        }
}