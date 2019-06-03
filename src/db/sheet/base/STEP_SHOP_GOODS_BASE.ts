export class STEP_SHOP_GOODS_BASE{
     no : any;
     goods_no : any;
     quality : any;
     bind_state : any;
     goods_name : any;
     price_type : any;
     discount_price : any;
     price : any;
      protected keys():string{
            return  "no,goods_no,quality,bind_state,goods_name,price_type,discount_price,price";

        }
}