import { ScrollList } from "../../../compent/ScrollList";
import { AttrItemText2 } from "../../title/panel/PlayerTitlePanel";
import { RoleFactory } from "../../../../battle/role/RoleFactory";
import { SRoleData, SRoleEvent } from "../../../../../net/data/SRoleData";
import { AoiInfo } from "../../../../aoi/AoiInfo";
import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { PropertyVo } from "../../../../../db/sheet/vo/PropertyVo";
import { PropertyUtil } from "../../../../property/PropertyUtil";
import { S12002_1 } from "../../../../../net/pt/pt_12";
import { TimerUtil } from "../../../../utils/TimerUtil";
import { GameUtils } from "../../../../utils/GameUtils";
import { FashionItem } from "../item/FashionItem";
import { Fashion_cfgVo } from "../../../../../db/sheet/vo/Fashion_cfgVo";
import { PlayerView } from "../../../../battle/role/PlayerView";

export class FashionPanel extends ui.main.PlayerTitlePanelUI {
    public mList:ScrollList;
    public selectFashionVo = null;
    private role:PlayerView;
    private getAttrDataList = [];
    private installAttrDataList = [];
    constructor() {
        super();
        this.isShowMask = true;
        this.mResouce = [
            { url: "res/atlas/chapter.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/startgame.atlas", type: Laya.Loader.ATLAS }
        ];
    }

    private initList():void
    {
        if(this.mList == null)
        {
            this.mList = new ScrollList(430,197,64,187,FashionItem,1,1,this.onChange.bind(this));
            this.mList._preBtn.on(Laya.Event.MOUSE_DOWN, this,this.onPreBtnDownHandler);
            this.mList._nextBtn.on(Laya.Event.MOUSE_DOWN, this,this.onNextBtnDownHandler);
            this.addChild(this.mList);
            this.mList.x = (this.width - this.mList.width) >> 1;
            this.mList.y = 456;
            this.mList.moveBtnY(62);
        }

        this.GetAttrlList.itemRender = AttrItemText2;
        this.GetAttrlList.vScrollBarSkin = "";
        this.GetAttrlList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.GetAttrlList.scrollBar.elasticDistance = 100;

        this.InstallAttrList.itemRender = AttrItemText2;
        this.InstallAttrList.vScrollBarSkin ="";
        this.InstallAttrList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.InstallAttrList.scrollBar.elasticDistance = 100;
    }

    public onUpdateTimeDisplay()
    {
        if(this.selectFashionVo.expireTime == 0)
        {
            this.timeTxt.text = "";
        }
        else
        {
            var deltTime = this.selectFashionVo.expireTime - GameUtils.TimeStamp;
            if(deltTime == 0)
            {
                this.timeTxt.text = "";
                return;
            }
            var dd = TimerUtil.dd(deltTime);
            if(dd != "00")
            {
                this.timeTxt.text = `${dd}天后到期`;
            }
            else
            {
                var hh = TimerUtil.hh(deltTime);
                var mm = TimerUtil.mm(deltTime);
                var ss = TimerUtil.ss(deltTime);
                if(hh != "00")
                {
                    this.timeTxt.text = `${hh}时${mm}分${ss}秒后到期`;
                }
                else
                {
                    this.timeTxt.text = `${mm}分${ss}秒后到期`;
                }
            }
            
        }
        
    }

    public onChange(index:number):void
    {
        if(index == null)
        {
            index = this.mList.selectedIndex;
        }
        this.selectFashionVo = this.mList.dataProvider[index];
        this.RefreshInstallAttr(this.selectFashionVo.sheet);
        this.RefreshGetAttr(this.selectFashionVo.sheet);
        this.onUpdateTimeDisplay();
        var info:AoiInfo = this.role.info;
        var PlayerInfo = info.getInfo(RoleType.OBJ_PLAYER);
        PlayerInfo.Clothes = this.selectFashionVo.sheet.no;
        this.role.updateSkin();
        this.desTxt.text = this.selectFashionVo.sheet.male_desc + this.selectFashionVo.sheet.male_info;
        if(!this.selectFashionVo.isHave)
        {
            this.changeBtn.visible = false;
        }
        else
        {
            this.changeBtn.visible = true;
            if(SRoleData.instance.info.Clothes == this.selectFashionVo.sheet.no)
            {
                this.changeBtn.label = "取消";
            }
            else
            {
                this.changeBtn.label = "幻化";
            }
        }

        //update
        this.checkSelect();
        
    }

    private initRole():void
    {
        this.role = RoleFactory.CreateAOiPlayer(SRoleData.instance.info.Faction , SRoleData.instance.info.Sex);
        this.role.info = Laya.Pool.getItemByClass("AoiInfo", AoiInfo);
        var data = new S12002_1();
        data.Clothes = SRoleData.instance.info.Clothes;
        data.Sex = SRoleData.instance.info.Sex;
        data.Faction = SRoleData.instance.info.Faction;
        data.Weapon = FactionVo.get(data.Faction).weapon_anim;
        this.role.info.PlayerInfo = data;
        this.role.scaleX = this.role.scaleY=1.2;
        this.role.x = 284;
        this.role.y = 391;
        this.addChild(this.role);
        this.role.updateSkin();
    }

    public initComp() {
        super.initComp();
        this.initRole();
        this.BattleText.url = "res/atlas/number/fight.atlas";
        this.initList();
        this.changeBtn.label = "幻化";
        this.installTitleTxt.text = "使用属性";
        this.infoText.text = "时装使用后直接加成到主角";
        //this.InstallBox.x = 233;
        //this.getBox.visible = false;
    }

    public open(...args): void {
        this.initWindow(true,false,"时装",550,750,45);
        super.open();
        this.titleLb.text = "时装";
        this.updateAlldata();
    }
    
    public RefreshInstallAttr(Vo:Fashion_cfgVo)
    {
        this.installAttrDataList = [];
        var attrs = Vo.add_attr;
        for (let j = 0; j < attrs.length; j++) {
            const element =  attrs[j];
            var attrKey = element[0];
            this.installAttrDataList.push({key:attrKey , value1:element[1] , value2:element[2]});
        }
        
        this.InstallAttrList.array = this.installAttrDataList;
    }

    public RefreshGetAttr(Vo:Fashion_cfgVo)
    {
        this.getAttrDataList = [];
        var attrs = Vo.ava_attr;
        for (let j = 0; j < attrs.length; j++) {
            const element =  attrs[j];
            var attrKey = element[0];
            this.getAttrDataList.push({key:attrKey , value1:element[1] , value2:element[2]});
        }
        
        this.GetAttrlList.array = this.getAttrDataList;
    }

    public updateAlldata()
    {
        var no = SRoleData.instance.info.GraphTitle;
        var list = SRoleData.instance.Titles;
        if(no == 0)
        {
            this.selectFashionVo = list[0];
        }
        else
        this.selectFashionVo = SRoleData.instance.allFashion.get(no);
        this.mList.dataProvider = SRoleData.instance.Fashions;
        this.mList.selectedIndex = 0;
        this.updateCombat();
    }

    public updateCombat():void
    {
        if(SRoleData.instance.info)
        {
            this.BattleText.text = SRoleData.instance.info.BattlePower.toString();
        }
    }

    public initEvent():void {
        this.changeBtn.on(Laya.Event.CLICK,this,this.onClickChangeBtn);
        this.AttrBtn.on(Laya.Event.CLICK,this,this.onClickAttrBtn);
        this.GetAttrlList.renderHandler = new Laya.Handler(this, this.onGetAttrListRender);
        this.InstallAttrList.renderHandler = new Laya.Handler(this, this.onInstallAttrListRender);
        
        this.close_Btn.on(Laya.Event.CLICK, this, this.close);
        this.back_Btn.on(Laya.Event.CLICK, this, this.close);
    }

    public removeEvent():void {
        this.changeBtn.off(Laya.Event.CLICK,this,this.onClickChangeBtn);
        this.AttrBtn.off(Laya.Event.CLICK,this,this.onClickAttrBtn);
        this.GetAttrlList.renderHandler = null;
        this.InstallAttrList.renderHandler = null;
        
        this.close_Btn.off(Laya.Event.CLICK, this, this.close);
        this.back_Btn.off(Laya.Event.CLICK, this, this.close);
    }

    private onClickChangeBtn():void {
        this.event(SRoleEvent.ROLE_USE_FASHION_UPDATE , this.selectFashionVo.sheet.no);
        //if(SRoleData.instance.info.Clothes == this.selectFashionVo.sheet.no)
        //{
        //    this.event(SRoleEvent.ROLE_USE_FASHION_UPDATE , this.selectFashionVo.sheet.no);
        //}
        //else
        //{
//
        //}
        
    }

    private onClickAttrBtn():void {
        UIManager.instance.openUI(UIID.SYS_LOOKPROP,[SRoleData.instance.info]);
    }

    private onGetAttrListRender(cell: Laya.Text, index: number): void {
        var attr = this.getAttrDataList[index];
        var vo = PropertyVo.getByInfo(attr.key);
        if (vo) {
            var str1 = "";
            var str2 = "";
            if (attr.value1 > 0) {
                var descValue = PropertyUtil.GetPropertyDec(vo.no, attr.value1);
                str1 = ` + ${descValue}`;
            }
            if (attr.value2 > 0) {
                str2 = ` + ${(attr.value2 * 100).toFixed(2)}%`;
            }
            var formate = ""
            if (index != this.GetAttrlList.array.length - 1) {
                formate = "\n";
            }
            cell.text = vo.name + str1 + str2 + formate;
        }
        else {
            cell.text = "未知属性";
        }
    }

    private onInstallAttrListRender(cell: Laya.Text, index: number): void {
        var attr = this.installAttrDataList[index];
        var vo = PropertyVo.getByInfo(attr.key);
        if(vo)
        {
            var str1 = "";
            var str2 = "";
            if(attr.value1 > 0)
            {
                var descValue = PropertyUtil.GetPropertyDec(vo.no , attr.value1);
                str1 = ` + ${descValue}`;
            }
            if(attr.value2 > 0)
            {
                str2 = ` + ${(attr.value2*100).toFixed(2)}%`;
            }
            var formate = ""
            if(index != this.InstallAttrList.array.length-1)
            {
                formate = "\n";
            }
            cell.text = vo.name +str1+str2+formate;
        }
        else
        {
            cell.text = "未知属性";
        }
    }

    public update():void
    {
    }

    private onPreBtnDownHandler(e:Event=null):void
    {
        this.checkSelect();
    }

    private onNextBtnDownHandler(e:Event=null):void
    {
        this.checkSelect();
    }

    public close(): void {
        super.close();
    }

    public checkSelect():void
    {
        var THIS = this;
        Laya.timer.once(100,this,function():void{
            var i:number = 0,cells:Array<any> = THIS.mList.list.cells,len:number = cells.length,cell:any;
            for (i ; i < len ; i ++){
                cell = cells[i];
                if(cell)
                {
                    cell.checkSelect(THIS.selectFashionVo);
                }
                 
            }
        });
    }
}