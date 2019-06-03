export class NPC_BASE{
     no : any;
     name : any;
     type : any;
     title : any;
     race : any;
     faction : any;
     sex : any;
     lv : any;
     face : any;
     body : any;
     head : any;
     back : any;
     weapon : any;
     func_list : any;
     func_list2 : any;
     battle_cond : any;
     visible_cond : any;
     not_visible_cond : any;
     default_talk : any;
     copy_guide_pathfind : any;
      protected keys():string{
            return  "no,name,type,title,race,faction,sex,lv,face,body,head,back,weapon,func_list,func_list2,battle_cond,visible_cond,not_visible_cond,default_talk,copy_guide_pathfind";

        }
}