export class TeamUtil {
    //构建teamRoleInfo
    public static CreateTeamRoleInfo(roleId:number ,name:string , level:number , trainPos:number , faction:number , sex:number , SceneNo:number , state:number ,battlePower:number ,isLeader:boolean):any
    {
        return {roleId:roleId,name:name ,level:level,trainPos:trainPos,faction:faction,sex:sex,SceneNo:SceneNo,state:state,battlePower:battlePower,leader:isLeader};
    }

}