import { ItemData } from "../ui/compent/data/ItemData";

    export class KeyboardUtil {

        public static addKeyTest(): void {
            window.onerror = function (msg, url, line, column, detail) {
                if (detail && detail.stack) {
                    alert("出错啦，可能导致后面游戏可以正常玩下去，但内容显示不正常\n请把此信息截图发到群里面\n" + msg + "\n" + (detail.stack));
                } else {
                    alert("出错啦，可能导致后面游戏可以正常玩下去，但内容显示不正常\n请把此信息截图发到群里面");
                }
                return false;
            };

            document.onkeydown = function (event) {
                var e = window.event;
                if (!event.ctrlKey) return;// crtl + 对应的按钮
                if (event.keyCode == 13) {//回车键
                    Laya.DebugPanel.init()
                }
                // for (let i = 1; i <= 11; i++) {
                //         BagProxy.instance.testAddItem("monster_" + i + "", 100);
                //     }
                if (event.keyCode == 76) {
                    //L对应的是76，剩下的可以自己算；
                } else if (event.keyCode == 73) {
                } else if (event.keyCode == 81) {//q
                    UIManager.instance.openUI(UIID.SYS_LOGIN_REWARD);
                    UIManager.instance.closeUI(UIID.SYS_LOGIN_REWARD);
                }
                else if (event.keyCode == 66) {//b
                }
                else if (event.keyCode == 49) {//1
                }
                else if (event.keyCode == 50) {//2
                    for (let i = 1; i <= 11; i++) {
                    }
                }
                else if (event.keyCode == 51) {//3
                }
                else if (event.keyCode == 52) {//4
                }
                else if (event.keyCode == 53) {//5
                }
                else if (event.keyCode == 54) {//6
                    var goodsId = [1007,1011]; 
                    var goodslist = new Array<ItemData>();
                    var count = GMath.randRange(1,5);
                    for (let i = 0; i < count; i++) {
                        var id = GMath.randRange(0,1);
                        var goods = new ItemData(goodsId[id]);
                        goods.Count = GMath.randRange(1,20);
                        var quality = GMath.randRange(1,5);
                        goods.serverInfo.Quality = quality;
                        goods.serverInfo.BindState = 1;
                     goodslist.push(goods);
                    }
                    UIManager.instance.openUI(UIID.COM_SHOW_REWARD, [
                        goodslist,//奖励
                        null ,//点击确定的方法
                        "第1波",//一级标题
                        "您已累计获得",//二级标题
                        "领取",//确定按钮名字
                    ]);
                    //UIManager.instance.openUI(UIID.FULI_MAIN_PANEL, null , 1);
                }
                else if (event.keyCode == 55) {//7
                    GameConfig.GAME_IS_OPEN_AUTO_ROLE = false;
                }
                else if (event.keyCode == 56) {//8
                    GameConfig.GAME_OPEN_GUIDE = false;
                }else if (event.keyCode == 57) {//9
                    GameConfig.GAME_PLAY_MUSIC = false;
                    Laya.SoundManager.stopAll();
                }
            };
        }

        public static showTips(text) {
            if (!text) {
                return
            }
            var tip_img = new Laya.Image()
            tip_img.centerX = 0
            tip_img.centerY = 0

            var graphics: Laya.Graphics = new Laya.Graphics();
            graphics.drawRect(-300, -25, 600, 50, "#000000");
            tip_img.graphics = graphics;
            tip_img.alpha = 0.5;

            var label: Laya.Label = new Laya.Label(text);
            label.color = "#ffffff";
            label.fontSize = 30;
            label.align = 'center'
            label.font = 'SimHei'
            label.centerX = 0
            label.centerY = 0
            tip_img.addChild(label)
            Laya.stage.addChild(tip_img)
            laya.utils.Tween.to(tip_img, { alpha: 0, centerY: -300 }, 1000, null, Laya.Handler.create(this, () => {
                Laya.stage.removeChild(tip_img)
            }), 1000)
        }

    }