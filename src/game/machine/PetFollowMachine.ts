import { BaseMachine } from "./BaseMachine";
import { PlayerView } from "../battle/role/PlayerView";
import { PetView } from "../battle/role/PetView";
import { GameUtils } from "../utils/GameUtils";
import { Astar } from "../../framework/utils/Astar";

export class PetFollowMachine extends BaseMachine {
    private ScenePlayer:Laya.Dictionary = new Laya.Dictionary();
    private ScenePet:Laya.Dictionary = new Laya.Dictionary();
    private ScenePlayerPosList:Laya.Dictionary = new Laya.Dictionary(); 
    constructor()
    {
        super();
    }

    public Clear()
    {
        this.ScenePlayer.clear();
        this.ScenePet.clear();
    }

    public UpdateScenePet(uuid:number,Player:PlayerView,petNo:number , pet:PetView)
    {
        var player:PlayerView = this.ScenePlayer.get(uuid);
        if(!player)
        this.ScenePlayer.set(uuid , Player);
        if(petNo == 0)
        {
            this.RemoveScenePet(uuid , false);
        }
        else
        {
            this.ScenePet.set(uuid , pet);
        }
    }
    /**
     * 移除场景宠物
     * @param uuid 
     * @param isRemovePlayer 玩家把宠物下阵了 
     */
    public RemoveScenePet(uuid:number , isRemovePlayer:boolean = true)
    {
        var pet:PetView = this.ScenePet.get(uuid);
        if(pet)
        {
            pet.dispose();
            this.ScenePet.remove(uuid);
        }
        isRemovePlayer && this.ScenePlayer.remove(uuid);
    }

    public update():void{
        super.update();
        for (let i = 0; i < this.ScenePlayer.keys.length; i++) {
            const uuid = this.ScenePlayer.keys[i];
            var pet:PetView = this.ScenePet.get(uuid);
            var player:PlayerView = this.ScenePlayer.get(uuid);
            if(!pet||!player)
            continue;
            if(!player.isMoveing)
            {
                this.ScenePlayerPosList.remove(uuid);
                if(pet.isMoveing)
                {
                    pet.stopMove();
                    pet.angle = player.angle;
                }
                continue;
            }
            var offset = player.isFly == true ? 96: 48;
            var distance = GameUtils.distance(pet.px ,pet.py ,player.px, player.py); 
            if(distance >= offset)
            {
                this.SavePlayerPos(uuid,player.px , player.py);
                var posList = this.ScenePlayerPosList.get(uuid);
                var playerPos = posList.shift()
                pet.Speed = (distance-offset)/2 + 2;
                pet.angle = player.angle;
                var path: any = Astar.instance.find(pet.px, pet.py, playerPos.px, playerPos.py);
                pet.ptachTo(path);
            }
            else
            {
                this.SavePlayerPos(uuid,player.px , player.py);
                pet.Speed = 2;
            }
        }

    }

    private SavePlayerPos(uuid:number, _px:number,_py:number)
    {
        var posList = this.ScenePlayerPosList.get(uuid);
        if(posList == null||(posList&&posList.length == 0))
        {
            posList = [];
            posList.push({px:_px , py:_py});
            this.ScenePlayerPosList.set(uuid , posList);
        }
        else
        {
            var lastPos = posList[posList.length - 1]; 
            var detal = GameUtils.distance(lastPos.px ,lastPos.py ,_px, _py); 
            if(detal >Astar.instance.GridSize&&Astar.instance.GridSize > 0)
            {
                posList.push({px:_px , py:_py});
            }
        }
    }

    public dispose():void {
        super.dispose();
    }

}