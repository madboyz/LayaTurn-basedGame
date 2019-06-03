import { BaseProtocol } from "../../../net/protocol/BaseProtocol";
import { C12001, C12013, C12008, C12009 } from "../../../net/pt/pt_12";


export class AoiProtocol extends BaseProtocol {
    /**
     * 玩家走动
     * @param sceneId 
     * @param x 
     * @param y 
     */
    public PlayerMove(sceneId: number , x: number , y: number)
    {
        var msg: C12001 = new C12001();
        msg.SceneId = sceneId;
        msg.NewX = x;
        msg.NewY = y;
        this.send(msg);
    }
    /**
     * 请求当前aoi信息
     * 如果AOI范围内没有任何对象，则服务端不返回任何消息
     * 如果有玩家，则返回12002协议
     * 如果有怪物，则再返回12005协议（这时协议中的对象类型都是怪物）
     * 如果有可移动npc，则接着再返回12005协议（这时协议中的对象类型都是npc）
     * @param sceneId 
     */
    public RequsetAoi(sceneId: number)
    {
        var msg: C12013 = new C12013();
        msg.SceneId = sceneId;
        this.send(msg);
    }

    public RequsetTelePort(sceneId: number , x: number , y:number)
    {
        var msg: C12008 = new C12008();
        msg.SceneId = sceneId;
        msg.X = x;
        msg.Y = y;
        this.send(msg);
    }

    public RequsetTeleportByNo(TeleportNo: number) {
        var msg: C12009 = new C12009();
        msg.TeleportNo = TeleportNo;
        this.send(msg);
    }
}