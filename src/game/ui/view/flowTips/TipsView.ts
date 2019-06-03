import { GameLayer } from "../../../../GameLayer";
import { TipsItem } from "./TipsItem";


export class FlowTipsView extends Laya.Sprite {
	private maxNum: number = 15;

	private _canvas: Laya.Sprite;
	private tipsList: Array<TipsItem> = [];
	private doingHide: boolean = false;
	private hadNewData: boolean = false;
	private inputLooping: boolean = false;
	private inputStrList = [];


	constructor() {
		super();
		this.showMsgImpl();
		this.maxNum = Math.floor(Laya.stage.height / 2 / 40) + 1;
	}

	showMsg(str: string, color = "#fffc00"): void {
		this.inputStrList.push([str, color]);
		if(!this.inputLooping){
			this.inputLooping = true;
			this.timer.loop(100, this, this.inputData);
		}
	}

	private inputData(): void {
		if (this.inputStrList.length > 0) {
			var data = this.inputStrList.shift();
			this.toShowMsg(data[0], data[1]);
		} else {
			this.inputLooping = false;
			this.timer.clear(this, this.inputData);
		}
	}

	private toShowMsg(str: string, color = "#fffc00"): void {
		this.hadNewData = true;
		this.doingHide = false;
		var item: TipsItem = Laya.Pool.getItemByClass("TipsItem", TipsItem);
		item.alpha = 1;
		item.updateData(str, color);
		this.addChild(item);
		this.tipsList.push(item);
		if (this.tipsList.length > this.maxNum) {
			//超过了最大，第一个去掉
			var hideItem = this.tipsList.shift();
			hideItem.removeSelf();
			Laya.Pool.recover("TipsItem", hideItem);
			// hideItem.destroy();
		}
		this.showMsgImpl();
	}


	private showMsgImpl(): void {
		if (!this.parent) {
			if (!this._canvas) {
				this._canvas = GameLayer.instacne.uiLayer;
			}
			this._canvas.addChild(this);
			this.stageResize();
		}
		else {
			this._canvas.setChildIndex(this, this._canvas.numChildren - 1);
		}
		this.updateLayOut();
	}

	private updateLayOut(): void {
		if (this.tipsList.length <= 0) {
			return;
		}
		for (let i = 0; i < this.tipsList.length; i++) {
			var index = this.tipsList.length - 1 - i;
			var item = this.tipsList[index];
			item.y = -40 * i;
		}
		this.doHide();
	}

	private doHide(): void {
		if (this.hadNewData) {
			this.timer.once(1000, this, this.loopHide);
		} else {
			this.loopHide();
		}
	}

	private stageResize(): void {
		if (this.parent) {
			this.y = Laya.stage.height / 2;
		}
	}

	private loopHide(): void {
		if (this.doingHide || this.tipsList.length <= 0) {
			return;
		}
		this.doingHide = true;
		this.hadNewData = false;
		var item = this.tipsList[0];
		Laya.Tween.to(item, { alpha: 0 }, 100, Laya.Ease.sineIn, Laya.Handler.create(this, () => {
			item.removeSelf();
			var index = this.tipsList.indexOf(item);
			if (index >= 0) {
				this.tipsList.splice(index, 1);
				Laya.Pool.recover("TipsItem", item);
				// item.destroy();
			}
			this.doingHide = false;
			this.doHide();
		}));
	}

	// private hideOver(): void {
	// 	this.doingHide = false;
	// 	this.loopHide();
	// }

}