import { BaseLayer } from "./BaseLayer";
import { CustomizeTexture } from "../comp/CustomizeTexture";

export class GridLayer extends BaseLayer {
    private eventsIcon:Laya.Dictionary = new Laya.Dictionary();
    private readonly stepUrl = "bg/grid_step.png";
    /**
     * 
     * @param no 
     * @param x 
     * @param y 
     * @param needBottom 是否如插入的位图要放到最底下
     */
    public AddGrid(no:number , x:number , y:number , maxHeight ,needBottom:boolean = false)
    {
        var THIS = this;
        CustomizeTexture.GetTextureByUrlCallBack(this.stepUrl, no, 0, 0 ,Laya.Handler.create(this,
            function(dropTexture:CustomizeTexture){
                if(dropTexture.texture)
                {
                    var args:any = [];
                    args[0] = dropTexture.texture;
                    args[1] = x;
                    args[2] = maxHeight;
                    args[3] = dropTexture.texture.width;
                    args[4] = dropTexture.texture.height;
                    args[5] = null;
                    args[6] = 1;
                    args[7] = needBottom;
                    args[8] = no;
                    dropTexture.saveArgs(args);
                    var time: number = 200;
                    THIS.graphics._saveToCmd(Laya.Render._context._drawTexture, args);
                    if(THIS.graphics.cmds)
                    {
                        THIS.graphics.cmds.sort((a,b):number=>{
                            if(a[7] == b[7])
                            {
                                if(a[7] == false)
                                {

                                    if(a[8] > b[8])
                                    {
                                        return 1;
                                    }
                                    return -1;
                                }
                                else
                                {
                                    if(a[8] < b[8])
                                    {
                                        return 1;
                                    }
                                    return -1;
                                }
                            }
                            else
                            {
                                if(!a[7] && b[7])
                                {
                                    return 1;
                                }
                                else if(a[7] && !b[7])
                                {
                                    return -1;
                                }
                            }
                        })

                    }
                    dropTexture.tweenTo(args, { 2: y }, time , Laya.Ease.strongOut);
                }
                else
                {
                    dropTexture.dispose();
                }
            }
        ));
    }

    public clear(): void {
        this.graphics.clear();
    }


}

