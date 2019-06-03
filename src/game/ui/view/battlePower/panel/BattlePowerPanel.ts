import { SRoleData } from "../../../../../net/data/SRoleData";
import { Delay } from "../../../../../framework/utils/Delay";
import { GameUtils } from "../../../../utils/GameUtils";

export class BattlePowerPanel extends ui.main.BattlePowerPanelUI {
    private LastBattlePower:number = 0;
    private isCut = false;
    private delayNum = 0;//每次变化的值包含负数
    private readonly totalTime = 1000;
    private readonly delayTime = 40;
    private newBattlePower:number = 0;
    constructor() {
        super();
        this.layer = UILEVEL.POP_5;
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/battle/lv.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/battle/hong.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/number/fight.atlas", type: Laya.Loader.ATLAS }
        ];
    }

    public initComp() {
        super.initComp();
        this.BattlePowerNumber.scale(0.8, 0.8);
        this.AddDynamicNumber.scale(1.3, 1.3);
        this.AddDynamicNumber.url = "res/atlas/battle/lv.atlas";
        this.CutDynamicNumber.scale(1.3,1.3);
        this.CutDynamicNumber.url = "res/atlas/battle/hong.atlas";
        this.BattlePowerNumber.url = "res/atlas/number/fight.atlas";
        this.visible = false;
        this.StartRoll();
    }

    public open(...args): void {
        super.open();
    }

    private TimerRoll()
    {
        var num = parseInt(this.BattlePowerNumber.text);
        num += this.delayNum;
        if(!this.isCut)
        {
            if(num > this.newBattlePower)
            {
                num =  this.newBattlePower;
            }
        }
        else
        {
            if(num < this.newBattlePower)
            {
                num =  this.newBattlePower;
            }
        }
        var numStr = num.toString();
        this.BattlePowerNumber.text = numStr;
        if(num == this.newBattlePower||numStr == "")
        {
            Laya.timer.clear(this,this.TimerRoll);
            this.EndRoll();
        }
    }

    private EndRoll()
    {
        Laya.timer.once(500,this, function()
        {
            if(GameUtils.BattlePowerList.length > 0)
            {
                this.StartRoll();
            }
            else
            {
                this.visible = false;
            }
        });
    }
    
    private StartRoll()
    {
        if(this.visible == true && GameUtils.BattlePowerList.length == 0) return;
        Laya.timer.clear(this,this.TimerRoll);

        if(GameUtils.BattlePowerList.length > 0)
        {
            this.LastBattlePower = GameUtils.BattlePowerList[0].last;
            this.newBattlePower = GameUtils.BattlePowerList[GameUtils.BattlePowerList.length - 1].new;
            GameUtils.BattlePowerList = [];
        }
        else
        {
            this.visible = false;
            return;
        }
        
        this.visible = true;
        var num = this.newBattlePower - this.LastBattlePower;
        if(num == 0)
        {
            this.visible = false;
            return;
        }
        this.isCut = num < 0?true:false;
        num = Math.abs(num);
        this.delayNum = Math.ceil(num/(this.totalTime/this.delayTime));
        if( this.isCut)
        this.delayNum = -this.delayNum;
        var str = this.isCut == true?"-":"+";
        if(this.isCut)
        {
            this.AddDynamicNumber.text = "";
            this.AddDynamicNumber.clear();
            this.CutDynamicNumber.text = str + num.toString();
        }
        else
        {
            this.CutDynamicNumber.text = "";
            this.CutDynamicNumber.clear();
            this.AddDynamicNumber.text = str + num.toString();
        }
        this.BattlePowerNumber.text = this.LastBattlePower.toString();
        Laya.timer.loop(this.delayTime,this,this.TimerRoll);
    }

    public update() {
        super.update();
        if(  this.visible == false)
        this.StartRoll();
    }

    public initEvent(): void {
        this.BattlePowerNumber.on(Laya.Event.CHANGE , this, this.BattlePowerChange);
    }

    public removeEvent(): void {
        this.BattlePowerNumber.off(Laya.Event.CHANGE , this, this.BattlePowerChange);
    }

    private BattlePowerChange()
    {
        // console.log("this.BattlePowerNumber.text=="+this.BattlePowerNumber.text);
        this.AddDynamicNumber.x = this.BattlePowerNumber.w*this.BattlePowerNumber.scaleX + this.BattlePowerNumber.x;
        this.CutDynamicNumber.x = this.BattlePowerNumber.w*this.BattlePowerNumber.scaleX + this.BattlePowerNumber.x;
    }

    public close(): void {
        super.close();
    }
}