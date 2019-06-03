import { Aerocraft_starVo } from "../../../../../db/sheet/vo/Aerocraft_starVo";
import { RoleView } from "../../../../battle/role/RoleView";
import { S60001_2 } from "../../../../../net/pt/pt_60";
import { Aerocraft_skinVo } from "../../../../../db/sheet/vo/Aerocraft_skinVo";

export class MountModelItem extends ui.main.MountModelItemUI{
    private role:RoleView;
    constructor() {
        super();
        this.initRole();
    }

    private initRole():void
    {
        this.role = new RoleView();
        this.role.info = "";
        this.role.angle = 0;
        this.role.scaleX = this.role.scaleY=1.1;
        this.addChild(this.role);
        this.role.x = 185 ;
        this.role.y = 190 ;
    }

    private mData:number;

    public set dataSource(data:number)
    {
        if(!data) return;
        this.mData = data;
        var body_anim = Aerocraft_skinVo.get(data).body_anim;
        if(this.role && body_anim)
        {
            this.role.resPath = body_anim;
            this.role.updateSkin();
        }
    }

    public get dataSource():number
    {
        return this.mData;
    }
}