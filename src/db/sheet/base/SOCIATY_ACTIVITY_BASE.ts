export class SOCIATY_ACTIVITY_BASE{
     no : any;
     name : any;
     icon : any;
     level : any;
     activity_time : any;
     activity_des : any;
     actionName : any;
     actionType : any;
     action : any;
      protected keys():string{
            return  "no,name,icon,level,activity_time,activity_des,actionName,actionType,action";

        }
}