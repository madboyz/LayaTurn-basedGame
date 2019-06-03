class NotityData {
    public event: any;
    public data: any;
    public type: string;
    /**
     * 创建一个NotityData消息类,从对象池拿
     * @param event 事件名
     * @param data  要传的参数
     * @param type  事件类型
     */
    public static create(event: any, data: any = null, type: string = null): NotityData {
        var notity: NotityData = Laya.Pool.getItemByClass("NotityData", NotityData);
        notity.event = event;
        notity.data = data;
        notity.type = type;
        return notity;
    }
    /**
     * 回收
     */
    public recover(): void {
        this.data = null;
        this.event = null;
        this.event = null;
        Laya.Pool.recover("NotityData", this);
    }


}