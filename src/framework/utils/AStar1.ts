export module wk {

	// 寻路方向
	export enum WorkMode {
		D4 = 4,
		D8 = 8
	}

	export enum NodeValue {

		MT_None = 0,//行走区
		MT_Obstacle = 1,//障碍区
		MT_Shade = 2,//遮挡区
		MT_Danger = 3,//雷区
		MT_Safe = 4,//安全区
		MT_Ring = 5,//擂台区
	}

	export class SilzAstar {

		/**
		 * 寻路方式，8方向和4方向，有效值为8和4
		 */
		private static Mode: number = WorkMode.D4;

		public _grid: Grid;
		private _index: number;
		private _path: Array<any>;
		private _astar: AStar1;


		public constructor() { }

		public set WORKMODE(v: number) {
			if (v != WorkMode.D4 && v != WorkMode.D8) throw new Error('仅支持8方向或4方向寻路');
		}

		/**
		 * 寻路
		 * @param        xnow    当前坐标X(寻路格子坐标)
		 * @param        ynow    当前坐标Y(寻路格子坐标)
		 * @param        xpos    目标点X(寻路格子坐标)
		 * @param        ypos    目标点Y(寻路格子坐标)
		 */
		public find(xnow: number, ynow: number, xpos: number, ypos: number): Array<any> {


			xpos = Math.min(xpos, this._grid.numCols - 1);
			ypos = Math.min(ypos, this._grid.numRows - 1);

			xpos = Math.max(xpos, 0);
			ypos = Math.max(ypos, 0);

			// 超出寻路范围
			if (!this._grid.nodeValuable(xpos, ypos)) {
				return null
			};

			this._grid.setEndNode(xpos, ypos);

			xnow = Math.min(xnow, this._grid.numCols - 1);
			ynow = Math.min(ynow, this._grid.numRows - 1);

			xnow = Math.max(xnow, 0);
			ynow = Math.max(ynow, 0);

			if (!this._grid.nodeValuable(xnow, ynow)) {
				return null;
			};

			this._grid.setStartNode(xnow, ynow);

			if (this._astar.findPath()) {
				this._index = 0;

				this._astar.floyd();

				this._path = this._astar.floydPath;
				return this._path;
			}
			return null;
		}

		public makeGrid(data: Array<any>, rows: number, cols: number, len: number, mapId: string): void {
			this._grid = new Grid();
			this._grid['_numCols'] = rows * len;
			this._grid['_numRows'] = cols * len;
			var nodes: any = this._grid["_nodes"];
			var arr: Array<any> = [];
			for (var i: number = cols - 1; i >= 0; --i) {
				for (var j: number = rows - 1; j >= 0; --j) {
					var index = ((i + 1) * rows - (j + 1));
					var grid: number[] = data[`${mapId}_${index}`][0].Grid;
					for (var k: number = len - 1; k >= 0; k--) {
						var nums1: number[] = grid.splice(k * len, len);
						for (var g: number = 0; g < nums1.length; g++) {
							var x: number = (rows - j - 1) * len + g;
							var y: number = (cols - i - 1) * len + (len - k - 1);
							if (!nodes[x]) nodes[x] = [];
							var node = nodes[x][y] = new SilzAstarNode(x, y);
							// MT_None = 0,//行走区
							// MT_Obstacle = 1,//障碍区
							// MT_Shade = 2,//遮挡区
							// MT_Danger = 3,//雷区
							// MT_Safe = 4,//安全区
							// MT_Ring = 5,//擂台区

							node.walkable = this.getValue(nums1[g], NodeValue.MT_Obstacle) != NodeValue.MT_Obstacle;//(nums1[g] != NodeValue.MT_Obstacle && nums1[g] != NodeValue.MT_Danger);
							node.alphable = this.getValue(nums1[g], NodeValue.MT_Shade) == NodeValue.MT_Shade;
							node.danger = this.getValue(nums1[g], NodeValue.MT_Danger) == NodeValue.MT_Danger;
							node.safe = this.getValue(nums1[g], NodeValue.MT_Safe) == NodeValue.MT_Safe;
							node.ring = this.getValue(nums1[g], NodeValue.MT_Ring) == NodeValue.MT_Ring;

							// this._grid.setWalkable(x, y, nums1[g] != NodeValue.MT_Obstacle);
						}
						// this._grid.setWalkable(x, y, data[x][y] != WKNodeValue.Forbid);
						// this._grid.setAlphable(x, y, data[x][y] == WKNodeValue.Alphable);
						// this._grid.setWalkType(x,y,data[x][y]);
					}
				}
			}
			if (SilzAstar.Mode == WorkMode.D4) {
				this._grid.calculateLinks();
			}
			else {
				this._grid.calculateLinks(1);
			}
			this._astar = new AStar1(this._grid);
		}

		private getValue(data: number, value: number): number {
			return data & value;
		}

	}


	class AStar1 {

		private _open: BinaryHeap;
		private _grid: Grid;
		private _endNode: SilzAstarNode;
		private _startNode: SilzAstarNode;
		private _path: Array<any>;
		private _floydPath: Array<any>;
		// 启发式函数
		public heuristic: Function;
		private _straightCost: number = 1.0;
		private _diagCost: number = Math.SQRT2;
		private nowversion: number = 1;


		public constructor(grid: Grid) {
			this._grid = grid;
			this.heuristic = this.euclidian2;

		}

		private justMin(x: any, y: any): boolean {
			return x.f < y.f;
		}

		public findPath(): boolean {
			this._endNode = this._grid.endNode;
			this.nowversion++;
			this._startNode = this._grid.startNode;
			this._open = new BinaryHeap(this.justMin);
			this._startNode.g = 0;
			return this.search();
		}

		public floyd(): void {
			if (this.path == null)
				return;

			this._floydPath = this.path.concat();
			let len: number = this._floydPath.length;

			if (len > 2) {
				var vector: SilzAstarNode = new SilzAstarNode(0, 0);
				var tempVector: SilzAstarNode = new SilzAstarNode(0, 0);

				this.floydVector(vector, this._floydPath[len - 1], this._floydPath[len - 2]);

				for (var i: number = this._floydPath.length - 3; i >= 0; i--) {

					this.floydVector(tempVector, this._floydPath[i + 1], this._floydPath[i]);
					if (vector.x == tempVector.x && vector.y == tempVector.y) {
						this._floydPath.splice(i + 1, 1);
					} else {
						vector.x = tempVector.x;
						vector.y = tempVector.y;
					}
				}
			}

			len = this._floydPath.length;
			for (i = len - 1; i >= 0; i--) {
				for (var j: number = 0; j <= i - 2; j++) {

					if (this.floydCrossAble(this._floydPath[i], this._floydPath[j])) {

						for (var k: number = i - 1; k > j; k--) {
							this._floydPath.splice(k, 1);
						}
						i = j;
						len = this._floydPath.length;
						break;
					}
				}
			}
		}

		private floydCrossAble(n1: SilzAstarNode, n2: SilzAstarNode): boolean {

			var ps: Array<any> = this.bresenhamNodes(new Laya.Point(n1.x, n1.y), new Laya.Point(n2.x, n2.y));
			for (var i: number = ps.length - 2; i > 0; i--) {

				if (!this._grid.getNode(ps[i].x, ps[i].y).walkable) {
					return false;
				}
			}
			return true;
		}

		private bresenhamNodes(p1: Laya.Point, p2: Laya.Point): Array<any> {

			var steep: boolean = Math.abs(p2.y - p1.y) > Math.abs(p2.x - p1.x);
			if (steep) {
				var temp: number = p1.x;
				p1.x = p1.y;
				p1.y = temp;
				temp = p2.x;
				p2.x = p2.y;
				p2.y = temp;
			}
			var stepX: number = p2.x > p1.x ? 1 : (p2.x < p1.x ? -1 : 0);
			var stepY: number = p2.y > p1.y ? 1 : (p2.y < p1.y ? -1 : 0);
			var deltay: number = (p2.y - p1.y) / Math.abs(p2.x - p1.x);
			var ret: Array<any> = [];
			var nowX: number = p1.x + stepX;
			var nowY: number = p1.y + deltay;
			if (steep) {
				ret.push(new Laya.Point(p1.y, p1.x));
			} else {
				ret.push(new Laya.Point(p1.x, p1.y));
			}
			while (nowX != p2.x) {
				var fy: number = Math.floor(nowY)
				var cy: number = Math.ceil(nowY);
				if (steep) {
					ret.push(new Laya.Point(fy, nowX));
				} else {
					ret.push(new Laya.Point(nowX, fy));
				}
				if (fy != cy) {
					if (steep) {
						ret.push(new Laya.Point(cy, nowX));
					} else {
						ret.push(new Laya.Point(nowX, cy));
					}
				}
				nowX += stepX;
				nowY += deltay;
			}
			if (steep) {
				ret.push(new Laya.Point(p2.y, p2.x));
			} else {
				ret.push(new Laya.Point(p2.x, p2.y));
			}
			return ret;
		}

		private floydVector(target: SilzAstarNode, n1: SilzAstarNode, n2: SilzAstarNode): void {
			target.x = n1.x - n2.x;
			target.y = n1.y - n2.y;
		}

		public search(): boolean {
			var node: SilzAstarNode = this._startNode;
			node.version = this.nowversion;
			while (node != this._endNode) {
				var len: number = node.links.length;
				for (var i: number = 0; i < len; i++) {
					var test: SilzAstarNode = node.links[i].node;
					var cost: number = node.links[i].cost;
					var g: number = node.g + cost;
					var h: number = this.heuristic(test);
					var f: number = g + h;
					if (test.version == this.nowversion) {
						if (test.f > f) {
							test.f = f;
							test.g = g;
							test.h = h;
							test.parent = node;
						}
					} else {
						test.f = f;
						test.g = g;
						test.h = h;
						test.parent = node;
						this._open.ins(test);
						test.version = this.nowversion;
					}

				}
				if (this._open.a.length == 1) {
					return false;
				}
				node = <SilzAstarNode><any>(this._open.pop());
			}
			this.buildPath();
			return true;
		}

		private buildPath(): void {
			this._path = [];
			var node: SilzAstarNode = this._endNode;
			this._path.push(node);
			while (node != this._startNode) {
				node = node.parent;
				this._path.unshift(node);
			}
		}

		public get path(): Array<any> {
			return this._path;
		}

		public get floydPath(): Array<any> {
			return this._floydPath;
		}

		public manhattan(node: SilzAstarNode): number {
			return Math.abs(node.x - this._endNode.x) + Math.abs(node.y - this._endNode.y);
		}

		public manhattan2(node: SilzAstarNode): number {
			var dx: number = Math.abs(node.x - this._endNode.x);
			var dy: number = Math.abs(node.y - this._endNode.y);
			return dx + dy + Math.abs(dx - dy) / 1000;
		}

		public euclidian(node: SilzAstarNode): number {
			var dx: number = node.x - this._endNode.x;
			var dy: number = node.y - this._endNode.y;
			return Math.sqrt(dx * dx + dy * dy);
		}

		private TwoOneTwoZero: number = 2 * Math.cos(Math.PI / 3);

		public chineseCheckersEuclidian2(node: SilzAstarNode): number {
			var y: number = node.y / this.TwoOneTwoZero;
			var x: number = node.x + node.y / 2;
			var dx: number = x - this._endNode.x - this._endNode.y / 2;
			var dy: number = y - this._endNode.y / this.TwoOneTwoZero;
			return this.sqrt(dx * dx + dy * dy);
		}

		private sqrt(x: number): number {
			return Math.sqrt(x);
		}

		public euclidian2(node: SilzAstarNode): number {
			var dx: number = node.x - this._endNode.x;
			var dy: number = node.y - this._endNode.y;
			return dx * dx + dy * dy;
		}

		public diagonal(node: SilzAstarNode): number {
			var dx: number = Math.abs(node.x - this._endNode.x);
			var dy: number = Math.abs(node.y - this._endNode.y);
			var diag: number = Math.min(dx, dy);
			var straight: number = dx + dy;
			return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
		}
	}

	class BinaryHeap {
		public a: Array<any> = [];
		public justMinFun: Function = function (x: any, y: any): boolean {
			return this.x < this.y;
		};

		public constructor(justMinFun: Function = null) {
			this.a.push(-1);
			if (justMinFun != null)
				this.justMinFun = justMinFun;
		}

		public ins(value: any): void {
			var p: number = this.a.length;
			this.a[p] = value;
			var pp: number = p >> 1;
			while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
				var temp: any = this.a[p];
				this.a[p] = this.a[pp];
				this.a[pp] = temp;
				p = pp;
				pp = p >> 1;
			}
		}

		public pop(): any {

			var min: any = this.a[1];
			this.a[1] = this.a[this.a.length - 1];
			this.a.pop();
			var p: number = 1;
			var l: number = this.a.length;
			var sp1: number = p << 1;
			var sp2: number = sp1 + 1;
			while (sp1 < l) {
				if (sp2 < l) {
					var minp: number = this.justMinFun(this.a[sp2], this.a[sp1]) ? sp2 : sp1;
				} else {
					minp = sp1;
				}
				if (this.justMinFun(this.a[minp], this.a[p])) {
					var temp: any = this.a[p];
					this.a[p] = this.a[minp];
					this.a[minp] = temp;
					p = minp;
					sp1 = p << 1;
					sp2 = sp1 + 1;
				} else {
					break;
				}
			}
			return min;
		}
	}

	class Grid {


		private _startNode: SilzAstarNode;
		private _endNode: SilzAstarNode;
		private _nodes: Array<any>;
		private _numCols: number;
		private _numRows: number;

		private type: number;

		private _straightCost: number = 1.0;
		private _diagCost: number = Math.SQRT2;

		public constructor() {
			// this._numCols = numCols;
			// this._numRows = numRows;
			this._nodes = new Array<any>();

			// for (var x: number = 0; x < numCols; x++) {
			// 	this._nodes[x] = new Array<any>();
			// 	for (var y: number = 0; y < numRows; y++) {
			// 		this._nodes[x][y] = new SilzAstarNode(x, y);
			// 	}
			// }
		}

		/**
		 *
		 * @param   type    0四方向 1八方向 2跳棋
		 */
		public calculateLinks(type: number = 0): void {
			this.type = type;
			for (let i: number = 0; i < this._numCols; i++) {
				for (let j: number = 0; j < this._numRows; j++) {
					this.initNodeLink(this._nodes[i][j], type);
				}
			}
		}

		public getType(): number {
			return this.type;
		}

		/**
		 *
		 * @param   node
		 * @param   type    1八方向 0四方向 2跳棋
		 */
		private initNodeLink(node: SilzAstarNode, type: number): void {
			let startX: number = Math.max(0, node.x - 1);
			let endX: number = Math.min(this.numCols - 1, node.x + 1);

			let startY: number = Math.max(0, node.y - 1);
			let endY: number = Math.min(this.numRows - 1, node.y + 1);

			node.links = [];

			for (let x: number = startX; x <= endX; x++) {
				for (let y: number = startY; y <= endY; y++) {
					let test: SilzAstarNode = this.getNode(x, y);
					if (test == node || !test.walkable) {
						continue;
					}
					if (type != 2 && x != node.x && y != node.y) {
						let test2: SilzAstarNode = this.getNode(node.x, y);
						if (!test2.walkable) {
							continue;
						}
						test2 = this.getNode(x, node.y);
						if (!test2.walkable) {
							continue;
						}
					}
					let cost: number = this._straightCost;
					if (!((node.x == test.x) || (node.y == test.y))) {
						if (type == 1) {
							continue;
						}
						if (type == 2 && (node.x - test.x) * (node.y - test.y) == 1) {
							continue;
						}
						if (type == 2) {
							cost = this._straightCost;
						} else {
							cost = this._diagCost;
						}
					}
					node.links.push(new Link(test, cost));
				}
			}
		}

		public nodeValuable(x: number, y: number): boolean {
			if (!this._nodes || !this._nodes[x] || !this._nodes[x][y]) return false;
			return true;
		}

		public getNode(x: number, y: number): SilzAstarNode {
			return this._nodes[x][y];
		}

		public setEndNode(x: number, y: number): void {
			this._endNode = this._nodes[x][y];
		}

		public setStartNode(x: number, y: number): void {
			this._startNode = this._nodes[x][y];
		}

		public setWalkable(x: number, y: number, value: boolean): void {
			this._nodes[x][y].walkable = value;
		}

		public setAlphable(x: number, y: number, value: boolean) {
			this._nodes[x][y].alphable = value;
		}


		public setWalkType(x, y, type): any {
			this._nodes[x][y].walkType = type;
		}

		public get endNode(): SilzAstarNode {
			return this._endNode;
		}

		public get numCols(): number {
			return this._numCols;
		}

		public get numRows(): number {
			return this._numRows;
		}

		public get startNode(): SilzAstarNode {
			return this._startNode;
		}

	}

	class Link {
		public node: SilzAstarNode;
		public cost: number;

		public constructor(node: SilzAstarNode, cost: number) {
			this.node = node;
			this.cost = cost;
		}

	}

	class SilzAstarNode {
		public x: number;
		public y: number;
		public f: number;
		public g: number;
		public h: number;
		// 路径点
		public walkable: boolean = true;
		// 透明节点
		public alphable: boolean = false;
		//雷区
		public danger: boolean = false;
		//安全区
		public safe: boolean = false;
		//擂台区
		public ring: boolean = false;
		public walkType: number;

		public parent: SilzAstarNode;
		public version: number = 1;
		public links: Array<any>;

		public constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		public toString(): string {
			return "x:" + this.x + " y:" + this.y;
		}
	}
}