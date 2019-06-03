import { Activity_dataVo } from "../../../../../db/sheet/vo/Activity_dataVo";
import { SChaosBattleData } from "../../../../activity/data/SChaosBattleData";
import { FbVo } from "../../../../../db/sheet/vo/FbVo";

export enum ActiveState {
    Open,//新开启
    Continue,//继续
    End,//结束
}

export class ActiveInfo {
    public No:number = 0;
    public Sheet:Activity_dataVo;
    public maxNum:number = 0;
    public useNum:number = 0;
    public state:ActiveState = ActiveState.End;
}

export class ActiveUitl
{
    public static DoAction(proc_name:string)
    {
        switch(proc_name)
        {
            case "AD_MELEE":
            {
                SChaosBattleData.instance.protocol.send28001();
                UIManager.instance.closeUI(UIID.SYS_ACTIVITY);
                UIManager.instance.closeUI(UIID.SYS_MAIN);
                break;
            }
            case "AD_yuezhimigong":
            {
                var vos = FbVo.getListByType(CopyType.Grid);
                var nos = [];
                for (let i = 0; i < vos.length; i++) {
                    const vo:FbVo = vos[i];
                    nos.push(vo.no);
                }
                UIManager.instance.openUI(UIID.SYS_COPY_SELECT_PANEL,[nos]);
                break;
            }
            case "AD_wujingshilian":
            {
                /**
                 * 以后会有单人以及副本选择
                 */
                var vos = FbVo.getListByType(CopyType.THREE_DUN);
                var nos = [];
                for (let i = 0; i < vos.length; i++) {
                    const vo:FbVo = vos[i];
                    nos.push(vo.no);
                }
                UIManager.instance.openUI(UIID.SYS_COPY_SELECT_PANEL,[nos]);
                UIManager.instance.closeUI(UIID.SYS_ACTIVITY);
                UIManager.instance.closeUI(UIID.SYS_MAIN);
                break;
            }

            default:
            {
                UIManager.instance.closeUI(UIID.SYS_ACTIVITY);
                UIManager.instance.closeUI(UIID.SYS_MAIN);
                break;
            }
        }
    }
}