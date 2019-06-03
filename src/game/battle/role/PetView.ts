import { RoleView } from "./RoleView";
import { PetVo } from "../../../db/sheet/vo/PetVo";
import { Debug } from "../../../debug/Debug";

export class PetView extends RoleView {
    constructor(){
        super();
    }

    public updateSkin(): void {
        if (this.info == null) return;
        var id: number = this.info.ParentPartnerNo;
        var vo: PetVo = PetVo.get(id);
        if(!vo)
        return;
        var path: number = GMath.getPath(this.angle);
        try {
            var res: string = vo.body;
            this.resPath = `${res}`;
            if(this.resPath == "")
            return;
            var url: string = ResUtils.getRoleUrl(this.resPath, this.action, path);
            this.asyncUpdateSKin(url);
        } catch (error) {
            Debug.serverLog(error);
        }
    }

    public dispose(): void {
        Laya.Pool.recover("PetView", this);
        super.dispose();
    }
}