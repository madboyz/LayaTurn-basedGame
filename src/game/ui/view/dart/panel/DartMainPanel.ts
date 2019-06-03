import { PlayerView } from "../../../../battle/role/PlayerView";
import { SDartData } from "../../../../dart/data/SDartData";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { RoleLayer } from "../../../../battle/scene/layer/RoleLayer";
import { NameLayer } from "../../../../battle/scene/layer/NameLayer";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { Debug } from "../../../../../debug/Debug";
import { RoleTouch } from "../../../../battle/scene/touch/RoleTouch";
import { RewardList } from "../../../compent/RewardList";
import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";
import { AwardUtil } from "../../../../award/AwardUtil";
import { GameUtils } from "../../../../utils/GameUtils";
import { HtmlUtils } from "../../../../utils/HtmlUtils";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { MsgManager } from "../../../manager/MsgManager";
import { BubbleLayer } from "../../../../battle/scene/layer/BubbleLayer";

export class DartMainPanel extends ui.main.DartMainPanelUI {

    private playerViews = new Laya.Dictionary();
    private ride = [8, 7, 10, 9, 11];
    private posY = [112, 267, 415, 547];
    private readonly StartX = 0;
    private readonly EndX = 503;
    private readonly MaxRoleCount = 10;
    private readonly colors = ["#ffffff", "#04a30a", "#00fff0", "#f40df4", "#e29301"];
    private playerIds = [];
    private roleLayer: RoleLayer;
    private nameLayer: BubbleLayer;
    private lastIndexY = -1;
    private rewarldList: RewardList;
    private rewardLevel: Laya.Dictionary = new Laya.Dictionary();//常量押镖奖励
    private dartTime = 300;
    private maxTransCount = 0;
    private maxHiJackCount = 0;
    constructor() {
        super();
        this.layer = UILEVEL.POP_2;
        this.mResouce = [

        ];
    }


    public initComp() {
        super.initComp();
        this.roleLayer = new RoleLayer();
        this.Mask.addChild(this.roleLayer);

        this.nameLayer = new BubbleLayer();
        this.Mask.addChild(this.nameLayer);

        this.rewarldList = Laya.Pool.getItemByClass("rewarldList", RewardList);
        this.rewarldList.showNameNum = false;
        this.rewarldList.rowCount = 4;
        this.rewarldList.maxNum = 4;
        this.rewarldList.itemStyle = 55;
        this.rewarldList.x = 30;
        this.rewarldList.y = 47;
        this.TransBox.addChild(this.rewarldList);
        var vos: Array<any> = ConstVo.get("ESCORT_REWARDS").val;
        for (let index = 0; index < vos.length; index++) {
            var element = vos[index];
            this.rewardLevel.set(element[0], element[1]);
        }
        this.dartTime = parseInt(ConstVo.get("ESCORT_TRANSPORT_TIME").val);
        HtmlUtils.setHtml(this.TransText.style, 3, 20, "left", "middle");
        this.TransBox.visible = false;
        this.startTransBtn.visible = true;
        this.TransText.innerHTML = "";
        this.maxTransCount = ConstVo.get("ESCORT_TRANSPORT_MAX").val;
        this.maxHiJackCount = ConstVo.get("ESCORT_ROB_MAX").val;
        //this.roleLayer.x = this.nameLayer.x = this.StartX;
    }

    public open(...args): void {
        this.initWindow(true, true, "仙界押镖", 550, 750, 50);
        super.open();
        this.playerViews.clear();
        this.playerIds = [];
    }

    public initEvent(): void {
        this.dartLogBtn.on(Laya.Event.CLICK, this, this.onClickLogBtn);
        this.startTransBtn.on(Laya.Event.CLICK, this, this.onClickStartBtn);
        this.GetBtn.on(Laya.Event.CLICK, this, this.onClickGetItem);
        this.Mask.on(Laya.Event.CLICK, this, this.onClickMask);
    }

    public removeEvent(): void {
        this.dartLogBtn.off(Laya.Event.CLICK, this, this.onClickLogBtn);
        this.startTransBtn.off(Laya.Event.CLICK, this, this.onClickStartBtn);
        this.GetBtn.off(Laya.Event.CLICK, this, this.onClickGetItem);
        this.Mask.off(Laya.Event.CLICK, this, this.onClickMask);
    }

    public UpdateDarts(): void {

        this.ClearViews();
        this.playerIds = SDartData.instance.AllInfos.keys.slice();
        this.RandRole();
    }

    public UpMyDart(): void {
        var cutCount = this.maxTransCount - SDartData.instance.MyDartInfo.cur_transp;
        if (cutCount < 0)
            cutCount = 0;
        this.currentTransTxt.text = `剩余押镖次数:${cutCount}`;
        this.startTransBtn.disabled = cutCount == 0 ? true : false;
        cutCount = this.maxHiJackCount - SDartData.instance.MyDartInfo.cur_hijack;
        if (cutCount < 0)
            cutCount = 0;
        this.currentHiJackTxt.text = `剩余劫镖次数:${cutCount}`;
        if (SDartData.instance.MyDartInfo.state == 0) {
            this.TransBox.visible = false;
            this.startTransBtn.visible = true;
            this.TransText.innerHTML = "";
        }
        else {
            this.TransBox.visible = true;
            this.startTransBtn.visible = false;
            var rewardId = this.rewardLevel.get(SDartData.instance.MyDartInfo.cur_trunk);
            var beHiJack = SDartData.instance.MyDartInfo.be_hijack;
            if (!rewardId) return;
            var goodsList = AwardUtil.GetNormalGoodsList(rewardId);
            var finalList = [];
            for (let i = 0; i < goodsList.length; i++) {
                const item = goodsList[i];
                /**
                 * 2019/02/23 孝鹏要求如果获得数量小于=0就不显示
                 */
                var num = 0;
                if (beHiJack > 0) {
                    var count = item.Count;
                    for (let j = 1; j <= beHiJack; j++) {
                        num += SDartData.instance.GetReawardNum(count, j);
                    }
                }
                num = item.Count - num;
                if (num > 0) {
                    item.Count = num;
                    finalList.push(item);
                }
            }
            this.rewarldList.updateRewards(finalList);
        }

    }

    public DartIngTime() {
        if (SDartData.instance.MyDartInfo.state == 0) {
            this.TransText.innerHTML = "";
            this.GetBtn.visible = false;
            return;
        }
        var nextTime = SDartData.instance.MyDartInfo.start_time + this.dartTime;
        var nowTime = GameUtils.TimeStamp;
        if (nowTime > nextTime) {

            this.TransText.innerHTML = HtmlUtils.addColor("押镖已完成", "#8e5213", 20);
            this.GetBtn.visible = true;
        }
        else {
            this.GetBtn.visible = false;
            var countTime = nextTime - nowTime;
            var hh = TimerUtil.hh(countTime);
            var mm = TimerUtil.mm(countTime);
            var ss = TimerUtil.ss(countTime);
            this.TransText.innerHTML = HtmlUtils.addColor("押镖中(", "#8e5213", 20) + HtmlUtils.addColor(`${hh}:${mm}:${ss}后到达`, "#ff0000", 20) +
                HtmlUtils.addColor(")", "#8e5213", 20);
        }
    }

    public UpdateRole() {
        //if(this.playerIds.length == 0)
        //return;
        for (let i = 0; i < this.playerViews.keys.length; i++) {
            const key = this.playerViews.keys[i];
            const player = this.playerViews.get(key);
            if (!player) continue;
            if (player.info != null) {
                var playerInfo: AoiInfo = player.info;
                player.x = player.px;
                player.y = player.py;
                var Info = playerInfo.getInfo(RoleType.OBJ_PLAYER);
                var serverId = Math.floor(Info.Id / 100000000000) % 1000;
                var dartInfo = SDartData.instance.AllInfos.get(key);
                var color = "#04a30a";
                if (dartInfo) {
                    color = this.colors[dartInfo.truck_lv - 1];
                }
                this.nameLayer.showBubble(Info.Id, `${Info.PlayerName}S${serverId}`, player.x, player.y + 150, color, false);
                this.nameLayer.updatePos(Info.Id, player.x, player.y + 150);
            }
        }

        this.roleLayer.update();
    }

    private onClickGetItem() {
        SDartData.instance.protocol.send42007();
    }

    //打开ui押镖
    private onClickStartBtn() {
        var cutCount = this.maxTransCount - SDartData.instance.MyDartInfo.cur_transp;
        if (cutCount < 0) {
            MsgManager.instance.showRollTipsMsg("当前押镖次数不足！");
            return;
        }
        UIManager.instance.openUI(UIID.DART_INFO_PANEl, [false]);
    }

    //打开ui记录
    private onClickLogBtn() {
        this.dartLogBtn.refreshRed(false);
        UIManager.instance.openUI(UIID.DART_LOG_PANEL);
    }

    public RandRole() {
        if (this.playerIds.length == 0 || this.playerViews.keys.length >= this.MaxRoleCount) return;
        this.playerIds = GMath.Shuffle(this.playerIds);
        //var indexId = GMath.randRange(0,this.playerIds.length-1);
        var id = this.playerIds.shift();
        var info = SDartData.instance.AllInfos.get(id);
        if (!info) return;
        var data = new S12002_1();
        data.Id = id;
        data.Faction = GMath.randRange(1, 2);
        data.Sex = data.Faction;
        data.AerocraftNo = this.ride[info.truck_lv - 1];
        data.PlayerName = info.role_name;

        var player: PlayerView = Laya.Pool.getItemByClass("PlayerView", PlayerView);
        player.Speed = 0.5;

        player.off(CMD.MOVE_END, this, this.onMoveEnd);
        player.on(CMD.MOVE_END, this, this.onMoveEnd, [id]);
        //player.on(Laya.Event.CLICK,this,this.onClickPlayer,[id]);
        player.info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
        player.info.PlayerInfo = data;
        //player.scaleX = player.scaleY=0.8;
        player.IsAstar = false;
        player.x = player.px = this.StartX;
        var indexY = 0;
        indexY = GMath.randRange(0, 3);
        if (this.lastIndexY == -1)
            this.lastIndexY = indexY;
        else if (indexY == this.lastIndexY) {
            while (1) {
                indexY = GMath.randRange(0, 3);
                if (indexY != this.lastIndexY) {
                    this.lastIndexY = indexY;
                    break;
                }
            }
        }
        else
            this.lastIndexY = indexY;
        player.y = player.py = this.posY[indexY];
        player.isFly = true;
        player.updateMount(data.AerocraftNo);
        player.angle = -1;
        this.playerViews.set(data.Id, player);
        this.roleLayer.add(player);
        var path = [];
        path.push({ x: this.EndX, y: player.py });
        player.ptachTo(path);
    }

    private onClickMask() {
        for (let i = 0; i < this.playerViews.keys.length; i++) {
            const key = this.playerViews.keys[i];
            var player: PlayerView = this.playerViews.get(key);
            var mousePos: Laya.Point = player.getMousePoint();
            var size: Laya.Point = player.getBodyRealSize();
            var rect: Laya.Rectangle = new Laya.Rectangle(-size.x / 2, -size.y, size.x, size.y);
            if (!rect.contains(mousePos.x, mousePos.y)) {//没被击中了
                continue;
            }
            Debug.serverLog(`点击了key===${key}`);

            if (key == SRoleData.instance.roleId) {
                MsgManager.instance.showRollTipsMsg("大侠，这是您自己的镖车！");
                break;
            }

            var cutCount = this.maxHiJackCount - SDartData.instance.MyDartInfo.cur_hijack;
            if (cutCount <= 0) {
                MsgManager.instance.showRollTipsMsg("当前劫镖次数不足！");
                break;
            }
            if (player.info != null) {

                var playerInfo: AoiInfo = player.info;
                var Info = playerInfo.getInfo(RoleType.OBJ_PLAYER);
                SDartData.instance.protocol.send42004(Info.Id);
                //UIManager.instance.openUI(UIID.DART_INFO_PANEl, [true,Info.PlayerName,Info.Id]);
            }
            break;
            /**
             * 打开单个镖车详情
             */
            //SDartData.instance.protocol.send42004(key);
        }
    }

    private onMoveEnd(id: number) {
        var player: PlayerView = this.playerViews.get(id);
        if (!player) return;
        player.off(CMD.MOVE_END, this, this.onMoveEnd);
        this.roleLayer.remove(player);
        this.nameLayer.removeBubble(id);
        this.playerViews.remove(id);
        this.playerIds.push(id);
    }

    public update(): void {
    }

    private ClearViews(): void {
        for (let i = 0; i < this.playerViews.keys.length; i++) {
            const key = this.playerViews.keys[i];
            var player: PlayerView = this.playerViews.get(key);
            player.off(CMD.MOVE_END, this, this.onMoveEnd);
            this.roleLayer.remove(player);
            this.nameLayer.removeBubble(key);
        }
        this.playerViews.clear();
        this.playerIds = [];
    }

    public close(): void {
        super.close();
        this.ClearViews();
    }
}