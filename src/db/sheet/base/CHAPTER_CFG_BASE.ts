export class CHAPTER_CFG_BASE{
     no : any;
     scene_no : any;
     lv_limit : any;
     icon : any;
     scene_name : any;
     dec : any;
     pass_list : any;
     chapter_rewards : any;
     show_reward : any;
      protected keys():string{
            return  "no,scene_no,lv_limit,icon,scene_name,dec,pass_list,chapter_rewards,show_reward";

        }
}