import { TextLayer } from './TextLayer';
import { Delay } from './../../../../framework/utils/Delay';
export class TimeLayer extends Laya.Sprite {
    private txtLayer: TextLayer = new TextLayer();

    constructor() {
        super();
        this.loader();
    }


    private async loader() {
        await this.loaderBattler();
        !this.txtLayer.parent && this.addChild(this.txtLayer);
        this.txtLayer.scaleX = this.txtLayer.scaleY = 0.65;
    }

    private time: number = 0;

    private noti: Notice = new Notice();

    public showTime(time: number = 20) {

        this.time = time;
        this.visible = true;
        Laya.timer.clear(this ,this.CoolDown);
        Laya.timer.loop(1000 , this , this.CoolDown);
    }

    public CoolDown()
    {
        if (this.time == 0) {
            this.removeTime();
            this.noti.send(NotityData.create(Laya.Event.END));
            return;
        }
        this.txtLayer.showText(this.time + "", ResUtils.daojishi, "battle/daojishi/", 540 - this.stage.width / 2, 590);
        this.time--;
    }



    public removeTime(): void {
        this.txtLayer.clear();
        Laya.timer.clear(this ,this.CoolDown);
        this.time = 0;
        this.visible = false;
    }

    private loaderBattler() {
        return new Promise((resolve) => {
            Laya.loader.load("res/atlas/battle.atlas", Laya.Handler.create(this, () => {
                resolve();
            }), null, Laya.Loader.ATLAS);
        });

    }

}