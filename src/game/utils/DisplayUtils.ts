export class DisplayUtils {
    constructor() {
    }

    /**
     * 移除数组里的元素
     * @static
     * @param {Array<any>} array1 
     * @param {Array<any>} array2 
     * @memberof Comp
     */
    public static removeArray(array1:Array<any>):void
    {
        var array2Length:number = array1.length;
        for(var i:number = 0;i < array2Length;i++)
        {
            this.removeItem(array1,array1[i]);
        }
    }

    /**
     * 删除数组项 
     * @param array
     * @param item
     * 
     */		
    private static removeItem( array:Array<any> , item:any ):void
    {
        var len:number = array.length;
        for( var i:number = 0;i < len;i++)
        {
            if( array[i] == item )
            {
                array.splice(i,1);
            }
        }
    }

    public static clearArrayItems(arr:Array<any>):void
    {
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            if(element.hasOwnProperty("removeSelf"))
            {
                element.removeSelf();
                element = null;
            }
        }
        this.removeArray(arr);
    }

    /**
     * 从arr数组中删除不再使用的 
     * @param arr
     * @param usedNum 有多少个有用的，usedNum=0表示所有都删除
     * 
     */		
    public static delNotUse(arr:Array<any>, usedNum:number):void
    {
        if(arr == null || arr.length <= usedNum)
        {
            return;
        }
        var tmp:number = usedNum;
        for(var i:number = usedNum; i < arr.length; i++)
        {
            var p:any = arr[i];
            if(p instanceof Laya.Sprite)
            {
                p.removeSelf();
                p = null;
            }
            else
            {
                if(p.hasOwnProperty("dispose"))
                {
                    p.dispose();
                    p = null;
                }
                else
                {
                    this.removeMe(p);
                }
            }
        }
        if(arr.length > tmp)
        {
            arr.length=usedNum;
        }
    }

    /**
     * 从显示列表中移除，null，或者没有parent不报错 
     * @param mc
     * 
     */		
    public static removeMe(mc:any):void
    {
        if(mc == null)
        {
            return;
        }
        if(mc.parent != null)
        {
            mc.parent.removeChild(mc);
        }
    }
}