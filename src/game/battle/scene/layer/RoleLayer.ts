import { BaseLayer } from "./BaseLayer";
import { Role } from './../../role/Role';
import { Debug } from "../../../../debug/Debug";

export class RoleLayer extends BaseLayer {
    constructor() {
        super();
        this.initEvent();
    }

    private initEvent(): void {
        // this.on(Laya.Event.CLICK, this, onClick);
    }
    public update(): void {
        for (var i: number = 0; i < this.numChildren; i++) {
            var role: Role = this.getChildAt(i) as Role;
            if(!role)
            continue;
            role.loop();
        }
        //for (var i: number = 0; i < this.numChildren; i++) {
        //    var role: Role = this.getChildAt(i) as Role;
        //    this.sortChild(role, this._childs);
        //}
        
    }

    public setTop(role: Laya.Sprite)
    {
        var target: Role = this.getChildAt(this.numChildren - 1)as Role;
        if(!target) return
        var index = this.getChildIndex(role);
        this.setChildIndex(target,index); 
        this.setChildIndex(role,this.numChildren - 1); 
        
    }

    public sortChild(role: Laya.Sprite, arr: Array<any>, isBreak: Boolean = false): void {
        if(!role) return;
        var index: number = arr.indexOf(role);
        for (var i: number = 0; i < arr.length; i++) {
            if (role != arr[i] && role.y > arr[i].y + 2) {
                role.parent.setChildIndex(arr[i], index);
                role.parent.setChildIndex(role, i);
                if (isBreak) {
                    break;
                }
            }
        }
    }

    public clear(): void {
        super.clear();
    }

    public add(role: Role): void {
        this.addChild(role);
    }

    public remove(role: Role): void {
        role.dispose();
    }
}