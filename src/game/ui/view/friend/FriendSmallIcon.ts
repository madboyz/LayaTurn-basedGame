import { HinBaseIcon } from "../../compent/HinBaseIcon";

export class FriendSmallIcon extends HinBaseIcon {
    private static _instance:FriendSmallIcon;
    constructor() {
        super("main/HaoYouTiShi.png");
    }

    public static get instance(): FriendSmallIcon {
        return FriendSmallIcon._instance || (FriendSmallIcon._instance = new FriendSmallIcon());
    }

    protected onClick():void
    {
        UIManager.instance.openUI(UIID.SYS_RELATION,null,2);
        this.hide();
    }
}