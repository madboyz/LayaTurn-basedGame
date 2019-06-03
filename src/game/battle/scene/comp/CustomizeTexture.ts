export class CustomizeTexture {
    public id: number;
    public x: number;
    public y: number;
    public texture: Laya.Texture;
    public args: Array<any>;

    public saveArgs(args: Array<any>): void {
        this.args = args;
    }

    public setTexture(texture: Laya.Texture, id: number, x: number, y: number): void {
        this.texture = texture;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    public tweenTo(target: any, obj: object, timer, ease: any = null): Laya.Tween {
        return Laya.Tween.to(target, obj, timer, ease);
    }
    public dispose(): void {
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.texture = null;
        this.args = null;
        Laya.Pool.recover("DropTexturem", this);
    }

    public static asyncGetTextureByUrl(url: string, onlyId: number, x: number, y: number): any {
        return new Promise((resolve, reject) => {
            var t: Laya.Texture = Laya.Loader.getRes(url);
            var dropTexture: CustomizeTexture = Laya.Pool.getItemByClass("DropTexturem", CustomizeTexture);
            if (t) {
                dropTexture.setTexture(t, onlyId, x, y);
                resolve(dropTexture);//从缓存获取资源
            }
            else {
                Laya.loader.load(url, Laya.Handler.create(this, function (): void {//加载获取资源
                    dropTexture.setTexture(Laya.Loader.getRes(url), onlyId, x, y);
                    resolve(dropTexture);
                }));
            }
        });
    }
    /**
     * 封装回调加载
     * @param url 
     * @param onlyId 
     * @param x 
     * @param y 
     * @param onComplete 
     */
    public static GetTextureByUrlCallBack(url: string, onlyId: number, x: number, y: number , onComplete: Laya.Handler)
    {
        var t: Laya.Texture = Laya.Loader.getRes(url);
        var dropTexture: CustomizeTexture = Laya.Pool.getItemByClass("DropTexturem", CustomizeTexture);
            if (t) {
                dropTexture.setTexture(t, onlyId, x, y);
                onComplete.runWith(dropTexture);
            }else {
                Laya.loader.load(url, Laya.Handler.create(this, function (): void {//加载获取资源
                    dropTexture.setTexture(Laya.Loader.getRes(url), onlyId, x, y);
                    onComplete.runWith(dropTexture);
                }));
            }
    }
}