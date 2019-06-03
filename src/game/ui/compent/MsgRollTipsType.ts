export class MsgRollTipsType {
    private _showBg:boolean;
    private _color:string;
    
    public static msgRollTips1:MsgRollTipsType = new MsgRollTipsType("#ff0000",false);//红色
    public static msgRollTips2:MsgRollTipsType = new MsgRollTipsType("#ffffff",true);//白色
		
    constructor(color:string,showBg:boolean) {
        this._color = color;
        this._showBg = showBg;
    }
		
    public get showBg():boolean
    {
        return this._showBg;
    }
    
    public get color():string
    {
        return this._color;
    }
}