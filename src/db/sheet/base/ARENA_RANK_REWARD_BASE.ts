export class ARENA_RANK_REWARD_BASE{
     no : any;
     begin_ranking : any;
     end_ranking : any;
     rookie_group : any;
     bronze_group : any;
     silver_group : any;
     gold_group : any;
     diamond_group : any;
     emperor_group : any;
      protected keys():string{
            return  "no,begin_ranking,end_ranking,rookie_group,bronze_group,silver_group,gold_group,diamond_group,emperor_group";

        }
}