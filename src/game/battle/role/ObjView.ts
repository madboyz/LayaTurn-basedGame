
import { RoleView } from "./RoleView";
import { AoiInfo } from "../../aoi/AoiInfo";
export class ObjView extends RoleView{
    constructor(){
        super();
    }

    public dispose(): void {
        if(this.info != null&&this.info instanceof AoiInfo)
        {
            Laya.Pool.recover("AoiInfo", this.info);
        }
        Laya.Pool.recover("ObjView", this);
        super.dispose();
        
    }

    public updateSkin() {
        if (this.resPath == "") return;
        var path: number = GMath.getPath(this.angle);
        var url: string = ResUtils.getRoleUrl(this.resPath, this.action, path);
        this.asyncUpdateSKin(url);
    }
}