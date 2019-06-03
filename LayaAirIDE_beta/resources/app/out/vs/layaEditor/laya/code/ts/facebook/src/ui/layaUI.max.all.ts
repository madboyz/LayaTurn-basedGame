
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class FBGameUI extends View {
		public photo:Laya.Image;
		public id:Laya.Label;
		public locale:Laya.Label;
		public gameId:Laya.Label;
		public vision:Laya.Label;
		public type:Laya.Label;
		public myName:Laya.Label;
		public platform:Laya.Label;
		public btnShare:Laya.Button;
		public btnLogout:Laya.Button;
		public btnSave:Laya.Button;
		public btnLoading:Laya.Button;
		public btnFriend:Laya.Button;
		public btnChoose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":309,"x":41,"var":"photo"}},{"type":"Label","props":{"y":30,"x":35,"width":236,"var":"id","text":"ID:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":69,"x":35,"width":236,"var":"locale","text":"Locale:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":262,"x":35,"width":236,"var":"gameId","text":"gameId:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":223,"x":35,"width":236,"var":"vision","text":"Vision:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":185,"x":35,"width":236,"var":"type","text":"Type:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":107,"x":35,"width":236,"var":"myName","text":"Name:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":146,"x":35,"width":236,"var":"platform","text":"Platform:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Image","props":{"top":0,"skin":"comp/logo.png","right":0}},{"type":"Button","props":{"y":31,"x":293,"width":150,"var":"btnShare","skin":"comp/button.png","labelSize":26,"label":"分享","height":45,"centerX":8}},{"type":"Button","props":{"y":115,"x":293,"width":150,"var":"btnLogout","skin":"comp/button.png","label":"退出游戏","height":45}},{"type":"Button","props":{"y":199,"x":293,"width":150,"var":"btnSave","skin":"comp/button.png","label":"保存数据","height":45}},{"type":"Button","props":{"y":282,"x":293,"width":150,"var":"btnLoading","skin":"comp/button.png","label":"读取数据","height":45}},{"type":"Button","props":{"y":366,"x":293,"width":150,"var":"btnFriend","skin":"comp/button.png","label":"获取关系链","height":45}},{"type":"Button","props":{"y":450,"x":293,"width":150,"var":"btnChoose","skin":"comp/button.png","label":"选择好友同玩","height":45}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.FBGameUI.uiView);

        }

    }
}
