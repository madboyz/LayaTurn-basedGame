/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 

	public class FBGameUI extends View {
		public var photo:Image;
		public var id:Label;
		public var locale:Label;
		public var gameId:Label;
		public var vision:Label;
		public var type:Label;
		public var name:Label;
		public var platform:Label;
		public var btnShare:Button;
		public var btnLogout:Button;
		public var btnSave:Button;
		public var btnLoading:Button;
		public var btnFriend:Button;
		public var btnChoose:Button;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":309,"x":41,"var":"photo"}},{"type":"Label","props":{"y":30,"x":35,"width":236,"var":"id","text":"ID:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":69,"x":35,"width":236,"var":"locale","text":"Locale:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":262,"x":35,"width":236,"var":"gameId","text":"gameId:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":223,"x":35,"width":236,"var":"vision","text":"Vision:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":185,"x":35,"width":236,"var":"type","text":"Type:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":107,"x":35,"width":236,"var":"name","text":"Name:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":146,"x":35,"width":236,"var":"platform","text":"Platform:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Image","props":{"top":0,"skin":"comp/logo.png","right":0}},{"type":"Button","props":{"y":31,"x":293,"width":150,"var":"btnShare","skin":"comp/button.png","labelSize":26,"label":"分享","height":45,"centerX":8,"sizeGrid":"6,12,6,12"}},{"type":"Button","props":{"y":115,"x":293,"width":150,"var":"btnLogout","skin":"comp/button.png","label":"退出游戏","height":45,"sizeGrid":"6,12,6,12","labelSize":24}},{"type":"Button","props":{"y":199,"x":293,"width":150,"var":"btnSave","skin":"comp/button.png","label":"保存数据","height":45,"sizeGrid":"6,12,6,12","labelSize":24}},{"type":"Button","props":{"y":282,"x":293,"width":150,"var":"btnLoading","skin":"comp/button.png","label":"读取数据","height":45,"sizeGrid":"6,12,6,12","labelSize":24}},{"type":"Button","props":{"y":366,"x":293,"width":150,"var":"btnFriend","skin":"comp/button.png","label":"获取关系链","height":45,"sizeGrid":"6,12,6,12","labelSize":24}},{"type":"Button","props":{"y":450,"x":293,"width":150,"var":"btnChoose","skin":"comp/button.png","label":"选择好友同玩","height":45,"sizeGrid":"6,12,6,12","labelSize":24}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}