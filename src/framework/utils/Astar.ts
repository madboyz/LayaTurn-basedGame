import { wk } from "./AStar1";


export class Astar {

    private silzAstar: wk.SilzAstar
    constructor() {
        this.silzAstar = new wk.SilzAstar;
    }

    private static mInstance: Astar;
    public static get instance(): Astar {
        return Astar.mInstance || (Astar.mInstance = new Astar());
    }
    public MapName:string;
    public MapSplitSize: number;
    public GridSize: number;
    public MapWidth: number;
    public MapHeight: number;
    public OrigMapWidth: number;
    public OrigMapHeight: number;
    public PIVOTY: number;
    public PIVOTX: number;
    public WalkPaths: Array<any>;//寻路路径点
    public TransferPoint:any;//地图传送中心点
    /**
     * 设置地图数据
     * 
     * @memberof Astar
     */
    public set data(data: any) {
        this.MapSplitSize = ~~data.MapSplitSize;
        this.GridSize = ~~data.GridSize;
        this.MapWidth = ~~data.MapWidth;
        this.MapHeight = ~~data.MapHeight;
        this.OrigMapWidth = this.MapWidth;
        this.OrigMapHeight = this.MapHeight;
        this.PIVOTY = this.MapSplitSize - (this.MapHeight - (Math.floor(this.MapHeight / this.MapSplitSize) * this.MapSplitSize));
        this.PIVOTX = this.MapSplitSize - (this.MapWidth - (Math.floor(this.MapWidth / this.MapSplitSize) * this.MapSplitSize));
        var row: number = Math.ceil(this.MapWidth / this.MapSplitSize);
        var col: number = Math.ceil(this.MapHeight / this.MapSplitSize);
        this.MapHeight = this.MapHeight + this.PIVOTY;
        this.MapWidth = this.MapWidth + this.PIVOTX;
        var mapId: string = data.SceneId;
        this.TransferPoint = null;
        this.MapName = data.MapName;
        if(data.TransferPoint != null)
        {
            this.TransferPoint = { x: data.TransferPoint[0], y: data.TransferPoint[1] };
        }
        var len: number = this.MapSplitSize / this.GridSize;
        this.silzAstar.makeGrid(data.SplitData, row, col, len, mapId);
        if(data.WalkPathCount != null)
        {
            
            if(this.WalkPaths == null)
            {
                this.WalkPaths = new Array<any>();
            }
            else
            {
                this.WalkPaths.splice(0,this.WalkPaths.length);
            }
        
            var WalkPathsCount:number = ~~data.WalkPathCount;
            for (let i = 1; i <= WalkPathsCount; i++) {
                const paths = data.WalkPaths[`path_${i}`];
                if(paths != null)
                {
                    var attr :Array<any> = new Array<any>();
                    for (let i = 0; i < paths.length; i++) {
                        const path = paths[i];
                        var _x = path[0] ;
                        var _y = this.MapHeight - path[1] ;
                        var point:any = { x: _x, y: _y };
                        attr.push(point);
                    }
                    this.WalkPaths.push(attr);
                }
            }
        }
    }

    public getGrid(): any {
        return this.silzAstar._grid;
    }



    /**
     * 获得一个路径
     * 
     * @param {number} xnow 
     * @param {number} ynow 
     * @param {number} xpos 
     * @param {number} ypos 
     * @param {number} [gridSize=16] 
     * @returns {Array<any>} 
     * @memberof Astar
     */
    public find(xnow: number, ynow: number, xpos: number, ypos: number, gridSize: number = 16): Array<any> {
        try {
            var road: any = this.silzAstar.find(Math.floor(xnow / gridSize), Math.floor(ynow / gridSize), Math.floor(xpos / gridSize), Math.floor(ypos / gridSize));
            var roads: Array<any> = [{ x: xnow, y: ynow }];
            var node: any;
            for (var i: number = 1; i < road.length; i++) {
                node = road[i];
                roads[i] = {};
                var curX: number = road[i].x * gridSize;
                var curY: number = road[i].y * gridSize;
                roads[i].x = curX;
                roads[i].y = curY;
                roads[i]['alphable'] = node.alphable;

            }
            roads[road.length - 1].x = xpos;
            roads[road.length - 1].y = ypos;
            if (roads.length > 1)
                roads.shift();
            return roads;
        } catch (e) {
            return null;
        }
    }
    /**
     * 判断当前格子能不能走
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} [gridSize=16] 
     * @returns {boolean} 
     * @memberof Astar
     */
    public isWalkable(x: number, y: number, gridSize: number = 16): boolean {
        try {
            var node = this.silzAstar._grid.getNode(Math.floor(x / gridSize), Math.floor(y / gridSize));
            return node.walkable;
        } catch (e) {
            return false;
        }
    }

    public walkType(x: number, y: number, gridSize: number = 16): number {
        try {
            var node = this.silzAstar._grid.getNode(Math.floor(x / gridSize), Math.floor(y / gridSize));
            return node.walkType;
        } catch (e) {
            return 0;
        }
    }

    /**
    * 判断当前格子是否是透明区
    * 
    * @param {number} x 
    * @param {number} y 
    * @param {number} [gridSize=16] 
    * @returns {boolean} 
    * @memberof Astar
    */
    public isAlpha(x: number, y: number, gridSize: number = 16): boolean {
        try {
            var node = this.silzAstar._grid.getNode(Math.floor(x / gridSize), Math.floor(y / gridSize));
            return node.alphable;
        } catch (e) {
            return false;
        }
    }
}