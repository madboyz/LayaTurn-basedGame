class  BaseControl implements ICommand {

    private notice: Notice;
    constructor() {
        this.notice = new Notice();
        this.notice["facade"].registCommand(this);
    }

    public hasEvent(event: any): boolean {
        var events: Array<any> = this.getEvent;
        if (events.indexOf(event) != -1) {
            return true;
        }
        return false;
    }

    public send(noticeData: NotityData): void {
        this.notice["facade"].send(noticeData);
    }

    //command
    public get getEvent(): Array<any> {
        return [];
    }
    public excuting(notity: NotityData): void {

    }

    public index: number;
    protected mPanel: UIBase;
    public set panel(value: UIBase) {
        this.mPanel = value;
    }

    //self
    public get panel(): UIBase {
        return this.mPanel;
    }
    /**
     * 面板被打开后的调度
     */
    public openView(...args): void {

    }
    /**
     * 面板被关闭后的调度
     */
    public closeView(): void {

    }
    /**
     * 主动关闭面板 
     * @index 面板索引
     */
    public close(index?: number): void {
        index = index == undefined ? this.index : index;
        UIManager.instance.closeUI(index);
    }
}
