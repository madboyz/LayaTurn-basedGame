package {
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	import laya.d3.resource.Texture2D;
	import laya.wx.mini.MiniAdpter;
	public class LayaAir3D {
		
		public function LayaAir3D() {

			//初始化微信小游戏
			MiniAdpter.init();
			//初始化引擎
			Laya3D.init(0, 0,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景
			var scene:Scene = Laya.stage.addChild(new Scene()) as Scene;
			
			//添加照相机
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			camera.transform.translate(new Vector3(0, 3, 3));
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			camera.clearColor = null;

			//添加方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			directionLight.color = new Vector3(0.6, 0.6, 0.6);
			directionLight.direction = new Vector3(1, -1, 0);

			//添加自定义模型
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
			box.transform.rotate(new Vector3(0,45,0),false,false);
			var material:StandardMaterial = new StandardMaterial();
			material.diffuseTexture = Texture2D.load("res/layabox.png");
			box.meshRender.material = material;
		}		
	}
}