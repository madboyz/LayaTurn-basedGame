import { ConstVo } from "../../../../../db/sheet/vo/ConstVo";

export class GuildHelper {
    public static getGuildPermission(position: number, actionType: GuildActionType): boolean {
        if (position == 1) {
            return true;
        } else if (position == 2 && (actionType == GuildActionType.xiugaigonggao || actionType == GuildActionType.kaichuchengyuan
            || actionType == GuildActionType.guanliliebiao)) {
            return true;
        } else if (position == 2 && (actionType == GuildActionType.guanliliebiao)) {
            return true;
        } else {
            return false;
        }
        //帮主都可以
        //副帮主，修改公告，开除成员，管理申请列表
        //长老，管理申请列表
    }

    public static getPositionName(position: number):string{
        switch (position) {
            case 1:
                return "帮主";
            case 2:
                return "副帮主";
            case 3:
                return "长老";
            case 4:
                return "成员";
        }
        return "";
    }

    public static getGuildBossCfg(copyNo:number):any{
        var vo = ConstVo.get("GUILD_BOSS_LV_LIMIT").val;
        for (let i = 0; i < vo.length; i++) {
            const element = vo[i];
            if(element[0] == copyNo){
                return element;
            }
        }
        return false;

    }

}


export enum GuildActionType {
    xiugaigonggao = "xiugaigonggao",//修改公告
    renmingchengyuan = "renmingchengyuan",//任命成员
    kaichuchengyuan = "kaichuchengyuan",//开除成员
    guanliliebiao = "guanliliebiao",//管理列表
    jiesanbangpai = "jiesanbangpai",//解散帮派
}

export enum GuildPositionType {
    leader = 1,//帮主
    subLeader = 2,//副帮主
    elite = 3,//长老
    menber = 4,//成员
}