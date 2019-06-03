interface ICommand{
    getEvent:Array<string>;

    hasEvent(event:string):boolean;
    send(noticeData:NotityData):void;
    excuting(notity: NotityData): void;


}