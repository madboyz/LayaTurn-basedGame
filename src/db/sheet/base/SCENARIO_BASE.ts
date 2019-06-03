export class SCENARIO_BASE{
     no : any;
     next : any;
     pos : any;
     npc_no : any;
     talk : any;
     show_npc : any;
     end_event : any;
      protected keys():string{
            return  "no,next,pos,npc_no,talk,show_npc,end_event";

        }
}