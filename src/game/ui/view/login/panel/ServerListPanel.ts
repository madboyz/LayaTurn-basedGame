import { SLogin } from "../../../../../net/data/SLogin";

export class ServerListPanel extends ui.main.ServerListPanelUI {
    constructor() {
        super();
        this.layer = UILEVEL.POP_4;
        this.isShowMask = true;
        this.sameLevelEliminate = false;
        this.mResouce = [
            //面板需要的ui资源
            { url: "res/atlas/startgame.atlas", type: Laya.Loader.ATLAS },
        ];
    }
    private mSelectRegion:any = null;
    private mRegionList:Array<any> = [];
    private mServerList:Laya.Dictionary = new Laya.Dictionary();;
    public initComp() {
        super.initComp();
        this.initListRegionList();
        this.initServerList();
    }

    public update() {
        //TODO:第二次打开面板
        super.update();



    }

    public UpdateData()
    {
        this.mRegionList = [];
        this.mServerList.clear();
        //加入最近登录的大区
        var server = SLogin.instance.GetCurrentServer();
        if(server != null)
        {
            var lastRegion = {id:-999 , title:"最近登录"};
            this.mRegionList.push(lastRegion);
            server.region_id = -999;
            ///最近登录的需要特殊处理
            this.mServerList.set(-999 , [server]);
        }

        var region_list = SLogin.instance.RegionList;
        for (let i = 0; i < region_list.length; i++) {
            const region = region_list[i];
            this.mRegionList.push(region);
        }

        var regionlist = SLogin.instance.ServerList.keys;
        for (let i = 0; i < regionlist.length; i++) {
            const key = regionlist[i];
            const serverList = SLogin.instance.ServerList.get(key);
            this.mServerList.set(key , serverList);
        }
    }

    private initListRegionList()
    {
        //所有大区类别并且把最近的服放进去作为第一个来使用
        this.regionList.itemRender = Laya.Button;
        this.regionList.spaceX = 0;
        this.regionList.spaceY = 60;
        this.regionList.repeatX = 1;
        this.regionList.repeatY = 10;
        this.regionList.vScrollBarSkin = "";
        this.regionList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.regionList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离
        this.regionList.renderHandler = new Laya.Handler(this, this.onRegionListRender)
        this.regionList.mouseHandler = new Laya.Handler(this, this.onRegionListMouseHandle)
    }

    private initServerList()
    {
        this.serverList.itemRender = ui.main.ServerItem1UI;
        this.serverList.spaceX = 0;
        this.serverList.spaceY = 5;
        this.serverList.repeatX = 1;
        this.serverList.repeatY = 11;
        this.serverList.vScrollBarSkin = "";
        this.serverList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.serverList.scrollBar.elasticDistance = 300;//设置橡皮筋极限距离
        this.serverList.renderHandler = new Laya.Handler(this, this.onServerListRender);
        this.serverList.mouseHandler = new Laya.Handler(this, this.onServerListMouseHandle);
    }

    private updateServerBtn(cell:ui.main.ServerItem1UI , server:any)
    {
        cell.ServerName.text = server.name;
        var index = 1;
        switch(server.state)
        {
            case 0:
            {
                index = 4;
                break;
            }
            case 1:
            {
                index = 1;
                break;
            }
            case 2:
            {
                index = 3;
                break;
            }
            default :
            {
                index = 4;
                break;
            }
        }
        cell.ServerState.skin = `startgame/img_server${index}.png`;
        cell.hasRole.visible = server.haveRole;
        if(server.type == 2 || server.type == 3)
        {
            cell.ServerFlag.visible = true;
            cell.ServerFlag.skin = "startgame/img_server_flg1.png";
        }
        else if(server.type == 1)
        {
            cell.ServerFlag.visible = true;
            cell.ServerFlag.skin = "startgame/img_server_flg2.png";
        }
        else 
        {
            cell.ServerFlag.visible = false;
        }

    }

    private onServerListRender(cell:ui.main.ServerItem1UI,index:number) {
        if(!cell)
        return;
        if(cell.dataSource != null)
        {
            this.updateServerBtn(cell , cell.dataSource);
        }
    }

    private onServerListMouseHandle(e:Event,index:number) {
        if(e.type != Laya.Event.CLICK)
        return;
        for (let i = 0; i < this.serverList.length; i++) {
            var cell = this.serverList.cells[i];
            var server = cell.dataSource;
            if(server != null)
            {
                if(server.sid == this.serverList.array[index].sid)
                {
                    SLogin.instance.Login(server.sid);
                    UIManager.instance.closeUI(UIID.SERVER_LIST);
                    break;
                }
            }
        }
    }

    

    private updateRegionBtn(btn:Laya.Button , region:any)
    {
        btn.skin = "comp/btn_bg6.png";
        btn.stateNum = 2;
        btn.labelColors = "#616d69,#b2660d,#b2660d";
        btn.labelSize = 20;
        if(this.mSelectRegion.id == region.id)
        {
            btn.selected = true;
        }
        else
        btn.selected = false;
        btn.label = region.title;
    }

    private onRegionListRender(cell:Laya.Button,index:number) {
        if(!cell)
        return;
        if(cell.dataSource != null)
        {
            this.updateRegionBtn(cell , cell.dataSource);
        }
    }

    private onRegionListMouseHandle(e:Event,index:number)
    {
        if(e.type != Laya.Event.CLICK)
        return;
        for (let i = 0; i < this.regionList.cells.length; i++) {
            var cell = this.regionList.cells[i];
            var region = cell.dataSource;
            if(region != null)
            {
                if(region.id == this.regionList.array[index].id)
                {
                    this.mSelectRegion = this.regionList.array[index];
                    this.serverList.array = this.mServerList.get( this.mSelectRegion.id);
                    cell.selected = true;
                }
                else
                {
                    cell.selected = false;
                }
            }
        }
    }

    public initEvent(): void {
    }

    public removeEvent(): void {
    }

    public open(...args): void {
        super.open();
        this.UpdateData();
        this.regionList.array = this.mRegionList;
        var cell = this.regionList.cells[0];
        if(cell)
        {
            this.mSelectRegion = this.mRegionList[0];
            this.serverList.array = this.mServerList.get( this.mSelectRegion.id);
        }
    }

    public close(): void {
        super.close();
        //TODO:关闭面板处理
    }
}