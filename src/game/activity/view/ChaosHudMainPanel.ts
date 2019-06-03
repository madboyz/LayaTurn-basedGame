import { SChaosBattleData } from "../data/SChaosBattleData";
import { HtmlUtils } from "../../utils/HtmlUtils";
import { TimerUtil } from "../../utils/TimerUtil";
import { GameUtils } from "../../utils/GameUtils";
import { ConstVo } from "../../../db/sheet/vo/ConstVo";
import { SRoleData } from "../../../net/data/SRoleData";
import { Alert } from "../../ui/compent/Alert";


export class ChaosHudMainPanel extends ui.main.ChaosHudMainPanelUI {
    private BallImg = [];
    constructor() {
        super();
        this.layer = UILEVEL.POP_1;
        this.sameLevelEliminate = false;
        this.isFullScreen = true;
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
            // { url: "res/atlas/chat.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/battle.atlas", type: Laya.Loader.ATLAS},
        ];
    }

    public initComp() {
        super.initComp();
        HtmlUtils.setHtml(this.InfoText.style,3,20,"left","middle");
        HtmlUtils.setHtml(this.TimeText.style,3,20,"left","middle");
        for (let i = 0; i < 7; i++) {
            const img:Laya.Image = this.Balls._childs[i];
            img.gray = true;
            this.BallImg.push(img);
        }
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }

    public open(...args): void {
        super.open();
        this.AutoBtn.selected = false;
        this.onAutoFight();
        this.hudTipsDisplay();
    }

    public hudTipsDisplay()
    {
        var hudLvInfo = "";
        var vos:Array<any> = ConstVo.get("GAME_MELEE_ENTER_CONFIG").val
        for (let index = 0; index < vos.length; index++) {
            var element = vos[index];
            var minLv = element[0];
            var maxLv = element[1];
            {
                if(SRoleData.instance.info.Lv >= minLv && SRoleData.instance.info.Lv <= maxLv)
                {
                    hudLvInfo = `${minLv}-${maxLv}级`;
                }
                else
                {
                    if(index == vos.length)
                    {
                        hudLvInfo = `${minLv}-${maxLv}级`;
                    }
                }
            }
        }
        hudLvInfo =  HtmlUtils.addColor(hudLvInfo , "#ffffff",16);
        var infoStr = HtmlUtils.addColor("奖励、银币、装备、材料" , "#d4be7b",16);
        this.InfoText.innerHTML = hudLvInfo + infoStr;
    }

    public initEvent(): void {
        this.AoiPlayerBtn.on(Laya.Event.CLICK, this, this.onClickAoiPlayerBtn);
        this.AutoBtn.on(Laya.Event.CHANGE, this, this.onAutoFight);
        this.ExitBtn.on(Laya.Event.CLICK, this, this.onExitBtn);
    }

    public removeEvent(): void {
        this.AoiPlayerBtn.off(Laya.Event.CLICK, this, this.onClickAoiPlayerBtn);
        this.AutoBtn.off(Laya.Event.CHANGE, this, this.onAutoFight);
        this.ExitBtn.off(Laya.Event.CLICK, this, this.onExitBtn);
    }

    public udpateBallNum(num:number)
    {
        for (let i = 0; i < 7; i++) {
            const img:Laya.Image = this.BallImg[i];
            if(i<num)
            {
                img.gray = false;
            }
            else
            {
                img.gray = true;
            }
        }
    }

    public onUpdateTimeDisplay()
    {
        var deltTime = SChaosBattleData.instance.EndTime - GameUtils.TimeStamp;
        var mm = TimerUtil.mm(deltTime);
        var ss = TimerUtil.ss(deltTime);
        var str = `活动剩余时间${mm}:${ss}`;
        this.TimeText.innerHTML = HtmlUtils.addColor(str , "#00b007",18);
        
    }

    private onClickAoiPlayerBtn()
    {
        UIManager.instance.openUI(UIID.CHAO_PLAYER_LIST);
    }

    /**
     * 这里指的是否要自动打玩家
     */
    private onAutoFight() {
        if(SChaosBattleData.instance.AutoPKPlayer != this.AutoBtn.selected)
        {
            SChaosBattleData.instance.AutoPKPlayer = this.AutoBtn.selected;
            var status = SChaosBattleData.instance.AutoPKPlayer == false?0:1;
            SChaosBattleData.instance.protocol.send28007(status);
        }
        
        //GameConfig.GAME_IS_OPEN_AUTO_ROLE = this.AutoBtn.selected;
    }

    private onExitBtn()
    {
        Alert.show("退出后无法再次进入，您将失去龙珠结算奖励！是否现在就退出？",this,()=>{
            SChaosBattleData.instance.protocol.send28003();
        },null,null,null,true);
        

    }



    public close(): void {
        super.close();
    }
}