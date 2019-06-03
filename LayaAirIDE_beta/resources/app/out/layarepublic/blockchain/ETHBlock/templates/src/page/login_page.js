var LoginPage = {};

var Assets = require('../assets');

var Handler = Laya.Handler;
var Event = Laya.Event;
var Text    = Laya.Text;
var Panel = Laya.Panel;
var Input = Laya.Input;
var Texture = Laya.Texture;
var Animation = Laya.Animation;
var SoundManager = Laya.SoundManager;

LoginPage.initlize = function(father_node){
    LoginPage.ROOT_NODE = new laya.display.Sprite();
    father_node.addChild(LoginPage.ROOT_NODE);

    
	var bg_sprite = new laya.display.Sprite();
    bg_sprite.loadImage(Assets.login_bg);

    LoginPage.ROOT_NODE.addChild(bg_sprite);

    
}

module.exports = LoginPage;