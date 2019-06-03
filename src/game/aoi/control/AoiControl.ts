import { AoiProtocol } from "../protocol/AoiProtocol";
import { SAoiData, SAoiEvent } from "../SAoiData";
import { SGameData } from "../../../net/data/SGameData";
import { MsgManager } from "../../ui/manager/MsgManager";
import { SChaosBattleData } from "../../activity/data/SChaosBattleData";
import { SCopyData } from "../../../net/data/SCopyData";

export class AoiControl extends BaseControl {
    private protocol: AoiProtocol = new AoiProtocol();//战斗请求协议
    constructor()
    {
        super();
        this.initEvent();
    }
    private initEvent(): void {
        SAoiData.instance.on(SAoiEvent.LOCAL_PLAYER_REQUEST_MOVE, this ,this.onRequestLocalPlayerMove);
        SAoiData.instance.on(SAoiEvent.AOI_REQUSET_TELEPORTBYNO, this ,this.RequsetTeleportByNo);
        SAoiData.instance.on(SAoiEvent.AOI_REQUSET_INFO, this ,this.onRequestAoi);
    }
    
    public RequesetChangeScene(data:any)
    {
        this.protocol.RequsetTelePort.apply(this.protocol,data)
    }
    
    public RequsetTeleportByNo(TeleportNo: any)
    {
        if(SGameData.instance.PLAYFIGHTREPORT){
            MsgManager.instance.showRollTipsMsg("战斗中无法切换场景");
            return;
        }
        if(SChaosBattleData.instance.isChaoScene())
        {
            MsgManager.instance.showRollTipsMsg("欢乐大乱斗中无法进行该操作");
            return;
        }
        if(SCopyData.instance.isInCopy)
        {
            MsgManager.instance.showRollTipsMsg("副本中无法进行该操作");
            return;
        }
        this.protocol.RequsetTeleportByNo(TeleportNo);
    }

    private onRequestAoi(sceneId: number)
    {
        this.protocol.RequsetAoi(sceneId);
    }
    /**
     * 
     * @param obj 请求玩家移动
     */
    private onRequestLocalPlayerMove(sceneId: number , x:number ,y :number)
    {
        this.protocol.PlayerMove(sceneId,x,y);
    }

}