export class ADD_POINTS_BASE{
     no : any;
     hp_lim : any;
     mp_lim : any;
     phy_att : any;
     mag_att : any;
     phy_def : any;
     mag_def : any;
     act_speed : any;
     hit : any;
     dodge : any;
     seal_resis : any;
     crit : any;
     ten : any;
     seal_hit : any;
     heal_value : any;
      protected keys():string{
            return  "no,hp_lim,mp_lim,phy_att,mag_att,phy_def,mag_def,act_speed,hit,dodge,seal_resis,crit,ten,seal_hit,heal_value";

        }
}