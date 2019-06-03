class Facade {
    private static mInstance: Facade;

    private ctrMsg: ControlManager = new ControlManager();
    public static get instance(): Facade {
        return Facade.mInstance || (Facade.mInstance = new Facade());
    }

    public registCommand(command: ICommand): void {
        this.ctrMsg.registCommand(command);
    }

    send(notity: NotityData): any {
        this.ctrMsg.excuting(notity);
    }
}