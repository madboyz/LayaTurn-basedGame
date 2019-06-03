import { ProgressBar } from "../../../compent/ProgressBar";
import { SNewBattleData, SNewBattleEvent } from "../../../../../net/data/SNewBattleData";
import { GameUtils } from "../../../../utils/GameUtils";


export class PetCopyStarProgress extends ui.main.PetCopyStarProgressUI {
    private bar:ProgressBar;
    constructor() {
        super();
        this.width = Laya.stage.width;
        this.initComp();
    }

    private initComp():void
    {
        //SNewBattleData.instance.on(SNewBattleEvent.NEW_ROUND_START ,this, this.updateBar);
        this.star_1.url = "res/atlas/number/fight.atlas";
        this.star_2.url = "res/atlas/number/fight.atlas";
        this.star_3.url = "res/atlas/number/fight.atlas";
        this.star_1.text = "4";
        this.star_2.text = "7";
        this.star_3.text = "10";
        this.star_1.scaleX = this.star_1.scaleY = this.star_2.scaleX = this.star_2.scaleY = this.star_3.scaleX = this.star_3.scaleY = 0.4;
        this.initBar();
    }

    private initBar():void
    {
        this.bar = new ProgressBar();
        this.bar.setGrid("8,16,12,14","7,10,4,9");
        this.bar.setBg(ResUtils.getCompUIUrl("barbg"),ResUtils.getCompUIUrl("bar"),238,20,5,4,5,5);
        this.bar.setLabel(0,20,"#ffffff");
        this.bar.x = 64;
        this.bar.y = 74;
        this.box.addChildAt(this.bar,2);
        this.updateBar(1,10);
    }

    public restart():void{
        if(this.bar){
            this.updateBar(1,10);
        }
    }

    public updateBar(value:number,max:number):void
    {
        if(this.visible)
        this.bar.setValue(max - value,max);
    }

    public removeSelf():any
    {
        //SNewBattleData.instance.off(SNewBattleEvent.NEW_ROUND_START ,this, this.updateBar);
        this.bar.removeSelf();
        this.bar = null;
        super.removeSelf();
    }
}