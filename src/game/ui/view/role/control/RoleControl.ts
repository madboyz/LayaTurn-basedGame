import { DataManager } from '../../../../../message/manager/DataManager';
import { SBagData, SGoodsEvent } from '../../../../../net/data/SBagData';
import { SRoleData, SRoleEvent } from '../../../../../net/data/SRoleData';
import { S15030, S15031 } from '../../../../../net/pt/pt_15';
import { RolePanel } from './../panel/RolePanel';
import { RoleProtocol } from './../protocol/RoleProtocol';
export class RoleControl extends BaseControl {
    private protocol:RoleProtocol;
    constructor() {
        super();
        this.panel = new RolePanel();
        this.protocol = new RoleProtocol();
    }

    public set panel(value: RolePanel) {
        this.mPanel = value;
    }

    public get panel(): RolePanel {
        return this.mPanel as RolePanel;
    }

    openView(...args) {
        this.initEvent();
    }

    closeView() {
        this.removeEvent();
        super.closeView();
    }

    private initEvent() {
        DataManager.listen(PROTOCOL.E15030, this, this.onS15030);
        DataManager.listen(PROTOCOL.E15031, this, this.onS15031);
        
        SRoleData.instance.on(SRoleEvent.ROLE_BATTLE_POWER_UPDATE,this,this.updateBattlePower);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_PROP , this , this.onInfoUpdate);
        SRoleData.instance.on(SRoleEvent.ROLE_CHANGE_LEVEL , this , this.updateRed);
        SRoleData.instance.on(SRoleEvent.ROLE_JING_MAI_CALL_BACK , this , this.onJingMaiUpdate);
        SRoleData.instance.on(SRoleEvent.ROLE_HEART_CALL_BACK , this , this.onHeartUpdate);
        SRoleData.instance.on(SRoleEvent.ROLE_SOAR_UPDARE , this , this.onInfoUpdate);
        SRoleData.instance.on(SRoleEvent.ROLE_ALL_PROP_UPDATE , this , this.onInfoUpdate);
        this.panel.on(SRoleEvent.ROLE_REQUEST_HEART_UPGRADE , this , this.onUpgardeHeart);
        this.panel.on(SRoleEvent.ROLE_REQUEST_JING_MAI_UPGRADE , this , this.onUpgardeJingMai);

        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.updateRed);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.updateRed);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.updateRed);
    }
    private removeEvent() {
        DataManager.cancel(PROTOCOL.E15030, this, this.onS15030);
        DataManager.cancel(PROTOCOL.E15031, this, this.onS15031);

        SRoleData.instance.off(SRoleEvent.ROLE_BATTLE_POWER_UPDATE,this,this.updateBattlePower);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_PROP , this , this.onInfoUpdate);
        SRoleData.instance.off(SRoleEvent.ROLE_CHANGE_LEVEL , this , this.updateRed);
        SRoleData.instance.off(SRoleEvent.ROLE_JING_MAI_CALL_BACK , this , this.onJingMaiUpdate);
        SRoleData.instance.off(SRoleEvent.ROLE_SOAR_UPDARE , this , this.onInfoUpdate);
        SRoleData.instance.off(SRoleEvent.ROLE_ALL_PROP_UPDATE , this , this.onInfoUpdate);
        SRoleData.instance.off(SRoleEvent.ROLE_HEART_CALL_BACK , this , this.onHeartUpdate);
        this.panel.off(SRoleEvent.ROLE_REQUEST_HEART_UPGRADE , this , this.onUpgardeHeart);
        this.panel.off(SRoleEvent.ROLE_REQUEST_JING_MAI_UPGRADE , this , this.onUpgardeJingMai);
        
        SBagData.instance.on(SGoodsEvent.GOODS_UPDATE, this, this.updateRed);
        SBagData.instance.on(SGoodsEvent.GOODS_REMOVE, this, this.updateRed);
        SBagData.instance.on(SGoodsEvent.GOODS_ADD, this, this.updateRed);
    }

    public onInfoUpdate()
    {
        this.panel.onInfoUpdate();
    }

    public onJingMaiUpdate()
    {
        this.panel.updateJingmai();
    }

    public updateBattlePower()
    {
        this.panel.updateBattlerPower();
    }

    public onHeartUpdate()
    {
        this.panel.updateHeart();
    }

    private onS15030(data:S15030):void
    {
        if(data.PartnerId > 0){
            return;
        }
        this.panel.updateAllEquip();
    }

    private onS15031(data:S15031):void
    {
        if(data.PartnerId > 0){
            return;
        }
        this.panel.updateAllEquip();
    }

    private updateRed():void
    {
        this.panel.updateRed();
        this.panel.updateAllEquip();
    }

    private onUpgardeJingMai(no:number):void 
    {
        this.protocol.send13045(no);
    }

    private onUpgardeHeart():void 
    {
        this.protocol.send13048();
    }
}