export class BEHAVIOR_BASE{
     no : any;
     type : any;
     reward_no : any;
     condition : any;
     precondition : any;
      protected keys():string{
            return  "no,type,reward_no,condition,precondition";

        }
}