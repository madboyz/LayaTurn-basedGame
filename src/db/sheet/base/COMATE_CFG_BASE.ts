export class COMATE_CFG_BASE{
     no : any;
     name : any;
     player_lv_need : any;
     quality : any;
     desc : any;
     head : any;
     body_anim : any;
     unlock_condition : any;
     weapon_anim : any;
     faction : any;
     skills : any;
     hp_lim : any;
     mp_lim : any;
     phy_att : any;
     phy_def : any;
     mag_att : any;
     mag_def : any;
     act_speed : any;
     heal_value : any;
     seal_resis : any;
     seal_hit : any;
     ten : any;
     crit : any;
     neglect_phy_def : any;
     neglect_mag_def : any;
     neglect_seal_resis : any;
     be_dam_reduce_coef : any;
     do_dam_scaling : any;
     revive_heal_coef : any;
     battle : any;
     res_scale : any;
     has_fight_res : any;
      protected keys():string{
            return  "no,name,player_lv_need,quality,desc,head,body_anim,unlock_condition,weapon_anim,faction,skills,hp_lim,mp_lim,phy_att,phy_def,mag_att,mag_def,act_speed,heal_value,seal_resis,seal_hit,ten,crit,neglect_phy_def,neglect_mag_def,neglect_seal_resis,be_dam_reduce_coef,do_dam_scaling,revive_heal_coef,battle,res_scale,has_fight_res";

        }
}