import { PetPanel } from './../panel/PetPanel';
import { PetProtocol } from './../protocol/PetProtocol';
import { SPetEvent, SPetData } from '../../../../../net/data/SPetData';
import { PetInfo } from '../../../compent/data/PetInfo';
import { SBagData, SGoodsEvent } from '../../../../../net/data/SBagData';
import { CommonControl } from '../../../../common/control/CommonControl';
export class PetControl extends BaseControl {
    private protocol:PetProtocol;
    constructor() {
        super();
        this.panel = new PetPanel();
        this.protocol = new PetProtocol();
        // this.initEvent();
    }

    public set panel(value: PetPanel) {
        this.mPanel = value;
    }

    public get panel(): PetPanel {
        return this.mPanel as PetPanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    public get getEvent(): Array<any> {
        return [NotityEvents.PET_SETTING_FIGHT];
    }
    public excuting(notity: NotityData): void {
        var event: any = notity.event;
        var data: any = notity.data;
        var funList: Function[] = [];

        funList[NotityEvents.PET_SETTING_FIGHT] = this.onSend17001;
        var fun: Function = funList[event];
        fun.call(this, notity.data);
    }

    private initEvent() {
        SPetData.instance.on(SPetEvent.PET_PETINFO_SUCCEFUL,this,this.onUpdatePetInfo);
        SPetData.instance.on(SPetEvent.PET_ACTIVE_SUCCEFUL,this,this.onUpdatePetInfo);
        SPetData.instance.on(SPetEvent.PET_FIGHTSTATE_SUCCEFUL,this,this.onUpdateListData);
        SPetData.instance.on(SPetEvent.PET_MAINPET_SUCCEFUL,this,this.onUpdateListData);
        SPetData.instance.on(SPetEvent.PET_PETEORDECHANGE_SUCCEFUL,this,this.onUpdateListData);
        SPetData.instance.on(SPetEvent.PET_PROPUPDATE,this,this.onUpdatePetData);
        SPetData.instance.on(SPetEvent.PET_ACTIVE_SUCCEFUL,this,this.onUpdatePetData);
        SPetData.instance.on(SPetEvent.PET_TRAIN_SUCCEFUL,this,this.onUpdateTrain);
        SPetData.instance.on(SPetEvent.PET_REFINE_SUCCEFUL,this,this.onUpdateRefine);
        SPetData.instance.on(SPetEvent.PET_UPDATE_PANEL_SELECT,this,this.onUpdatePanelSelect);
        SPetData.instance.on(SPetEvent.PET_EQUIP_REFRESH,this,this.onUpdatePetInfo);//宠物装备更新

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE,this,this.onUpdateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateCost);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD,this,this.onUpdateCost);

        this.panel.on(SPetEvent.PET_REQURST_ACTIVE,this,this.onSend32010);
        this.panel.on(SPetEvent.PET_REQUEST_PETINFO,this,this.onSend17009);
        this.panel.on(SPetEvent.PET_REQUEST_USEGODDS,this,this.onSend17018);
        this.panel.on(SPetEvent.PET_REQUEST_FIGHTSTATE,this,this.onSendChangeState);
        this.panel.on(SPetEvent.PET_REQUEST_TRAIN,this,this.onSend17015);
        this.panel.on(SPetEvent.PET_REQUEST_REFINE,this,this.onSend17040);
        this.panel.on(SPetEvent.PET_REQUEST_FORGETSKILL,this,this.onSend17036);
    }
    private removeEvent() {
        SPetData.instance.off(SPetEvent.PET_PETINFO_SUCCEFUL,this,this.onUpdatePetInfo);
        SPetData.instance.off(SPetEvent.PET_ACTIVE_SUCCEFUL,this,this.onUpdatePetInfo);
        SPetData.instance.off(SPetEvent.PET_FIGHTSTATE_SUCCEFUL,this,this.onUpdateListData);
        SPetData.instance.off(SPetEvent.PET_MAINPET_SUCCEFUL,this,this.onUpdateListData);
        SPetData.instance.off(SPetEvent.PET_PETEORDECHANGE_SUCCEFUL,this,this.onUpdateListData);
        SPetData.instance.off(SPetEvent.PET_PROPUPDATE,this,this.onUpdatePetData);
        SPetData.instance.off(SPetEvent.PET_ACTIVE_SUCCEFUL,this,this.onUpdatePetData);
        SPetData.instance.off(SPetEvent.PET_TRAIN_SUCCEFUL,this,this.onUpdateTrain);
        SPetData.instance.off(SPetEvent.PET_REFINE_SUCCEFUL,this,this.onUpdateRefine);
        SPetData.instance.off(SPetEvent.PET_UPDATE_PANEL_SELECT,this,this.onUpdatePanelSelect);
        SPetData.instance.off(SPetEvent.PET_EQUIP_REFRESH,this,this.onUpdatePetInfo);//宠物装备更新

        SBagData.instance.off(SGoodsEvent.GOODS_UPDATE,this,this.onUpdateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_REMOVE,this,this.onUpdateCost);
        SBagData.instance.off(SGoodsEvent.GOODS_ADD,this,this.onUpdateCost);

        this.panel.off(SPetEvent.PET_REQUEST_PETINFO,this,this.onSend17009);
        this.panel.off(SPetEvent.PET_REQURST_ACTIVE,this,this.onSend32010);
        this.panel.off(SPetEvent.PET_REQUEST_USEGODDS,this,this.onSend17018);
        this.panel.off(SPetEvent.PET_REQUEST_FIGHTSTATE,this,this.onSendChangeState);
        this.panel.off(SPetEvent.PET_REQUEST_TRAIN,this,this.onSend17015);
        this.panel.off(SPetEvent.PET_REQUEST_REFINE,this,this.onSend17040);
        this.panel.off(SPetEvent.PET_REQUEST_FORGETSKILL,this,this.onSend17036);
    }

    private onSendChangeState(obj:any):void
    {
        this.protocol.send17001(obj.id,obj.state);
        this.protocol.send17019(obj.id,obj.index);
    }

    private onSend17001():void
    {
        var arr:Array<PetInfo> = SPetData.instance.fightList;
        for (let index = 0; index < arr.length; index++) {
            var element = arr[index];
            if(element)
            {
                if(index == 0)
                {
                    if(element.Position != 1)
                    {
                        this.protocol.send17003(element.PartnerId);
                        //CommonControl.instance.send17031(element.PartnerId,1);
                    }
                }
                else
                {
                    if(element.State != 100)
                    {
                        this.protocol.send17001(element.PartnerId,100);
                        this.protocol.send17019(element.PartnerId,index);
                    }
                    else
                    {
                        if(element.Order != index)
                        {
                            this.protocol.send17019(element.PartnerId,index);
                        }
                    }
                }
            }
        }
    }

    private onSend32010(obj:any):void
    {
        this.protocol.send32010.apply(this.protocol,obj);
    }

    private onSend17009(obj:any):void
    {
        this.protocol.send17009.apply(this.protocol,obj);
    }

    private onSend17018(obj:any):void
    {
        this.protocol.send17018.apply(this.protocol,obj);
    }

    private onSend17015(obj:any):void
    {
        this.protocol.send17015.apply(this.protocol,obj);
    }

    private onSend17036(obj:any):void
    {
        this.protocol.send17036.apply(this.protocol,obj);
    }

    private onSend17040(obj:any):void
    {
        this.protocol.send17040.apply(this.protocol,obj);
    }

    private onUpdateRefine():void
    {
        this.panel.updateRefine();
    }

    private onUpdateTrain():void
    {
        this.panel.updateTrain();
    }

    private onUpdatePetInfo():void
    {
        this.panel.updatePetInfo();
    }

    private onUpdateListData():void
    {
        this.panel.updateListData();
    }

    private onUpdatePetData():void
    {
        this.panel.updateListData();
        this.panel.onChange();
    }

    private onUpdateCost():void
    {
        this.panel.updateCost();
        this.panel.updateListData();
    }

    private onUpdatePanelSelect(selectVo:PetInfo):void{
        this.panel.onUpdatePanelSelect(selectVo);
    }
}