export class SheetManager {

    public static dbUrl: string = "data/test.json";

    private static data: any;

    public static loadDB(onComplete: Function): void {
        Laya.loader.load(this.dbUrl, Laya.Handler.create(this, function (): void {
            var time: number = new Date().getTime();
            var json = Laya.loader.getRes("data/test.json");
            this.data = json;
            Laya.loader.clearRes("data/test.json");
            onComplete && onComplete();

        }), null, Laya.Loader.JSON);

    }

    public static get(table: string, id: any, vo: any, keyStr: string, index: number = -1): any {
        var value: any;
        if (index != -1) value = this.data[table][id][index];
        else value = this.data[table][id];
        if(!value) return null;
        var keys: string[] = keyStr.split(",");
        var v: any;
        for (var i: number = 0; i < keys.length; i++) {
            v = this.data.dic[value[i]];
            vo[keys[i]] = v !== "null" ? v : null;
        }
        return vo;
    }
    

    public static getList(table: string):object
    {
        return this.data[table];
    }

    public static getComplexLength(table: string, id: any): number {
        return this.data[table][id].length;
    }
}