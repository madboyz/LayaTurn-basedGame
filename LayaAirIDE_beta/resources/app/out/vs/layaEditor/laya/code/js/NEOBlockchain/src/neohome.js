
    var that;
    var neoHomeView = function(){
    neoHomeView.super(this);
    that = this;
    this.initsdk_btn.on('click',null,function(){
         console.log('init sdk');
        var appid = "5";
        var appkey = "";
         BlackCat.SDK.init(appid, appkey, result_callback, "cn")
    })

    

    this.login_button.on('click',null,function(){
         BlackCat.SDK.login(function(res) {
                console.log('[BlackCat]', 'login.callback.function.res => ', res)
        });
    })

    //合约读取按钮
    this.show_read_view_button.on('click',null,function(){
        console.log('change view to read contract');
        this.main_option.visible = false;
        this.read_contract_view.visible = true;
        this.invokescript_btn.visible = false;
        this.read_contract_action.visible = true;

         this.nnc.text = '0x3f7420285874867c30f32e44f304fd62ad1e9573';
         this.sbParamJson.text = '["(addr)AYkiQ74FHWFygR39WizXCz9f4xCLRYCxMT"]';
         this.sbPushString.text = 'balanceOf'
         this.extString.text = 'invokeScript'

    }.bind(this))


    //合约读取返回
    this.contract_return_main.on('click',null,function(){
        this.main_option.visible = true;
        this.read_contract_view.visible =false;
        
    }.bind(this))


    //合约读取执行
    this.read_contract_action.on('click',null,function(){

        
         var data = {
                nnc: this.nnc.text,
                sbParamJson: this.sbParamJson.text,
                sbPushString: this.sbPushString.text,
                extString: this.extString.text
            }

            console.log(data);
            data.sbParamJson = JSON.parse(data.sbParamJson)
            BlackCat.SDK.invokescript(data, function(res){
                console.log('[BlackCat]', 'invokescript.callback.function.res => ', res)
            })
    }.bind(this))

    //打开合约交易界面
    this.show_tx_view.on('click',null,function(){

         console.log('open tx view');
         this.main_option.visible = false;
         this.read_contract_view.visible =true;

         this.nnc.text = '0x3f7420285874867c30f32e44f304fd62ad1e9573';
         this.sbParamJson.text = '["(addr)AYkiQ74FHWFygR39WizXCz9f4xCLRYCxMT","(address)AWPVmAobCJGxrupvQSnovofakaVb2ue65a","(integer)100000"]';
         this.sbPushString.text = 'transfer'
         this.extString.text = 'makeRawTransaction'

         this.invokescript_btn.visible = true;
         this.read_contract_action.visible = false;

    }.bind(this))

    //交易执行
    this.invokescript_btn.on('click',null,function(){
          var data = {
                nnc: this.nnc.text,
                sbParamJson: this.sbParamJson.text,
                sbPushString: this.sbPushString.text,
                extString: this.extString.text
            }
            data.sbParamJson = JSON.parse(data.sbParamJson)
            BlackCat.SDK.invokescript(data, function(res){
                console.log('[BlackCat]', 'invokescript.callback.function.res => ', res)
            })
    }.bind(this))


    //结果页面返回
     this.result_return_btn.on('click',null,function(){
        this.main_option.visible = true;
        this.read_contract_view.visible =false;
        this.result_view.visible = false;
    }.bind(this))

    this.userinfo_button.on('click',null,getUserInfo)
    this.balance_button.on('click',null,getbalance)
    this.nettype_button.on('click',null,getNetType);
    this.set_en_button.on('click',null,function(){
        setLang('en');
    })

    this.set_cn_button.on('click',null,function(){
        setLang('cn');
    })


    this.gas_button.on('click',null,function(){
        set_result('请查看函数makeGasTransfer')
    })

     this.recharge_button.on('click',null,function(){
        set_result('请查看函数makerecharge')
    })

     this.confirm_button.on('click',null,function(){
        set_result('请查看函数confirmappnotify')
    })



}

var result_callback = function(data){
    that.result_content.text = JSON.stringify(JSON.parse(data));
    that.main_option.visible = false;
    that.read_contract_view.visible = false;
    that.result_view.visible = true;
}

function getbalance()
{
    BlackCat.SDK.getBalance(function(res){
        console.log("getbalance.callback.function.res ", res)
    })
}

function getUserInfo()
{
    BlackCat.SDK.getUserInfo(function(res){
        console.log("getUserInfo.callback.function.res ", res)
    })
}

function getNetType()
{
    BlackCat.SDK.getNetType(function(res){
        console.log("getNetType.callback.function.res ", res)
    })
}

function setLang(lang)
{
    BlackCat.SDK.setLang(lang)
}


function set_result(str){
    that.result_content.text = str
    that.main_option.visible = false;
    that.read_contract_view.visible = false;
    that.result_view.visible = true;
}


/*
//gas转账
function makeGasTransfer()
        {
            var data = {
                toaddr: document.getElementById('toaddr').value,
                count: document.getElementById('gascount').value,
                extString: document.getElementById('extString4').value
            }
            BlackCat.SDK.makeGasTransfer(data, function(res){
                console.log("makeGasTransfer.callback.function.res ", res)
            })
        }

//充值
function makerecharge()
{
    var data = {
        count: document.getElementById('count').value,
        extString: document.getElementById('extString3').value
}

    BlackCat.SDK.makeRecharge(data, function(res){
        console.log('[BlackCat]', 'makeRecharge.callback.function.res => ', res)
    })
}

//确认通知
function confirmappnotify()
{
    var data = {
        txid: document.getElementById('txid').value
    }

    BlackCat.SDK.confirmAppNotify(data, function(res){
        console.log('[BlackCat]', 'confirmAppNotify.callback.function.res => ', res)
    })
}
*/
