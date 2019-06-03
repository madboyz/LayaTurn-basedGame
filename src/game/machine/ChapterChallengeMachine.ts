import { BaseMachine } from "./BaseMachine";
import { SChapterData, SChapterEvent } from "../chapter/SChapterData";
import { SAoiData, SAoiEvent } from "../aoi/SAoiData";
import { SGameData } from "../../net/data/SGameData";
import { PortalVo } from "../../db/sheet/vo/PortalVo";
/**
 * 处理章节跳转场景并挑战
 */
export class ChapterChallengeMachine extends BaseMachine{
    private TargetSceneNo = 0;
    private TransferPoint:any = null;
    private isNeedWaitFightEnd = false;//是否要等待战斗结束
    private isSendChangeSceneId = false;
    constructor()
    {
        super();
        SAoiData.instance.on(SAoiEvent.AOI_REQUSET_INFO, this ,this.onRequestAoi);
        SChapterData.instance.on(SChapterEvent.CHAPTER_CHALLENGE ,this, this.OnChallenge);
    }
    public init(info:Array<any>):void{
        super.init(info);
        this.TargetSceneNo = info[0];
    }
    private onRequestAoi(sceneId: number)
    {
        this.TargetSceneNo = sceneId;
    }
    /**
     * 跳转boss
     * @param currentMapId 当前场景
     */
    public OnChallenge(isFast:boolean)
    {
        if(isFast){
            return;
        }
        this.TransferPoint = null;
        this.isNeedWaitFightEnd = true;
        this.isSendChangeSceneId = false;
        if(this.TargetSceneNo != SChapterData.instance.chapter.sheetChapterData.scene_no)
        {
            var vo:PortalVo = PortalVo.getBySceneNo(SChapterData.instance.chapter.sheetChapterData.scene_no);
            if(vo&&vo.target_xy)
            {
                this.TransferPoint = {x:vo.target_xy[0],y:vo.target_xy[1]};
            }
            
        }
    }

    public update():void{
        super.update();
        if(this.isNeedWaitFightEnd)
        {
            if(SGameData.instance.PLAYFIGHTREPORT == false)
            {
               
                if(SChapterData.instance.chapter.sheetChapterData.scene_no == this.TargetSceneNo)
                {
                    SChapterData.instance.RequestChallenge();
                    this.isNeedWaitFightEnd = false;
                    this.isSendChangeSceneId = true;
                }
                else
                {
                    if(this.TransferPoint != null)
                    {
                        if(!this.isSendChangeSceneId)
                        {
                            SAoiData.instance.event(SAoiEvent.AOI_GO_TO_SCENE, [SChapterData.instance.chapter.sheetChapterData.scene_no , this.TransferPoint.x , this.TransferPoint.y]);
                            this.isSendChangeSceneId = true;
                        }

                    }
                }
                
            }
        }

    }

    public dispose():void {
        super.dispose();
        SAoiData.instance.off(SAoiEvent.AOI_REQUSET_INFO, this ,this.onRequestAoi);
        SChapterData.instance.off(SChapterEvent.CHAPTER_CHALLENGE ,this, this.OnChallenge);
    }
}