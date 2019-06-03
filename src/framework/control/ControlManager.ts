class ControlManager {
    constructor() {

    }

    private cmdDic: Array<ICommand> = [];
    public registCommand(command: ICommand): void {
        if (this.cmdDic.indexOf(command) != -1){
            return ;
        }
        this.cmdDic.push(command);
    }

    public excuting(notity:NotityData):void{
       for (var i:number = 0 ; i < this.cmdDic.length ; i ++){
           if(this.cmdDic[i].hasEvent(notity.event) ){
               this.cmdDic[i].excuting(notity);
           }
       }
       notity.recover();
    }
}