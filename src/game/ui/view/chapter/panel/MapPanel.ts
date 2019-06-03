import { SChapterData, SChapterEvent } from "../../../../chapter/SChapterData";
import { CustomizeTexture } from "../../../../battle/scene/comp/CustomizeTexture";
import { SRoleData } from "../../../../../net/data/SRoleData";
import { Chapter_cfgVo } from "../../../../../db/sheet/vo/Chapter_cfgVo";
import { AwardUtil } from "../../../../award/AwardUtil";
export class MapImg extends Laya.Sprite {
    private info: any = {};
    public MyIcon: Laya.Image;
    public rewardBox: Laya.Image;
    private readonly mImages = [["humen_men.png", "humen_women.png"], ["god_men.png", "god_women.png"]];
    constructor() {
        super();
        this.width = 496;
        this.height = 694;
    }

    public set dataSource(data: any) {
        if (!data) return;
        this.info = data;
        //人物模型数据
        if (!this.info.pos) {
            if (this.MyIcon)
                this.MyIcon.visible = false;
        }
        else {
            if (this.MyIcon)
                this.MyIcon.visible = true;
            else {
                this.MyIcon = new Laya.Image();
                var name = "bg/" + this.mImages[SRoleData.instance.info.Faction - 1][SRoleData.instance.info.Sex - 1];
                this.MyIcon.skin = name;
                this.MyIcon.anchorX = this.MyIcon.anchorY = 0.5;
                this.MyIcon.scaleX = this.MyIcon.scaleY = 0.2;
                this.addChild(this.MyIcon);
            }

            this.MyIcon.x = this.info.pos.x + this.info.size.x / 2;
            this.MyIcon.y = this.info.pos.y + this.info.size.y * 0.5;
        }
        //宝箱数据
        if (!this.info.boxPos || !SChapterData.instance.chapter.IsCanGetAward) {
            if (this.rewardBox)
                this.rewardBox.visible = false;
        }
        else {
            if (this.rewardBox)
                this.rewardBox.visible = false;
            else {
                this.rewardBox = new Laya.Image();
                this.rewardBox.skin = "comp/img_reward_box.png";
                this.rewardBox.anchorX = this.rewardBox.anchorY = 0.5;
                this.rewardBox.scaleX = this.rewardBox.scaleY = 1;
                this.rewardBox.on(Laya.Event.CLICK, this, this.rewardBoxClick);
                this.addChild(this.rewardBox);
                this.rewardBox.visible = false;//开启的时候，删掉
            }

            this.rewardBox.x = this.info.boxPos.x - 40;//+this.info.size.x / 2;
            this.rewardBox.y = this.info.boxPos.y + this.info.size.y - 20;//*0.5;
        }
    }

    public get dataSource(): any {
        return this.info
    }

    private rewardBoxClick(): void {
        var awardId = SChapterData.instance.chapter.CurrentChapterAwardId;
        var goodsList = AwardUtil.GetNormalGoodsList(awardId);
        UIManager.instance.openUI(UIID.SYS_CHALLENGE_RESULT, [0, goodsList, false]);
    }

}

export class MapPanel extends ui.main.MapPanelUI {
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/chapter.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/guide.atlas", type: Laya.Loader.ATLAS }
        ];
    }

    private BtnPos = [];
    //新章节，属于第几章地图;
    private mapIndex: number;
    private oneIndex: number;

    public open(...args): void {
        this.initWindow(true, false, "地图", 550, 750, 45);
        super.open();
        this.refreshList();
        var pos = this.BtnPos[this.mapIndex][this.oneIndex];
        this.MapList.scrollBar.value = (pos.Pos.x + this.mapIndex * 496 - 250);
    }

    private refreshList(): void {
        //当前所在场景队医的位置
        var CurrentmapIndex: number;
        var CurrentoneIndex: number;
        //算出所在章节是第几章地图，第几个索引
        var vo = Chapter_cfgVo.getBySceneNo(SRoleData.instance.info.SceneNo);
        var checkChap = 0;
        for (let i = 0; i < this.BtnPos.length; i++) {
            var mainChap = this.BtnPos[i];
            for (let j = 0; j < mainChap.length; j++) {
                checkChap++;
                if (checkChap == SChapterData.instance.chapter.chapterId) {
                    this.mapIndex = i;
                    this.oneIndex = j;
                }

                if (checkChap == vo.no) {
                    CurrentmapIndex = i;
                    CurrentoneIndex = j;
                }
            }
        }
        var arr = [];
        var pos = this.BtnPos[this.mapIndex][this.oneIndex];
        for (let i = 0; i < 5; i++) {
            var info: any = {};
            info.index = i + 1;
            //人模型数据
            if (CurrentmapIndex == i) {
                var data = this.BtnPos[CurrentmapIndex][CurrentoneIndex];
                info.pos = data.Pos;
                info.size = data.Size;
            }
            //宝箱数据
            if (this.mapIndex == i && SChapterData.instance.chapter.IsCanGetAward) {
                var data = this.BtnPos[this.mapIndex][this.oneIndex];
                info.boxPos = data.Pos;
                info.size = data.Size;
            }
            arr.push(info);
        }
        this.MapList.array = arr;
    }

    public initComp() {
        super.initComp();
        this.initList();
        this.initBtns();
    }

    private initBtns(): void {
        var mapData = [];
        mapData.push({ Pos: new Laya.Point(181, 123), Size: new Laya.Point(187, 157) });
        mapData.push({ Pos: new Laya.Point(113, 262), Size: new Laya.Point(136, 116) });
        mapData.push({ Pos: new Laya.Point(80, 467), Size: new Laya.Point(136, 102) });
        mapData.push({ Pos: new Laya.Point(295, 488), Size: new Laya.Point(136, 138) });
        mapData.push({ Pos: new Laya.Point(305, 309), Size: new Laya.Point(170, 156) });
        this.BtnPos.push(mapData);

        mapData = [];
        mapData.push({ Pos: new Laya.Point(-21, 393), Size: new Laya.Point(136, 172) });
        mapData.push({ Pos: new Laya.Point(94, 215), Size: new Laya.Point(136, 134) });
        mapData.push({ Pos: new Laya.Point(226, 58), Size: new Laya.Point(150, 176) });
        mapData.push({ Pos: new Laya.Point(256, 523), Size: new Laya.Point(150, 120) });
        mapData.push({ Pos: new Laya.Point(392, 379), Size: new Laya.Point(188, 146) });
        this.BtnPos.push(mapData);

        mapData = [];
        mapData.push({ Pos: new Laya.Point(276, 454), Size: new Laya.Point(148, 136) });
        mapData.push({ Pos: new Laya.Point(166, 318), Size: new Laya.Point(148, 136) });
        mapData.push({ Pos: new Laya.Point(28, 224), Size: new Laya.Point(148, 92) });
        mapData.push({ Pos: new Laya.Point(248, 28), Size: new Laya.Point(170, 184) });
        mapData.push({ Pos: new Laya.Point(364, 262), Size: new Laya.Point(144, 78) });
        this.BtnPos.push(mapData);

        mapData = [];
        mapData.push({ Pos: new Laya.Point(-12, 339), Size: new Laya.Point(144, 148) });
        mapData.push({ Pos: new Laya.Point(88, 521), Size: new Laya.Point(224, 106) });
        mapData.push({ Pos: new Laya.Point(331, 357), Size: new Laya.Point(146, 166) });
        mapData.push({ Pos: new Laya.Point(159, 31), Size: new Laya.Point(154, 214) });
        this.BtnPos.push(mapData);

        mapData = [];
        mapData.push({ Pos: new Laya.Point(44, 15), Size: new Laya.Point(216, 168) });
        mapData.push({ Pos: new Laya.Point(290, 129), Size: new Laya.Point(154, 126) });
        mapData.push({ Pos: new Laya.Point(202, 291), Size: new Laya.Point(266, 132) });
        mapData.push({ Pos: new Laya.Point(216, 493), Size: new Laya.Point(214, 116) });
        this.BtnPos.push(mapData);
    }

    private initList(): void {
        this.MapList.itemRender = MapImg;
        this.MapList.hScrollBarSkin = "";
        this.MapList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.MapList.scrollBar.elasticDistance = 0;//设置橡皮筋极限距离。
    }

    private async LoadMap(spr: Laya.Sprite, index: number) {
        var url: string = `art/uiAnim/chap_map_${index + 1}.jpg`;
        var uuid = (UIID.SYS_CHAPTER_MAP * 1000) + index;
        var customText = await CustomizeTexture.asyncGetTextureByUrl(url, uuid, spr.x, spr.y);
        if (!customText || (customText && !customText.texture)) return;
        spr.texture = customText.texture;
        customText.dispose();
    }

    private onClickMapSpr(e: Event, index: number) {
        if (e.type == Laya.Event.CLICK) {
            var finImg: MapImg = null;
            for (let i = 0; i < this.MapList.cells.length; i++) {
                var cell: MapImg = this.MapList.cells[i];
                if (cell.dataSource.index == (index + 1)) {
                    finImg = cell;
                    break;
                }
            }
            if (finImg == null)
                return;
            var startIndex = 0;
            for (let i = 0; i < this.BtnPos.length; i++) {
                if (index == i) {
                    break;
                }
                const btnDatas = this.BtnPos[i];
                startIndex += btnDatas.length;
            }

            var mousePos: Laya.Point = finImg.getMousePoint();
            var btnDatas = this.BtnPos[index];
            for (let i = 0; i < btnDatas.length; i++) {
                const mapData = btnDatas[i];
                var rect: Laya.Rectangle = new Laya.Rectangle(mapData.Pos.x, mapData.Pos.y, mapData.Size.x, mapData.Size.y);
                if (rect.contains(mousePos.x, mousePos.y)) {//没被击中了
                    var key = startIndex + 1;
                    this.OnClickBtn(key);
                }
                startIndex++;
            }
        }
    }

    private onListRender(cell: MapImg, index: number) {
        this.LoadMap(cell, index);
        //第一个参数为打开是否需要引导
        var needGuide = SChapterData.instance.showNewChapter;
        var chapterData = Chapter_cfgVo.get(SChapterData.instance.chapter.chapterId);
        if (index == this.mapIndex && needGuide && SRoleData.instance.info.SceneNo != chapterData.scene_no) {
            this.showGuide(cell, index);
        } else if (this.ArrowImg && this.ArrowImg.parent == cell) {
            Laya.Tween.clearAll(this.ArrowImg);
            Laya.Tween.clearAll(this.MaskImg);
            this.ArrowImg && this.ArrowImg.removeSelf();
            this.ArrowImg = null;
            this.MaskImg && this.MaskImg.removeSelf();
            this.MaskImg = null;
        }
    }

    public update(): void {
    }

    public initEvent(): void {
        this.MapList.renderHandler = new Laya.Handler(this, this.onListRender);
        this.MapList.mouseHandler = new Laya.Handler(this, this.onClickMapSpr);
        SChapterData.instance.on(SChapterEvent.CHAPTER_UPDATE, this, this.refreshList);
        SChapterData.instance.on(SChapterEvent.CHAPTER_NEW, this, this.refreshList);
        
        this.close_Btn.on(Laya.Event.CLICK, this, this.close);
        this.back_Btn.on(Laya.Event.CLICK, this, this.close);
    }

    public removeEvent(): void {
        this.MapList.renderHandler.clear();
        this.MapList.mouseHandler.clear();
        SChapterData.instance.off(SChapterEvent.CHAPTER_UPDATE, this, this.refreshList);
        SChapterData.instance.off(SChapterEvent.CHAPTER_NEW, this, this.refreshList);
        
        this.close_Btn.off(Laya.Event.CLICK, this, this.close);
        this.back_Btn.off(Laya.Event.CLICK, this, this.close);
    }

    private OnClickBtn(key: number) {
        //if(key < SChapterData.instance.chapter.chapterId)
        //{
        //    return;
        //}
        UIManager.instance.openUI(UIID.SYS_CHAPTER_SELECT_MAP, [key]);
    }

    //下面为引导箭头相关的内容
    private MaskImg: Laya.Image;
    private ArrowImg: Laya.Image;
    private showGuide(cell: MapImg, index: number): void {
        if (!this.MaskImg) {
            this.MaskImg = new Laya.Image();
            this.MaskImg.skin = "guide/img_effect.png";
            this.MaskImg.width = this.MaskImg.height = 208;
            this.MaskImg.anchorX = this.MaskImg.anchorY = 0.5;
            cell.addChild(this.MaskImg);
        }
        if (!this.ArrowImg) {
            this.ArrowImg = new Laya.Image();
            this.ArrowImg.skin = "guide/img_btn.png";
            cell.addChild(this.ArrowImg)
        }
        var pos = this.BtnPos[this.mapIndex][this.oneIndex];
        this.MaskImg.x = this.ArrowImg.x = pos.Pos.x + pos.Size.x / 2;
        this.MaskImg.y = this.ArrowImg.y = pos.Pos.y + pos.Size.y / 2;
        Laya.Tween.to(this.MaskImg, { scaleX: 1.1, scaleY: 1.1 }, 1000, Laya.Ease.linearInOut, Laya.Handler.create(this, this.onMaskTween1));
        Laya.Tween.to(this.ArrowImg, { scaleX: 0.7, scaleY: 0.7 }, 300, Laya.Ease.linearInOut, Laya.Handler.create(this, this.onArrowTween1));
    }
    private onArrowTween1(): void {
        Laya.Tween.clearAll(this.ArrowImg);
        // this.ArrowImg.scaleX = this.ArrowImg.scaleY = 1;
        Laya.Tween.to(this.ArrowImg, { scaleX: 0.7, scaleY: 0.7 }, 300, Laya.Ease.linearInOut, Laya.Handler.create(this, this.onArrowTween2));
    }
    private onArrowTween2(): void {
        Laya.Tween.clearAll(this.ArrowImg);
        // this.ArrowImg.scaleX = this.ArrowImg.scaleY = 0.7;
        Laya.Tween.to(this.ArrowImg, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.linearInOut, Laya.Handler.create(this, this.onArrowTween1));
    }
    private onMaskTween1(): void {
        Laya.Tween.clearAll(this.MaskImg);
        Laya.Tween.to(this.MaskImg, { scaleX: 0.8, scaleY: 0.8 }, 1000, Laya.Ease.linearInOut, Laya.Handler.create(this, this.onMaskTween2));
    }
    private onMaskTween2(): void {
        Laya.Tween.clearAll(this.MaskImg);
        Laya.Tween.to(this.MaskImg, { scaleX: 1.1, scaleY: 1.1 }, 1000, Laya.Ease.linearInOut, Laya.Handler.create(this, this.onMaskTween1));
    }



    public close(): void {
        Laya.Tween.clearAll(this.ArrowImg);
        Laya.Tween.clearAll(this.MaskImg);
        SChapterData.instance.showNewChapter = false;
        super.close();
    }

    public removeSelf(): any {
        this.ArrowImg && this.ArrowImg.removeSelf();
        this.ArrowImg = null;
        this.MaskImg && this.MaskImg.removeSelf();
        this.MaskImg = null;
        this.removeEvent();
        super.removeSelf();
    }
}