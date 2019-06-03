export class FACTION_BASE{
     no : any;
     race_limit : any;
     sex_limit : any;
     weapon : any;
     weapon_anim : any;
     body_anim : any;
     scene_no : any;
     introductions : any;
     desc : any;
     audio_style : any;
     skills : any;
     head_icon : any;
     res_scale : any;
      protected keys():string{
            return  "no,race_limit,sex_limit,weapon,weapon_anim,body_anim,scene_no,introductions,desc,audio_style,skills,head_icon,res_scale";

        }
}