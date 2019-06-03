import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C30003, C30004, C30004_1, C30015, C30014, C30016, C30017 } from "../../../net/pt/pt_30";

export class TaskProtocol extends BaseProtocol {
    constructor() {
        super();
    }
    /**
     * 接任务
     * @param taskId 
     */
    public send30003(taskId : number)
    {
        var msg:C30003 = new C30003();
        msg.TaskId = taskId;
        this.send(msg);
    }

    /**
     * 查询任务状态
     * @param taskId 
     */
    public send30014(taskId :number)
    {
        var msg:C30014 = new C30014();
        msg.TaskId = taskId;
        this.send(msg);
    }

    /**
     * 查询任务星级
     * @param taskId 
     */
    public send30016(taskId :number)
    {
        var msg:C30016 = new C30016();
        msg.TaskId = taskId;
        this.send(msg);
    }

    /**
     * 刷新任务星级
     * @param taskId 
     */
    public send30017(taskId :number , count:number)
    {
        var msg:C30017 = new C30017();
        msg.TaskId = taskId;
        msg.Count = count;//传0进来表示一键满星
        this.send(msg);
    }


    /**
     * 提交任务
     * @param taskIdId 
     * @param goodsList 
     */
    public send30004(taskIdId: number ,goodsList:Array<any> = null)
    {
        var msg:C30004 = new C30004();
        msg.TaskId = taskIdId;
        msg.item_1 = new Array<C30004_1>();
        if(goodsList)
        {
            for (let i = 0; i < goodsList.length; i++) {
                var goods = goodsList[i];
                var data:C30004_1 = new C30004_1();
                data.itemId = goods.itemId;
                data.num = goods.num;
                msg.item_1.push(data);
            }
        }
        this.send(msg);
    }

    public send30015(taskIdId: number)
    {
        var msg:C30015 = new C30015();
        msg.TaskId = taskIdId;
        this.send(msg);
    }

}