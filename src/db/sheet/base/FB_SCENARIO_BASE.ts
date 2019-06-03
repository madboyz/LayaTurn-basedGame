export class FB_SCENARIO_BASE{
     no : any;
     enter_trigger : any;
     pass_trigger : any;
     kill_monster_trigger : any;
     create_monster_trigger : any;
      protected keys():string{
            return  "no,enter_trigger,pass_trigger,kill_monster_trigger,create_monster_trigger";

        }
}