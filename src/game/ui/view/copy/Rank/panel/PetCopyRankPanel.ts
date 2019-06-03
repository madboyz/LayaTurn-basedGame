import { MsgManager } from "../../../../manager/MsgManager";
import { SCopyData } from "../../../../../../net/data/SCopyData";
import { PetCopyRankItem } from "../item/PetCopyRankItem";
import { SRankEvent } from "../../../rank/protocol/RankMainProrocol";
import { HtmlUtils } from "../../../../../utils/HtmlUtils";

export class PetCopyRankPanel extends ui.main.PetCopyRankPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_3;
        this.isShowMask = true;
        this.mResouce = [
            
            { url: "res/atlas/copy.atlas", type: Laya.Loader.ATLAS },
        ];
    }

    public initComp() {
        super.initComp();
        HtmlUtils.setHtml(this.txt_myRank.style,6,20,"center","middle")
        this.initList();
        this.updateData();
    }

    private initList():void
    {
        this.list.itemRender = PetCopyRankItem;
        this.list.vScrollBarSkin = "";
        this.list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离。
        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this,this.onListChangeHandler,null,false);
    }

    public update():void
    {
        this.updateData();
    }

    public updateData():void
    {
        var rankStr: string = "";
        var myRankStr: string = ""

        if (SCopyData.instance.petCopyInfo) {
            if (SCopyData.instance.petCopyInfo.MyRank <= 0) {
                rankStr = "(未上榜)";
            } else {
                rankStr = "(第" + SCopyData.instance.petCopyInfo.MyRank + "名)";
            }
            myRankStr = HtmlUtils.addImage("comp/img_lightStar",21,20) + HtmlUtils.addColor("&nbsp;" + SCopyData.instance.getAllStar(),"#583a1b",18);
            this.list.array = SCopyData.instance.petCopyInfo.item_1;
        } else {
            rankStr = "(未上榜)";
        }
        this.txt_myRank.innerHTML = HtmlUtils.addColor("我的排名：","#583a1b",18) + myRankStr + HtmlUtils.addColor(rankStr,"#583a1b",18);
        
    }

    public open(...args): void {
        this.initWindow(true,true,"星级排名",486,524,165);
        this.event(SRankEvent.RANK_PET_COPY);
        super.open();
    }
    public initEvent():void 
    {
    }
    public removeEvent():void
    {
    }

    private oldItem:any;
    private selectItem:PetCopyRankItem;
    private onListChangeHandler():void
    {
        this.selectItem = this.list.getCell(this.list.selectedIndex) as PetCopyRankItem;
        this.oldItem = this.list.selectedItem;
        Laya.timer.callLater(this,this.changeSelect);
    }

    private changeSelect():void
    {
        var i:number = 0,cells:Array<any> = this.list.cells,len:number = cells.length,cell:any;
        for (i ; i < len ; i ++){
            cell = cells[i];
            cell && cell.checkSelect(this.oldItem);
        }
    }

    public close(): void {
        super.close();
    }
}