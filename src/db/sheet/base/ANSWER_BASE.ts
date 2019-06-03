export class ANSWER_BASE{
     no : any;
     question : any;
     correct : any;
     option_1 : any;
     option_2 : any;
     option_3 : any;
     option_4 : any;
     type : any;
      protected keys():string{
            return  "no,question,correct,option_1,option_2,option_3,option_4,type";

        }
}