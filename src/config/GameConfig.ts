class GameConfig {

    constructor() {

    }
    //设计宽高
    public static readonly SCREEN_WIDTH = 580;
    public static readonly SCREEN_HEIGHT = 930;

    // 屏幕中心点
    public static readonly SCREEN_WIDTH2 = GameConfig.SCREEN_WIDTH >> 1;
    public static readonly SCREEN_HEIGHT2 = GameConfig.SCREEN_HEIGHT >> 1;

    //TEST登录信息配置
    //wss mxxy.bqjoy.com:29999
    public static TEST_IP = "192.168.0.196";//内网192.168.0.196 外网120.78.14.138
    public static TEST_PORT = 9999;//内网9999 外网7999
    public static TEST_ACCOUNT = "1wwx001";
    public static REAL_ACCOUNT = "";//真正的账号通过sdk获取
    public static NET_MODE = "test"//web服务器模式 special账号白名单 test ip白名单 sdk
    public static WSS_CONNENT = true;//是否为wss连接
    public static SHOWMARQUEE:Boolean = false;//是否显示跑马灯
    public static GAME_URL = "wss://mxxy.bqjoy.com:7999";
    public static GAME_CHANNEL = "junhai";//渠道
    public static GAME_SHOW_MARK = 888;//可见服务器标记
    public static GAME_CONTROL_URL = "http://120.76.247.32:8080/";
    public static GAME_MARK = "mxxy";
    public static GAME_SERVER_ID = 0;//当前服务id
    public static GAME_AUTO_ALLOW_TEAM = true;
    public static GAME_AOI_MAX_COUNT = 15;//aoi玩家最大数量
    public static GAME_NORMAL_ANIMATION_SPEED = 80;
    public static GAME_BATTLE_ANIMATION_SPEED = 60;
    public static GAME_BATTLE_BE_HIT_EFFECT_DELY = 350;//受击动画延迟毫秒
    public static GAME_BATTLE_ATTACK_HAVE_EFFECT_DELY = 700;//带特效的施法延时毫秒
    public static GAME_BATTLE_ATTACK_NO_EFFECT_DELY = 600;//带特效的施法延时毫秒
    public static GAME_PAY_DEBUG = 0;//1是测试 0是正式
    public static GAME_IS_OPEN_AUTO_ROLE = true;//是否开启挂机
    public static GAME_SHOWFLITER = true;//是否启动屏蔽字符
    public static GAME_DEBUG = true;//游戏是否为debug版 
    public static GAME_SDK = false;//游戏是否为sdk版
    public static GAME_OPEN_GUIDE = true;//是否开启新手引导
    public static GAME_CDN = false;//是否启用CDN加速
    public static readonly BUFF_CONST:number = 5000;//buff常量
    public static readonly BATTLE_CONST = 10000;//战斗的标识常量
    public static readonly TEAM_CONST = 20000;//队伍的标识常量
    public static readonly LVUP_CONST = 30000;//升级的特效常量
    public static readonly CLICK_CONST = 40000;//点击玩家
    public static readonly TITLE_CONST = 50000;//称号
    public static readonly TITLE_Y_OFFSET = 50;//称号头顶Y轴偏移
    public static readonly GRID_SCENE_CONST = 60000;//格子场景
    public static readonly GRID_SCENE_EVENT_CONST = 70000;//战斗的标识常量
    public static readonly ROBOT_ID = 80000;//机器人标识
    public static readonly ROBOT_COUNT = 4;//机器人数量
    public static GAME_PLAY_MUSIC = true;//播放音乐
    public static GAME_RECONNECT_COUNT = 5;//断线重连次数
    public static readonly GAME_LOAD_COUNT = 33;//load个数
    public static readonly GAME_LOAD_UI_COUNT = 12;//loadUI个数
    public static readonly BATTLE_BUBBLE_TIME = 2000;
    public static readonly ROLE_SPEED = 2.5;
    public static GetClientGM(str:string)
    {
        if(!this.GAME_DEBUG) return;
        switch(str)
        {
            case "@close_guide":
            {
                this.GAME_OPEN_GUIDE = false;
                break;
            }
            case "@open_guide":
            {
                this.GAME_OPEN_GUIDE = true;
                break;
            }
            case "@close_auto":
            {
                this.GAME_IS_OPEN_AUTO_ROLE = false;
                break;
            }
            case "@open_auto":
            {
                this.GAME_IS_OPEN_AUTO_ROLE = true;
                break;
            }
        }
    }
}