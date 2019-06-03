import { Astar } from "../../framework/utils/Astar";
import { SRoleData } from "../../net/data/SRoleData";
import { SAoiData, SAoiEvent } from "../aoi/SAoiData";
import { LocalPlayerView } from "../battle/role/LocalPlayerView";
import { BaseMachine } from "./BaseMachine";
import { SMachineEvent, SMachineData } from "./SMachineData";
import { MsgManager } from "../ui/manager/MsgManager";
import { SGameData } from "../../net/data/SGameData";
import { PortalVo } from "../../db/sheet/vo/PortalVo";
/**
 * 玩家自动移动到某个地方执行行为machine
 */
export class RoleMoveAndActionMachine extends BaseMachine {
    private param:any;//执行参数
    private _machWorking: boolean = false;//mach在执行工作

    // private _doingTask: boolean = false;//在引导做任务
    private _isSendChangeSceneId: boolean = false;
    private TransferPoint:any;//新场景信息
    private _nowScene: number;//现在的场景;

    private _isInRightPlace:boolean = false;//是否在对的坐标
    private _wantScene: number;//希望去的场景；
    private _wantPath: any;//希望去的坐标;
    private _cbObj:any;
    private _cbFunc:Function;

    constructor() {
        super();
        SAoiData.instance.on(SAoiEvent.AOI_REQUSET_INFO, this, this.onRequestAoi);//场景变化
        SMachineData.instance.on(SMachineEvent.Start_Action_Machine, this, this.startTask);
        SMachineData.instance.on(SMachineEvent.Stop_Action_Machine, this, this.stopTask);
        SMachineData.instance.on(SMachineEvent.Map_Click, this, this.mapClicked);//地图被点击了
    }

    public startTask(wantScene: number, wantPath: any , cbObj:any , cbFunc:Function ): void {
        this._wantScene = wantScene;
        this._wantPath = wantPath;
        this._cbObj = cbObj;
        this._cbFunc = cbFunc;
        this._machWorking = true;
        this.TransferPoint = null;
        this._isInRightPlace = false;
        SRoleData.instance.CanAutoMove = false;
        var localPlayer: LocalPlayerView = this.targets.get(SRoleData.instance.roleId);
        if(localPlayer){
            localPlayer.on(CMD.MOVE_END,this,this.toRightPath);
            if(wantScene != null){
                var vo:PortalVo = PortalVo.getBySceneNo(this._wantScene);
                if(vo&&vo.target_xy)
                {
                    this.TransferPoint = {x:vo.target_xy[0],y:vo.target_xy[1]};
                }
            }
        }

    }

    public stopTask():void{
        this._machWorking = false;
        this._wantScene = null;
        this._wantPath = null;
        this._cbObj = null;
        this._cbFunc = null;
        this.TransferPoint = null;
        this._isInRightPlace = false;
        var localPlayer: LocalPlayerView = this.targets.get(SRoleData.instance.roleId);
        localPlayer && localPlayer.off(CMD.MOVE_END,this,this.toRightPath);
    }

    public mapClicked():void{
        this.stopTask();
    }

    private onRequestAoi(sceneId: number) {
        this._nowScene = sceneId;
        this._isSendChangeSceneId = false;
    }

    public update(): void {
        super.update();
        if (!this._machWorking || SGameData.instance.PLAYFIGHTREPORT) {
            return;
        }
        SRoleData.instance.CanAutoMove = false;
        if(this._wantScene == null){
            this.updatePath();
            return;
        }
        if (this._wantScene == this._nowScene) {
            //在对的场景
            this.updatePath();
        } else {
            if (this.TransferPoint != null && !this._isSendChangeSceneId) {
                SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [this._wantScene, this.TransferPoint.x, this.TransferPoint.y]);
                this._isSendChangeSceneId = true;
            }
        }
    }

    public updatePath():void{
        //没动的时候
        if(this._wantPath == null){
            this.toRightPath();
            return;
        }
        var localPlayer: LocalPlayerView = this.targets.get(SRoleData.instance.roleId);
        if(!localPlayer || localPlayer.isMoveing || this._isInRightPlace){
            return;
        }
        var px = this._wantPath.x * Astar.instance.GridSize;
        var py = Astar.instance.MapHeight - this._wantPath.y * Astar.instance.GridSize;
        var path: any = Astar.instance.find(localPlayer.px, localPlayer.py, px, py);
        if(!path||(path.length ==0)){
            MsgManager.instance.showRollTipsMsg("路径不存在，或无法走到该点");
            return;
        }else{
            localPlayer.ptachTo(path);
        }
    }

    public toRightPath():void{
        this._isInRightPlace = true;
        this._cbFunc.call(this._cbObj);
        SMachineData.instance.event(SMachineEvent.Finish_Action_Machine);
    }

    public dispose(): void {
        super.dispose();
        SAoiData.instance.off(SAoiEvent.AOI_REQUSET_INFO, this, this.onRequestAoi);//场景变化
        SMachineData.instance.off(SMachineEvent.Start_Action_Machine, this, this.startTask);
        SMachineData.instance.off(SMachineEvent.Stop_Action_Machine, this, this.stopTask);
        SMachineData.instance.off(SMachineEvent.Map_Click, this, this.mapClicked);//地图被点击了
    }
} 