import { BaseActionPlayer } from "./BaseActionPlayer";
import { Move } from "./Move";
import { SNewBattleData, BubbleType } from "../../../net/data/SNewBattleData";
export class RunActionPlayer extends BaseActionPlayer
{
    public Dispose(): void {
        super.Dispose();
        Laya.Pool.recover("RunActionPlayer", this);
    }

    public async PlayAction(actions:any , move: Move , CmdPara:number , CmdType:number , CurPickTarget:number)
    {
        super.PlayAction(actions, move , CmdPara , CmdType , CurPickTarget);
      
        for (let i = 0; i < actions.length; i++) {
            var action = actions[i];
            if(SNewBattleData.instance.ForceStop)
            break;
            if(i == actions.length-1)
            {
                await move.run(action.BoId, action.Result);
            }
            else
            {
                move.run(action.BoId, action.Result);
                
            }
            SNewBattleData.instance.ShowOneBubbleByType(action.BoId,BubbleType.ESCAPE);
        }
    }
}