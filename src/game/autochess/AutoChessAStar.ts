/**
 * 用于自走棋格子a星算法
 * 与目前场景的a星不同之处在
 * 1.不能斜着走
 * 2.自走棋目标单位移动至动态的所以不可行走格子也为动态
 * 3.只用4个方向
 */
export class AutoChessAStar
{
    private _open:Array<any>;               //待考察表
    private _closed:Array<any>;             //已考察表
    private _grid:AutoChessGrid;               //网格
    private _endNode:AutoChessNode;                  //终点Node
    private _startNode:AutoChessNode;                //起点Node
    private _path:Array<any>;               //保存路径
    private _heuristic:Function;            //寻路算法
    private _straightCost:number = 1.0;     //上下左右走的代价
    private _diagCost:number = Math.SQRT2;  //斜着走的代价 
    
    
    public constructor()
    {    
        //this._heuristic = this.manhattan;  
        //this._heuristic = this.euclidian;
        this._heuristic = this.diagonal;
    }
    
    //寻路
    public findPath(grid:AutoChessGrid):boolean
    {
        this._grid = grid;
        this._open = [];
        this._closed = [];
        
        this._startNode = this._grid.startNode;
        this._endNode = this._grid.endNode;
        
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        
        return this.search();
    }
    
    //查找路径
    public search():boolean
    {
        var node:AutoChessNode = this._startNode;
        while(node != this._endNode)
        {
            var startX = Math.max(0, node.x - 1);
            var endX = Math.min(this._grid.numCols - 1, node.x + 1);
            var startY = Math.max(0, node.y - 1);
            var endY = Math.min(this._grid.numRows - 1, node.y + 1);
            
            for(var i = startX; i <= endX; i++)
            {
                for(var j = startY; j <= endY; j++)
                {    
                    //不让斜着走
                    if(i != node.x && j != node.y){
                        continue;
                    }

                    var test:AutoChessNode = this._grid.getNode(i, j);
                    if(test == node || 
                        !test.walkable ||
                        !this._grid.getNode(node.x, test.y).walkable ||
                        !this._grid.getNode(test.x, node.y).walkable)
                    {
                        continue;
                    }
                    
                    var cost:number = this._straightCost;
                    if(!((node.x == test.x) || (node.y == test.y)))
                    {
                        cost = this._diagCost;
                    }
                    var g = node.g + cost * test.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if(this.isOpen(test) || this.isClosed(test))
                    {
                        if(test.f > f)
                        {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else
                    {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                }
            }
            for(var o = 0; o < this._open.length; o++)
            {
            }
            this._closed.push(node);
            if(this._open.length == 0)
            {
                console.log("AStar >> no path found");
                return false
            }
            
            let openLen = this._open.length;
            for(let m=0;m<openLen;m++){
                for(let n=m+1;n<openLen;n++){
                    if(this._open[m].f > this._open[n].f){
                        let temp = this._open[m];
                        this._open[m] = this._open[n];
                        this._open[n] = temp;
                    }
                }
            }

            node = this._open.shift() as AutoChessNode;
        }
        this.buildPath();
        return true;
    }
    
    //获取路径
    private buildPath():void
    {
        this._path = new Array();
        var node:AutoChessNode = this._endNode;
        this._path.push(node);
        while(node != this._startNode)
        {
            node = node.parent;
            this._path.unshift(node);
        }
        this._path.shift();//提出开始
    }
    
    public get path()
    {
        return this._path;
    }
    
    //是否待检查
    private isOpen(node:AutoChessNode):boolean
    {
        for(var i = 0; i < this._open.length; i++)
        {
            if(this._open[i] == node)
            {
                return true;
            }
        }
        return false;
    }
    
    //是否已检查
    private isClosed(node:AutoChessNode):boolean
    {
        for(var i = 0; i < this._closed.length; i++)
        {
            if(this._closed[i] == node)
            {
                return true;
            }
        }
        return false;
    }
    
    //曼哈顿算法
    private manhattan(node:AutoChessNode)
    {
        return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
    }
    

    private euclidian(node:AutoChessNode)
    {
        var dx = node.x - this._endNode.x;
        var dy = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    }
    
    private diagonal(node:AutoChessNode)
    {
        var dx = Math.abs(node.x - this._endNode.x);
        var dy = Math.abs(node.y - this._endNode.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    }
    
    public get visited()
    {
        return this._closed.concat(this._open);
    }
}


export  class AutoChessGrid {
    private _startNode:AutoChessNode;    //起点
    private _endNode:AutoChessNode;      //终点
    private _nodes:Array<any>;  //Node数组
    private _numCols:number;    //网格行列
    private _numRows:number;

    public constructor(numCols:number, numRows:number) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = [];

        for(let i:number=0;i<numCols;i++){
            this._nodes[i] = [];
            for(let j:number=0;j<numRows;j++){
                this._nodes[i][j] = new AutoChessNode(i,j);
            }
        }
    }

    public getNode(x:number , y:number):AutoChessNode{
        return this._nodes[x][y];
    }

    public setEndNode(x:number, y:number){
        this._endNode = this._nodes[x][y];
    }

    public setStartNode(x:number, y:number){
        this._startNode = this._nodes[x][y];
    }

    public setWalkable(x:number, y:number, value:boolean){
        this._nodes[x][y].walkable = value;
    }

    public get endNode(){
        return this._endNode;
    }

    public get numCols(){
        return this._numCols;
    }

    public get numRows(){
        return this._numRows;
    }

    public get startNode(){
        return this._startNode;
    }
}

export class AutoChessNode {
    public x:number;    //列
    public y:number;    //行
    public f:number;    //代价 f = g+h
    public g:number;    //起点到当前点代价
    public h:number;    //当前点到终点估计代价
    public walkable:boolean = true;
    public parent:AutoChessNode;
    public costMultiplier:number = 1.0;

    public constructor(x:number , y:number) {
        this.x = x;
        this.y = y;
    }
}