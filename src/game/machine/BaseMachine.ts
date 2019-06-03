/**
 * 基础自动化类
 */
export class BaseMachine{
    protected targets:Laya.Dictionary;
    protected data:Array<any>;
    constructor() {
    }
    public init(info:Array<any>):void{
        this.data = info;
    }
    
    public update():void{
        if(!this.targets)
        return;
    }

    public dispose():void {
        if(this.targets)
        {
            this.targets = null;
        }
    }

    public addTarget(uuid:number ,target:any)
    {
        if(!this.targets)
        {
            this.targets = new Laya.Dictionary();
        }
        this.targets.set(uuid,target);
    }

    public removeTarget(uuid:number)
    {
        if(!this.targets)
        return;
        this.targets.remove(uuid);
    }

    public ClearTarget()
    {
        if(!this.targets)
        return;
        this.targets.clear();
    }

}