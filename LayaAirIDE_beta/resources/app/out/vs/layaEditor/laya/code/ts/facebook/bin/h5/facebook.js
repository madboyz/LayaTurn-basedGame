faceBook = function() {
    
}
/**
 * 初始化
 * 应当在其他 API 使用前调用
 * */
faceBook.prototype.initializeAsync = function(callback) {
    FBInstant.initializeAsync().then(function() {
        callback&&callback();
    });
}
/**
 * 获取用户信息
 */
faceBook.prototype.player = function(){
    return FBInstant.player;
}
/**
 * 当前游戏的来源信息
 */
faceBook.prototype.context = function () {
    return FBInstant.context;
};
/**
 * 获取用户的地域信息，例如:zh_CN en_US
 */
faceBook.prototype.getLocale = function(){
    return FBInstant.getLocale();
}
/**
 * 获取运行的平台信息: IOS | ANDROID | WEB | MOBILE_WEB
 */
faceBook.prototype.getPlatform = function(){
    return FBInstant.getPlatform();
}
/**
 * SDK 的版本号，例如: '4.1'
 */
faceBook.prototype.getSDKVersion = function () {
    return FBInstant.getSDKVersion();
}
/**
 * 通知平台资源加载的百分比
 * @param value 0-100
 */
faceBook.prototype.setLoadingProgress=function(value){
    FBInstant.setLoadingProgress(value);
}
/**
 * 获取平台支持的 api 列表  返回一个数组
 */
faceBook.prototype.getSupportedAPIs=function () {
    return FBInstant.getSupportedAPIs();
}
/**
 * 获取入口点数据  返回object
 */
faceBook.prototype.getEntryPointData=function () {
   return FBInstant.getEntryPointData();
}
/**
 * 设置会话数据
 */
faceBook.prototype.setSessionData = function(sessionData){
    FBInstant.setSessionData(sessionData);
}
/**
 * 游戏已完成加载资源，用户点击了开始游戏的按钮
 * callback回来用户处理游戏逻辑
 */
faceBook.prototype.startGameAsync = function (callback) {
    FBInstant.startGameAsync().then(function() {
        callback&&callback();
    });
}
/**
 * 分享游戏
 * payload is SharePayload
 */
faceBook.prototype.shareAsync=function(payload,callback){
    FBInstant.shareAsync(payload).then(function() {
        callback&&callback();
    });
}
/**
 * 通知 Facebook 在游戏中发生的更新
 * payload is CustomUpdatePayload
 */
faceBook.prototype.updateAsync=function(payload,callback){
    FBInstant.updateAsync(payload).then(function() {
        callback&&callback();
    });
}
/**
 * 退出游戏
 */
faceBook.prototype.quit = function(){
    FBInstant.quit();
}
/**
 * 使用 Facebook 的分析功能来分析应用。
 * @param eventName string 要分析的事件名称  必须为2到40个字符, 并且只能包含 "_"、"-"、"和" 字母数字字符
 * @param valueToSum number 可选，FB分析可以计算它。
 * @param parameters Object 可选，它可以包含多达25个 key-value，以记录事件。key 必须是2-40个字符，只能包含'_', '-', ' '和字母数字的字符。 Value 必须少于100个字符。
 */
faceBook.prototype.logEvent = function(eventName, valueToSum, parameters){
    return FBInstant.logEvent(eventName, valueToSum, parameters);
}
/**
 * 设置一个暂停触发的方法
 */
faceBook.prototype.onPause = function(callback){
    // callback&&callback();
}
/**
 * 玩家的唯一标识ID
 */
faceBook.prototype.getID = function(){
    return FBInstant.player.getID();
}
/**
 * 获取玩家的唯一ID和一个签名，签名用来验证该 ID 来自 Facebook ，没有被篡改。
 * 返回SignedPlayerInfo
 */
faceBook.prototype.getSignedPlayerInfoAsync = function(callback){
    FBInstant.player.getSignedPlayerInfoAsync('my_metadata')
        .then(function (result) {
            callback&&callback(result);
        });
}
/**
 * 获取用户在Facebook上的的名字，使用用户的语言种类显示
 */
faceBook.prototype.getName=function () {
    return FBInstant.player.getName();
}
/**
 * 获取用户在Facebook上的头像的url，头像为正方形，最小尺寸为200x200
 */
faceBook.prototype.getPhoto=function () {
    return FBInstant.player.getPhoto();
}
/**
 * 取回在FB平台储存的当前用户的数据
 * @param keys 数据的 key 的数组
 */
faceBook.prototype.getDataAsync = function(keys,callback){
    FBInstant.player.getDataAsync(keys)
        .then(function(data){
            callback&&callback(data);
        });
}
/**
 * 把当前用户的数据储存在FB平台上。
 * @param data 包含key-value的数据对象.
 */
faceBook.prototype.setDataAsync = function(data,callback){
    FBInstant.player.setDataAsync(data)
        .then(function() {
            callback&&callback();
        });
}
/**
 * 立刻保存数据
 */
faceBook.prototype.flushDataAsync=function (callback) {
    FBInstant.player.flushDataAsync()
    .then(function() {
        callback&&callback();
    });
}
/**
 * 获取玩家好友的信息
 * 返回的值是数组[ConnectedPlayer]
 */
faceBook.prototype.getConnectedPlayersAsync=function (callback) {
    FBInstant.player.getConnectedPlayersAsync()
        .then(function(players) {
            callback&&callback(players);
        });
}
/**
 * 当前游戏来源的唯一id
 */
faceBook.prototype.getGameID=function(){
    return FBInstant.context.getID();
}
/**
 * 游戏的来源类型："POST" | "THREAD" | "GROUP" | "SOLO"
 */
faceBook.prototype.getType=function(){
    return FBInstant.context.getType();
}
/**
 * 用这个方法来判断当前游戏环境中游戏参与者的数量是否介于指定的最小值和最大值之间。
 */
faceBook.prototype.isSizeBetween=function(minSize, maxSize)
{
    return FBInstant.context.isSizeBetween(minSize, maxSize);
}
/**
 * 切换游戏场景
 */
faceBook.prototype.switchAsync=function(id,callback){
    FBInstant.context.switchAsync(id)
        .then(function() {
            callback&&callback();
        });
}
/**
 * 选择游戏场景
 */
faceBook.prototype.chooseAsync=function(param,callback){
    FBInstant.context.chooseAsync(param)
        .then(function() {
            callback&&callback();
        });
}
/**
 * 创建游戏场景
 */
faceBook.prototype.createAsync=function(playerID,callback){
    FBInstant.context.createAsync(playerID)
        .then(function() {
            callback&&callback();
        });
}
/**
 * 获取当前环境中正在玩游戏的玩家列表，它可能包含当前玩家的信息。
 * 返回的值是数组[ContextPlayer]
 */
faceBook.prototype.getPlayersAsync=function(callback){
   FBInstant.context.getPlayersAsync()
        .then(function(players) {
            callback&&callback(players);
        });
}

/**
 * 游戏好友的信息
 */
ConnectedPlayer = function(){
    /**
     * 关联用户的ID
     */
    function getID(){
        return "";
    };
    /**
     * 关联用户的名字
     */
    function getName(){
        return "";
    };
    /**
     * 关联用户的头像 ulr 地址
     */
    function getPhoto(){
        return "";
    };
}

/**
 * 游戏环境中的玩家
 */
ContextPlayer = function(){
    /**
     * 关联用户的ID
     */
    function getID(){
        return "";
    };
    /**
     * 关联用户的名字
     */
    function getName(){
        return "";
    };
    /**
     * 关联用户的头像 ulr 地址
     */
    function getPhoto(){
        return "";
    };
}

/**
 * 玩家的签名信息
 */
SignedPlayerInfo = function(){
    /**
     * 玩家的id
     */
    function getPlayerID(){
        return "";
    }
    /**
     * 验证这个对象的签名确实来自Facebook。该字符串是base64url编码的，使用 HMAC 对您应用的 Sccret 进行签名，基于 OAuth 2.0 规范，
     */
    function getSignature(){
        return "";
    }

}

/**
 * 要分享的内容
 */
SharePayload = function(){
    /**
     * 分享的目标
     * "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
     */
    var intent;
    /**
     * 分享的图像，使用 base64 编码 必须是base64 不能是图片路径
     */
    var image;
    /**
     * 分享的文字
     */
    var text;
    /**
     * 一个附加到分享上的数据。
     * 所有从这个分享启动的游戏都可以通过  FBInstant.getEntryPointData() 方法获取到该数据。
     */
    var data;
}

/**
 * 自定义更新内容
 */
CustomUpdatePayload = function(){
    /**
     * 对于自定义更新来说，该值应该为 'CUSTOM'.
     */
    var action;
    /**
     * 自定义更新使用的模板的ID，模板应该在 fbapp-config.json 中预定义。
     * 查看配置文件说明：https://developers.facebook.com/docs/games/instant-games/bundle-config
     */
    var template;
    /**
     * 可选，按钮文字。默认情况下，我们本地化的 'Play' 作为按钮文字。
     */
    var cta;
    /**
     * base64 编码的图像信息   必须是base64 不能是图片路径
     */
    var image;
    /**
     * 文本信息
     */
   var text;
    /**
     * 附加到更新上的数据。当游戏通过分享启动时，可以通过 FBInstant.getEntryPointData() 方法获取。
     * 该数据必须少于1000个字符。
     */
   var data;
    /**
     * 指定更新的方式。
     * 'IMMEDIATE' - 默认值，立即发布更新
     * 'LAST' - 当游戏结束时，发布更新
     * 'IMMEDIATE_CLEAR' - 立即发布更新，并清除任何其他正在等待的更新
     */
    var strategy;
    /**
     * 指定自定义更新的通知设置。可以是“NO_PUSH”或“PUSH”，默认为“NO_PUSH”。
     */
    var notification;
}
window.FBSDK=faceBook; 