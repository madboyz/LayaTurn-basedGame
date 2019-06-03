


// import Sprite = laya.display.Sprite;
// import Handler = laya.utils.Handler;
// import Texture = laya.resource.Texture;
// import { TouchLayer } from "./layer/TouchLayer";
// import { World } from "./World";

// export class Map {

// 	// 出错加载次数
// 	private static Max_Error_Load = 3;

// 	private _tileW = 256;
// 	private _tileH = 256;
// 	private _colsCount: number;
// 	private _rowsCount: number;
// 	public width: number;
// 	public height: number;
// 	private _id: number;
// 	private _callBack: Function;
// 	private world: World;
// 	public mapLayer: Sprite;

// 	// 当前起始行列索引
// 	private _startCols: number;
// 	private _startRows: number;
// 	// 一屏所需切图行列数
// 	private _colsArea: number;
// 	private _rowsArea: number;
// 	// 最大需要纹理数
// 	private _maxTile: number;


// 	private _texturePool: any;
// 	private _smallTexture: Texture;
// 	private _smallUrl: string;
// 	private _smallTileW: number;
// 	private _smallTileH: number;
// 	private _loadErrorNum: number;

// 	private _tileUrlList: Array<string>;
// 	private _tempNowLoad: any;
// 	private _posFlush: Array<any>;
// 	private _modBuffer: boolean;

// 	public constructor(world: World) {
// 		this.mapLayer = world.mapLayer;
// 		this._texturePool = {};
// 		this.world = world;
// 	}

// 	public initMap(id, w, h) {
// 		if (this._id && id == this._id) { return; }
// 		this.reset();
// 		this._id = id;

// 		this.width = w;
// 		this.height = h;
// 		this._rowsCount = Math.floor(w / this._tileW);
// 		this._colsCount = Math.floor(h / this._tileH);
// 		this._id = id;
// 		this._colsArea = Math.floor(GameConfig.SCREEN_HEIGHT / this._tileH) + 2;
// 		this._rowsArea = Math.floor(GameConfig.SCREEN_WIDTH / this._tileW) + 2;
// 		this._maxTile = this._colsArea * this._rowsArea;
// 		let endCols = Math.min(this._colsCount, this._colsArea);
// 		let endRows = Math.min(this._rowsCount, this._rowsArea);
// 		this._smallUrl = ResUtils.getMapSmallUrl(id);
// 		this.initTouch();

// 		Laya.loader.load(this._smallUrl, Handler.create(this, this.onSmallComplete));


// 	}


// 	private initTouch() {

// 		let touchLayer: TouchLayer = this.world.touchLayer;
// 		if (touchLayer) {
// 			touchLayer.width = this.width;
// 			touchLayer.height = this.height;
// 		}
// 		// touchLayer.graphics.clear();
// 		// touchLayer.alpha = 0
// 		// touchLayer.graphics.alpha(0);
// 		// touchLayer.graphics.drawRect(0, 0, GameConfig.SCREEN_WIDTH, GameConfig.SCREEN_HEIGHT, 0);

// 		// touchLayer.init();
// 	}

// 	public render(flush?: boolean) {

// 		if (this.world && this._smallTexture) {
// 			let cols: number = Math.floor(this.world.camera.originY / this._tileH);
// 			let rows: number = Math.floor(this.world.camera.originX / this._tileW);
// 			this.makeData(cols, rows, flush);
// 			if (this._startCols == cols && this._startRows == rows && this._posFlush != null) {
// 				this.mapLayer.x = - this.world.camera.originX % this._tileW;
// 				this.mapLayer.y = -this.world.camera.originY % this._tileH;

// 			}
// 		}
// 	}

// 	public resize() {

// 	}


// 	public reset() {

// 		this._loadErrorNum = 0;
// 		this._texturePool = {};
// 		this._startCols = -1;
// 		this._rowsArea = 0;
// 		this._startRows = -1;
// 		this._colsArea = 0;
// 		this._callBack = null;

// 		this._maxTile = 0;

// 		if (this._smallUrl) {
// 			Laya.loader.clearRes(this._smallUrl, true);
// 		}
// 		this._smallTexture = null;

// 		if (this._tileUrlList) {
// 			while (this._tileUrlList.length > 0) {
// 				Laya.loader.clearRes(this._tileUrlList.pop(), true);
// 			}
// 		}
// 		this.mapLayer.graphics.clear();

// 	}

// 	/**
// 	 * 
// 	 * @param texture 小图资源
// 	 */
// 	private onSmallComplete(texture: Texture) {

// 		if (texture == null) {
// 			this._loadErrorNum++;
// 			console.log(`load small error id = ${this._id}`);
// 			if (this._loadErrorNum < Map.Max_Error_Load) {
// 				Laya.loader.load(this._smallUrl, Handler.create(this, this.onSmallComplete));
// 			} else {
// 				throw Error(`load small error id = ${this._id}`);
// 			}

// 		} else {
// 			this._loadErrorNum = 0;
// 			this._smallTexture = texture;
// 			this._smallTileW = Math.ceil(texture.width / this._rowsCount);
// 			this._smallTileH = Math.ceil(texture.height / this._colsCount);

// 			let startCols = 0;
// 			let startRows = 0;
// 			this.world.onMapReady();
// 			this.render();
// 		}
// 	}


// 	private makeData(cols: number, rows: number, flush: boolean = false): void {
// 		if (this._modBuffer) {
// 			this._modBuffer = false;
// 		}
// 		if (this._startCols == cols && this._startRows == rows) {
// 			return;
// 		}

// 		this._startCols = cols;
// 		this._startRows = rows;
// 		this._posFlush = [];

// 		let max_y: number = Math.min(rows + this._rowsArea, this._rowsCount);
// 		let max_x: number = Math.min(cols + this._colsArea, this._colsCount);
// 		let name: string;
// 		let data: any;

// 		for (let x: number = cols; x < max_x; x++) {
// 			for (let y: number = rows; y < max_y; y++) {
// 				name = x + '_' + y;
// 				if (x >= 0 && y >= 0) {
// 					if (this._texturePool[name]) {
// 						this.fillTile((x - this._startCols), (y - this._startRows), this._texturePool[name]);
// 					} else {
// 						data = { x: x, y: y, cols: this._startCols, rows: this._startRows, id: this._id }
// 						this._posFlush.push(data);
// 						this.fillSmallMap(x, y, (x - this._startCols), (y - this._startRows));
// 					}
// 				}

// 			}
// 		}
// 		this.loadTiles();
// 	}


// 	private loadTiles(texture: Texture = null): void {
// 		if (texture != null) {
// 			let pos = this._tempNowLoad;
// 			if (!pos || pos["id"] != this._id) {
// 				return;
// 			}
// 			let key: string = pos["x"] + "_" + pos["y"];
// 			if (this._texturePool[key] == null) {
// 				this._texturePool[key] = texture;
// 			}

// 			let tx: number = parseInt(pos["x"]) - this._startCols;
// 			let ty: number = parseInt(pos["y"]) - this._startRows;
// 			if (pos["cols"] === this._startCols && pos["rows"] === this._startRows) {
// 				this.fillTile(tx, ty, texture);
// 			}

// 			this._tempNowLoad = null;
// 		}

// 		if (this._posFlush.length == 0) {
// 			this._modBuffer = true;
// 			return;
// 		} else if (!this._tempNowLoad) {
// 			this._tempNowLoad = this._posFlush.pop();
// 			let pos = this._tempNowLoad;
// 			let url: string = ResUtils.getMapTileUrl(this._id, pos["x"], pos["y"]);
// 			this._tileUrlList = this._tileUrlList || [];
// 			this._tileUrlList.push(url);
// 			Laya.loader.load(url, Handler.create(this, this.loadTiles));
// 		}
// 	}

// 	private getSmallTexture(colsIndex, rowIndex): Texture {
// 		let t: Texture = Texture.create(this._smallTexture, rowIndex * this._smallTileW,
// 			colsIndex * this._smallTileH, this._smallTileW, this._smallTileH);

// 		t.width = this._tileW;
// 		t.height = this._tileH;
// 		return t;
// 	}


// 	/**
// 	 * 
// 	 * @param startx  切图索引
// 	 * @param starty  
// 	 * @param tx  位置索引 
// 	 * @param ty 
// 	 */
// 	private fillSmallMap(startx: number, starty: number, tx: number, ty: number): void {

// 		let texture: Texture = this.getSmallTexture(startx, starty);
// 		this.fillTile(tx, ty, texture);
// 	}


// 	private fillTile(tx: number, ty: number, texture: Texture): void {
// 		let arr = this.mapLayer.graphics.cmds;
// 		let x = ty * this._tileW;
// 		let y = tx * this._tileH;
// 		if (arr && arr.length > this._maxTile) {
// 			for (let i = arr.length - 1; i >= 0; i--) {
// 				if (arr[i][1] == x && arr[i][2] == y) {
// 					arr.splice(i, 1);
// 				}
// 			}
// 		}
// 		this.mapLayer.graphics.drawTexture(texture, x, y);
// 	}


// 	public destroy() {
// 		this.reset();
// 	}
// }
