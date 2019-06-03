export class ModuleType {
    private static This:ModuleType;
    private  _type:string;
	private  _btn:object;
    private  _btnDict:Laya.Dictionary = new Laya.Dictionary();//[btn] = ModuleType
    private _pointHelp:Laya.Point = new Laya.Point();
    
    public static Pack:ModuleType = new ModuleType("pack");//背包
    constructor(type:string) {
        this._type = type;
    }

    /**
     * 根据btn返回ModuleType 
     * @param obj
     * 
     */
    public static getModuleByBtn(obj:object):ModuleType
    {
        return this.This._btnDict.get(obj);
    }

    public get type():string
    {
        return this._type;
    }

    public set btn(value:object)
    {
        if(value)
        {
            this._btnDict.set(value,this);
        }
        else if(this._btn)
        {
            this._btnDict.remove(this._btn);
        }
        this._btn = value;
    }
    
    public get btn():object
    {
        return this._btn;
    }
    
    public get btnGlobalPoint():Laya.Point
    {
        this._pointHelp = new Laya.Point(0,0);
        if(this._btn && this._btn.hasOwnProperty("localToGlobal"))
        {
            this._pointHelp = this._btn["localToGlobal"](this._pointHelp, this._pointHelp);
        }
        return this._pointHelp;
    }
}