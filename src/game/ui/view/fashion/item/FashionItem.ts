import { SRoleData } from "../../../../../net/data/SRoleData";

export class FashionItem extends ui.main.PlayerTitleItemUI {
    private info:any;
    constructor() {
        super();
    }
    public set dataSource(data:any)
    {
        this.info = data;
        this.RefreshDisplay();
    }

    public get dataSource()
    {
        return this.info;
    }

    public RefreshDisplay()
    {
        if(!this.info)return;
        this.nameTxt.text = this.info.sheet.male_name;
    }

    public set IsSelect(val:boolean)
    {
        var nomalState = "chapter/item_nomal.png";
        if(this.info)
        nomalState = this.info.isHave == true?"chapter/item_nomal.png":"chapter/item_disabled.png"
        var str = val ==true?"chapter/item_select.png":nomalState;
        this.Bg.skin = str;
        this.Bg1.skin = val == true?"startgame/img_server1.png":"startgame/img_server4.png";
    }

    public checkSelect(vo:any)
    {
        if(!this.info)return;
        if(this.info.sheet.no == vo.sheet.no)
        {
            this.IsSelect = true;
        }
        else
        {
            this.IsSelect = false;
        }
        if(SRoleData.instance.info.Clothes == 0)
        this.IsInstall.visible = false;
        else if(SRoleData.instance.info.Clothes == this.info.sheet.no)
        this.IsInstall.visible = true;
        else
        this.IsInstall.visible = false;
    }
}