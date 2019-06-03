import { SCopyData } from "../../../../../../net/data/SCopyData";
import { Chapter_dunVo } from "../../../../../../db/sheet/vo/Chapter_dunVo";
import { FbVo } from "../../../../../../db/sheet/vo/FbVo";
import { S57019 } from "../../../../../../net/pt/pt_57";
import { RoleView } from "../../../../../battle/role/RoleView";
import { PetCopyItem } from "./PetCopyItem";

export class PetCopyListItem extends ui.main.PetListItemUI {
    private _selectIndex:number = -1;
    private _fbList:Array<FbVo> = [];
    private _itemLit:Array<PetCopyItem> = [];
    private _copyInfo:S57019;
    constructor() {
        super();
        this.initItem();
    }

    private initItem():void
    {
        this._selectIndex = -1;
        var item:PetCopyItem;
        for (let index = 0; index < 6; index++) {
            item = new PetCopyItem();
            this.addChild(item);
            this._itemLit.push(item);
            this.updatePos(index);
        }
    }

    private updatePos(index:number):void
    {
        switch (index) {
            case 0:
                this._itemLit[0].x = 0;
                this._itemLit[0].y = 126;
            break;
            case 1:
                this._itemLit[1].x = 72;
                this._itemLit[1].y = 0;
            break;
            case 2:
                this._itemLit[2].x = 115;
                this._itemLit[2].y = 154;
            break;
            case 3:
                this._itemLit[3].x = 200;
                this._itemLit[3].y = 49;
            break;
            case 4:
                this._itemLit[4].x = 306;
                this._itemLit[4].y = 154;
            break;
            case 5:
                this._itemLit[5].x = 326;
                this._itemLit[5].y = 22;
            break;
            default:
                break;
        }
    }

    private mData:Chapter_dunVo;

    public set dataSource(data:Chapter_dunVo)
    {
        if(!data) return;
        this._selectIndex = -1;
        this._fbList.length = 0;
        this.mData = data;
        this._copyInfo = SCopyData.instance.getPetCopyInfo(data.no);
        this.updateData();
        this.updateSelect();
    }

    private updateData():void
    {
        this.updateItemdata();
        this.updateStar();
    }

    private updateStar():void
    {
        var num:number = SCopyData.instance.getPetCopyStarNum(this.mData.no);
        this.txt_num.text = num + "/18";
    }

    private updateItemdata():void
    {
        var vo:FbVo;
        for (let index = 0; index < this.mData.dun_list.length; index++) {
            var element = this.mData.dun_list[index];
            vo = FbVo.get(element);
            this._itemLit[index].no = this.mData.no;
            this._itemLit[index].dataSource = vo;
            this._fbList.push(vo);
        }
    }

    private updateSelect():void
    {
        if(SCopyData.instance.curChallengeInfo)
        {
            if(SCopyData.instance.curChallengeInfo.ChapterID == this.mData.no)
            {
                for (let index = 0; index < 6; index++) {
                    var element = this._fbList[index];
                    if(element.no == SCopyData.instance.curChallengeInfo.DunNo)
                    {
                        this.selectIndex = index;
                        return;
                    }
                }
            }
            else
            {
                this.selectIndex = 0;
            }
        }
        else
        {
            this.selectIndex = 0;
        }
    }

    public selectPass(info:FbVo):void
    {
        for (let index = 0; index < 6; index++) {
            var element = this._fbList[index];
            if(element.no == info.no)
            {
                this.selectIndex = index;
            }
        }
    }

    private set selectIndex(value:number)
    {
        if(value != this._selectIndex)
        {
            for (let index = 0; index < 6; index++) {
                if(value == index)
                {
                    this._selectIndex = value;
                    this.txt_pass.text = this.selectItem.name;
                    this._itemLit[index].img_select.visible = true;
                    this.parent.parent.event("changeSelect",[this.mData.no,this.selectItem]);
                }
                else
                {
                    this._itemLit[index].img_select.visible = false;
                }
            }
        }
    }

    public get selectItem():FbVo
    {
        return this._fbList[this._selectIndex];
    }

    public get dataSource():Chapter_dunVo
    {
        return this.mData;
    }

    public dispose():void
    {
        this._selectIndex = -1;
        this._fbList.length = 0;
    }

    public removeSelf():any
    {
        super.removeSelf();
    }
}