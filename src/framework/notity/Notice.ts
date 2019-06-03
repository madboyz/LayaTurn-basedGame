class Notice{
    constructor(){
        
    }
    protected facade:Facade = Facade.instance; 
    public send(notity:NotityData):void{
        this.facade.send(notity);
    }
}