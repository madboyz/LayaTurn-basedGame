

/**
 * 层级
 */
export abstract class BaseLayer extends Laya.Sprite {

    public update() { }
    public clear() {
        while (this.numChildren) {
            var node:Laya.Node = this._childs.pop();
            node.destroy();
        }
    }
}



