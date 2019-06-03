import { SRoleData } from './../../../../../net/data/SRoleData';
import { C13001 } from './../../../../../net/pt/pt_13';
import { C10005, C10004 } from './../../../../../net/pt/pt_10';
import { BaseProtocol } from './../../../../../net/protocol/BaseProtocol';
export class SelectRoleProtocol extends BaseProtocol {
    constructor() {
        super();
    }

    

    /**
     * 申请删除某个角色
     * @private
     * @param {number} id 
     * @memberof SelectRoleProtocol
     */
    public requestDeleteRole(id:number):void
    {
        var msg:C10005 = new C10005();
        msg.Id = id;
        this.send(msg);
    }

    
}