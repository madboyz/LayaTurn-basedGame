var WebGL = laya.webgl.WebGL;
Laya.init(1280, 720, WebGL);


Laya.class(neoHomeView,"neoHomeView",neohomeUI);

var resArry = [
    {url:'res/atlas/comp.atlas',type:Laya.Loader.ATLAS}
]
Laya.loader.load(resArry,Laya.Handler.create(null,function(){
    console.log('res load done');
    var newView = new neoHomeView();
    Laya.stage.addChild(newView);

}))