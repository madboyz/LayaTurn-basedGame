/**Created by the LayaAirIDE,do not modify.*/
package ui.test {
	import laya.ui.*;
	import laya.display.*; 

	public class TestPageUI extends View {
		public var photo:Image;
		public var ID:Label;
		public var Locale:Label;
		public var gameId:Label;
		public var Vision:Label;
		public var Type:Label;
		public var Name:Label;
		public var Platform:Label;
		public var btnShare:Button;
		public var btnLogout:Button;
		public var btnSave:Button;
		public var btnLoading:Button;
		public var btnFriend:Button;
		public var btnChoose:Button;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":309,"x":41,"var":"photo"}},{"type":"Label","props":{"y":30,"x":35,"width":236,"var":"ID","text":"label","height":25,"fontSize":16,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":67,"x":35,"width":236,"var":"Locale","text":"label","height":25,"fontSize":16,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":262,"x":35,"width":236,"var":"gameId","text":"label","height":25,"fontSize":16,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":221,"x":35,"width":236,"var":"Vision","text":"label","height":25,"fontSize":16,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":180,"x":35,"width":236,"var":"Type","text":"label","height":25,"fontSize":16,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":103,"x":35,"width":236,"var":"Name","text":"label","height":25,"fontSize":16,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":141,"x":35,"width":236,"var":"Platform","text":"label","height":25,"fontSize":16,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Image","props":{"y":30,"x":468,"skin":"comp/logo.png"}},{"type":"Button","props":{"y":27,"x":314,"var":"btnShare","skin":"comp/button.png","label":"分享"}},{"type":"Button","props":{"y":67,"x":314,"var":"btnLogout","skin":"comp/button.png","label":"退出游戏"}},{"type":"Button","props":{"y":107,"x":314,"var":"btnSave","skin":"comp/button.png","label":"保存数据"}},{"type":"Button","props":{"y":146,"x":314,"var":"btnLoading","skin":"comp/button.png","label":"读取数据"}},{"type":"Button","props":{"y":186,"x":314,"var":"btnFriend","skin":"comp/button.png","label":"获取关系链"}},{"type":"Button","props":{"y":225,"x":314,"var":"btnChoose","skin":"comp/button.png","label":"选择好友同玩"}}]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}