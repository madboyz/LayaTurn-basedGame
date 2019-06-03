import { S12002_1 } from "../../../net/pt/pt_12";
import { SAoiData } from "../../aoi/SAoiData";
import { CommonControl } from "../../common/control/CommonControl";
import { SChaosBattleData } from "../data/SChaosBattleData";
import { SGameData } from "../../../net/data/SGameData";
import { MsgManager } from "../../ui/manager/MsgManager";
import { MsgRollTipsType } from "../../ui/compent/MsgRollTipsType";

export class ChaoPlayerPanel extends ui.main.ChaoPlayerPanelUI {
    private CurrentPage = 1;
    private TotalPage = 1;
    private startIndex = 0;
    private endIndex = 0;
    private 
    constructor() {
        super();
        this.sameLevelEliminate = false;
        this.mResouce = [
            { url: "res/atlas/main.atlas", type: Laya.Loader.ATLAS },
            
            { url: "res/atlas/battle.atlas", type: Laya.Loader.ATLAS},
        ];
    }

    private itemUIs = [];
    public initComp() {
        super.initComp();
        for (let i = 0; i < 6; i++) {
           var item:ui.main.ChaosPlayerItemUI = new ui.main.ChaosPlayerItemUI();
           this.ItemList.addChild(item);
           this.itemUIs.push(item);
        }
    }

    public update() {
        //TODO:第二次打开面板
        super.update();
    }

    public open(...args): void {
        this.initWindow(true,true,"玩家列表",550,750,27);
        super.open();
        this.CurrentPage = 1;
        this.TotalPage = Math.ceil(SAoiData.instance.AoiPlayers.values.length/6);
        this.updateList();
    }

    private updateList()
    {
        this.PageText.text = `第${this.CurrentPage}页`;
        var _length = SAoiData.instance.AoiPlayers.values.length;
        var cutNum = _length - this.CurrentPage*6;
        this.startIndex = (this.CurrentPage-1)*6;
        if(cutNum < 0)
        {
            this.endIndex =  _length;
        }
        else
        {
            this.endIndex =  this.startIndex + 6;
        }
        var playerIds = [];
        for (let i = 0; i < this.itemUIs.length; i++) {
            const item:ui.main.ChaosPlayerItemUI = this.itemUIs[i];
            var index = i+this.startIndex;
            
            var aoiData: S12002_1 = SAoiData.instance.AoiPlayers.values[index];
            if(!aoiData)
            {
                item.visible = false;
                continue;
            }
            item.visible = true;
            playerIds.push(aoiData.Id);
            this.UpdateItem(item,aoiData);
        }
        if(playerIds.length > 0)
        SChaosBattleData.instance.protocol.send28004(playerIds);
    }

    public updateBallNum()
    {
        for (let i = 0; i < this.itemUIs.length; i++) {
            const item:ui.main.ChaosPlayerItemUI = this.itemUIs[i];
            var index = i+this.startIndex;
            var aoiData: S12002_1 = SAoiData.instance.AoiPlayers.values[index];
            if(!aoiData)
            {
                continue;
            }
            this.UpdateItemBallNum(item,aoiData);
        }
    }

    private UpdateItemBallNum(item:ui.main.ChaosPlayerItemUI ,  aoiData: S12002_1)
    {
        var ballNum = SChaosBattleData.instance.PlayerBall.get(aoiData.Id);
        if(ballNum)
        {
            for (let i = 0; i < 7; i++) {
                const img:Laya.Image = item.Balls._childs[i];
                if(i>=ballNum)
                {
                    img.gray = true;
                }
                else
                {
                    img.gray = false;
                }

            }
        }
    }

    private UpdateItem(item:ui.main.ChaosPlayerItemUI ,  aoiData: S12002_1)
    {
        for (let i = 0; i < 7; i++) {
            const img:Laya.Image = item.Balls._childs[i];
            img.gray = true;
        }
        item.NameText.text = aoiData.PlayerName;
        // item.LvText.text = "Lv."+aoiData.Lv;
        // item.BattlerText.text = "";
        item.GotoBtn.off(Laya.Event.CLICK , this  ,this.onClickGotoBtn);
        item.GotoBtn.on(Laya.Event.CLICK , this  ,this.onClickGotoBtn , [aoiData]);
    }

    private onClickGotoBtn(aoiData: S12002_1)
    {
        if(SGameData.instance.PLAYFIGHTREPORT)
        {

            return;
        }
        CommonControl.instance.SendPk(aoiData.Id , PKType.Force);
    }

    public initEvent(): void {
        this.LeftPageBtn.on(Laya.Event.CLICK, this, this.onClickLeftBtn);
        this.RightPageBtn.on(Laya.Event.CLICK, this, this.onClicRightBtn);
    }

    public removeEvent(): void {
        this.LeftPageBtn.off(Laya.Event.CLICK, this, this.onClickLeftBtn);
        this.RightPageBtn.off(Laya.Event.CLICK, this, this.onClicRightBtn);
    }

    private onClickLeftBtn(): void {
        if(this.CurrentPage == 1)
        {
            return;
        }
        this.CurrentPage --;
        this.updateList();
    }

    private onClicRightBtn(): void {
        if(this.CurrentPage >= this.TotalPage)
        {
            return;
        }
        this.CurrentPage ++;
        this.updateList();
    }

    public close(): void {
        super.close();
    }
}