import { S57200, S57202, S57201, S57212, S57208, S57209, S57213 } from "../../../net/pt/pt_57";
import { DataManager } from "../../../message/manager/DataManager";
import { SCopyData } from "../../../net/data/SCopyData";
import { SceneManager, SceneType } from "../../battle/scene/SceneManager";
import { GridSceneProtocol } from "../protocol/GridSceneProtocol";
import { SGameData, SGameEvent } from "../../../net/data/SGameData";
import { ItemData } from "../../ui/compent/data/ItemData";
import { HtmlUtils } from "../../utils/HtmlUtils";
import { MsgManager } from "../../ui/manager/MsgManager";


export class SGridSceneData extends Laya.EventDispatcher {
    private static mInstance: SGridSceneData;
    public Infos = new Laya.Dictionary();
    public Scores = new Laya.Dictionary();
    public StayNo:number = 1;
    public RollState:number = 1;//是否可以摇骰子
    public protocol:GridSceneProtocol = new GridSceneProtocol();
    /**
     * 总分数
     */
    public get getTotalScore():number
    {
        var score = 0;
        for (let i = 0; i < this.Scores.values.length; i++) {
            var _score = this.Scores.values[i];
            score += _score;
        }
        return score;
    }
    /**
     * 格子总数
     */
    public get getTotalGirdNum():number
    {
        return this.Infos.keys.length;
    }

    public static get instance(): SGridSceneData {
        return this.mInstance || (this.mInstance = new SGridSceneData);
    }
    constructor() {
        super();
    }

    public unRegisterEvent(): void {
        this.Infos.clear();
        this.StayNo = 0;
        this.Scores.clear();
        DataManager.cancel(PROTOCOL.E57200, this, this.onS57200);
        DataManager.cancel(PROTOCOL.E57201, this, this.onS57201);
        DataManager.cancel(PROTOCOL.E57202, this, this.onS57202);
        DataManager.cancel(PROTOCOL.E57208, this, this.onS57208);
        DataManager.cancel(PROTOCOL.E57209, this, this.onS57209);
        DataManager.cancel(PROTOCOL.E57212, this, this.onS57212);
        DataManager.cancel(PROTOCOL.E57213, this, this.onS57213);
        SGameData.instance.off(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);
    }

    public registerEvent(): void {
        DataManager.listen(PROTOCOL.E57200, this, this.onS57200);
        DataManager.listen(PROTOCOL.E57201, this, this.onS57201);
        DataManager.listen(PROTOCOL.E57202, this, this.onS57202);
        DataManager.listen(PROTOCOL.E57212, this, this.onS57212);
        DataManager.listen(PROTOCOL.E57208, this, this.onS57208);
        DataManager.listen(PROTOCOL.E57209, this, this.onS57209);
        DataManager.listen(PROTOCOL.E57213, this, this.onS57213);        
        SGameData.instance.on(SGameEvent.GAME_FIGHTREPORTSTATE, this, this.onUpdateFightState);

    }

    private result: S57213;
    private onUpdateFightState(): void {
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            if (this.result) {
                var itemdataList = new Array<ItemData>();
                for (let i = 0; i < this.result.item_1.length; i++) {
                    const item = this.result.item_1[i];
                    var goods: ItemData = new ItemData(item.GoodsNo);
                    goods.Count = item.GoodsNum;
                    goods.serverInfo.Quality = item.Quality;
                    goods.serverInfo.BindState = item.BindState;
                    if (goods.clientInfo.no != 99 && goods.clientInfo.type != GoodsType.AUTO_GOODS) {
                        //策划让把99ID的道具，临时屏蔽掉
                        itemdataList.push(goods);
                    }
                }
                var str = HtmlUtils.addColor("当前得分:","#92592d",20) + HtmlUtils.addColor(this.result.Score.toString(),"#fe7800",20);
                UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [0, itemdataList, true, null, str]);
                this.result = null;
            }
        }
    }

    public CheckCreateGridScene()
    {
        if(SCopyData.instance.curCopyInfo&&SCopyData.instance.curCopyInfo.isGrid)
        {
            this.Scores.clear();
            SceneManager.instance.EnterSpecialScene(SceneType.GridScene);
        }
    }

    private onS57213(data:S57213)
    {
        if (SGameData.instance.PLAYFIGHTREPORT == false) {
            var itemdataList = new Array<ItemData>();
            for (let i = 0; i < data.item_1.length; i++) {
                const item = data.item_1[i];
                var goods: ItemData = new ItemData(item.GoodsNo);
                goods.Count = item.GoodsNum;
                goods.serverInfo.Quality = item.Quality;
                goods.serverInfo.BindState = item.BindState;
                if (goods.clientInfo.no != 99 && goods.clientInfo.type != GoodsType.AUTO_GOODS) {
                    //策划让把99ID的道具，临时屏蔽掉
                    itemdataList.push(goods);
                }
            }
            var str = HtmlUtils.addColor("当前得分:","#92592d",20) + HtmlUtils.addColor(data.Score.toString(),"#fe7800",20);
            UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [0, itemdataList, true, null, str]);
        }
        else {
            this.result = data;
        }
    }

    private onS57209(data:S57209)
    {
        this.RollState = data.State;
        this.event(SGridSceneEvent.GRIRD_ROLL_STATE);
    }

    private onS57208(data:S57208)
    {
        this.StayNo = data.GridNo;
        this.RollState = 1;
        this.event(SGridSceneEvent.GRIRD_ROLL_STATE);
        SceneManager.instance.EnterSpecialScene(SceneType.GridScene);
        this.event(SGridSceneEvent.GRIRD_NO_UPDATE);
    }
    
    private onS57212(data:S57212)
    {
        if(this.StayNo != 0)
        {
            var length = data.item_1.length;
            var score = data.item_1[length-1].Score;
            MsgManager.instance.showRollTipsMsg(`获得积分:${score}`);
        }
        for (let i = 0; i < data.item_1.length; i++) {
            this.Scores.set(data.item_1[i].GridNo , data.item_1[i].Score);
        }
        this.event(SGridSceneEvent.GRIRD_SCORE_UPDATE);
    }

    private onS57200(data:S57200)
    {
        this.Scores.clear();
        for (let i = 0; i < data.item_1.length; i++) {
            const element = data.item_1[i];
            this.Infos.set(element.GridNo , element.EventNo);
        }
        this.Infos.set(0,0);
    }
    
    private onS57201(data:S57201)
    {
        this.RollState = 0;
        this.event(SGridSceneEvent.GRIRD_ROLL_STATE);
        this.event(SGridSceneEvent.GRIRD_ROLL_UPDATE ,data.Point);
    }

    private onS57202(data:S57202)
    {
        UIManager.instance.openUI(UIID.SYS_ACTIVITY_AQ_PANEL,
            ["副本答题", data.No, this.protocol, this.protocol.send57203]
        );
        this.event(SGridSceneEvent.GRID_QUESTION ,data);
    }
}

export enum SGridSceneEvent {
    GRIRD_NO_UPDATE = "grid_no_update",//格子步数更新
    GRIRD_ROLL_UPDATE = "grid_roll_update",//骰子更新
    GRIRD_SCORE_UPDATE = "grid_score_update",//分数更新
    GRID_QUESTION = "grid_question",//副本答题更新
    GRIRD_ROLL_STATE = "grid_roll_state",//可以摇色子更新
}