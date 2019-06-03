import { S22001_1 } from "../../../../../../net/pt/pt_22";

export class TongtiantaRankItem extends ui.main.TongtiantaRankItemUI {
    private _isSelect: boolean = false;
    constructor() {
        super();
    }

    private mData: S22001_1;

    public set dataSource(data: S22001_1) {
        if (!data) return;
        this.mData = data;
        this.updateData();
    }

    private updateData(): void {
        if (this.mData.Rank % 2 != 0) {
            this.bg.visible = false;
        } else {
            this.bg.visible = true;
        }
        this.txt_rank.text = this.mData.Rank.toString();
        this.txt_name.text = this.mData.PlayerName;
        this.txt_num.text = this.mData.item_1[0].Value + "";
        this.txt_fight.text = this.mData.Bp + "";
        this.img_select.visible = this._isSelect;
    }

    public get dataSource(): S22001_1 {
        return this.mData;
    }

    public checkSelect(data: any): void {
        if (this.mData && data) {
            if (this.mData.PlayerId == data.PlayerId) {
                this._isSelect = true;
            } else {
                this._isSelect = false;
            }
        } else {
            this._isSelect = false;
        }
        this.isSelect = this._isSelect;
    }

    public set isSelect(value: boolean) {
        this.img_select.visible = value
    }

    public dispose(): void {

    }

    public removeSelf(): any {
        super.removeSelf();
    }
}