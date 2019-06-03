'use strict';

var prk;
var puk;
var addr;

function Wif2Addr() {
    var wif = document.getElementById("wif").value;
    try {
        prk = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
        puk = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prk);
        addr = ThinNeo.Helper.GetAddressFromPublicKey(puk);
        document.getElementById("address").innerText = addr;
    }
    catch (e) {
        alert(e);
    }
}


function fileimport() {
    var file = document.getElementById("files").files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
        var a = this.result.split('').map(function (v) { return ('0' + v.charCodeAt(0).toString(16)).slice(-2); });
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += a[i];
        }
        document.getElementById("script").innerHTML = s;

        //ThinNeo.Helper.Bytes2HexString(((byte[])ThinNeo.Helper.GetScriptHashFromScript(bin)).Reverse().ToArray());
        var scriptHash = ThinNeo.Helper.GetScriptHashFromScript(document.getElementById("script").value.hexToBytes()).reverse().toHexString();
        document.getElementById("scriptHash").value = scriptHash;
    }
}

var sb;
var consume;
async function invokeSc() {
    var description = document.getElementById("description").value;
    var email = document.getElementById("email").value;
    var author = document.getElementById("author").value;
    var version = document.getElementById("version").value;
    var name = document.getElementById("name").value;
    var need_storage = document.getElementById("needStorage").checked*1;  
    var need_nep4 = document.getElementById("needNep4").checked*2;   
    var payable = document.getElementById("payable").checked*4;   
    var return_type = document.getElementById("return_type").value.hexToBytes();
    var parameter__list = document.getElementById("parameter_list").value.hexToBytes();
    var script = document.getElementById("script").value.hexToBytes();

    sb = new ThinNeo.ScriptBuilder();
    sb.EmitPushString(description);
    sb.EmitPushString(email);
    sb.EmitPushString(author);
    sb.EmitPushString(version);
    sb.EmitPushString(name);
    sb.EmitPushNumber(new Neo.BigInteger(need_storage|need_nep4|payable));
    sb.EmitPushBytes(return_type);
    sb.EmitPushBytes(parameter__list);
    sb.EmitPushBytes(script);
    sb.EmitSysCall("Neo.Contract.Create");
    var scriptPublish = sb.ToArray().toHexString();

    //试运行获取需要消耗的gas
    var result=await post("invokescript",scriptPublish);
    consume = result[0]["gas_consumed"];
    consume=  consume -10;
    document.getElementById("consume").value =  consume;
}


async function pubSc()
{
    if(!addr)
    {
        alert("请先输入wif并确认");
        return;
    }
    var utxos =await get("getutxo",addr);
    console.log(utxos);
    utxos = getassets(utxos);
    var tran = makeTran(utxos,null,"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7", Neo.Fixed8.fromNumber(consume));
    tran.version = 1;
    tran.type = ThinNeo.TransactionType.InvocationTransaction;
    tran.extdata = new ThinNeo.InvokeTransData();
    tran.extdata.script = sb.ToArray();
    tran.extdata.gas = Neo.Fixed8.fromNumber(consume);
    var msg = tran.GetMessage();
    var signdata = ThinNeo.Helper.Sign(msg, prk);
    tran.AddWitness(signdata, puk, addr);
    let txid = tran.GetHash().clone().reverse().toHexString();
    var data = tran.GetRawData();
    var scripthash = data.toHexString();
    console.log(scripthash);
    var result = await post("sendrawtransaction",scripthash);
    document.getElementById("result").value = JSON.stringify(result);
}


function getassets(utxos)
{
    var assets = {};
    for (var i in utxos)
    {
        var item = utxos[i];
        var txid = item.txid;
        var n = item.n;
        var asset = item.asset;
        var count = item.value;
        if (assets[asset] == undefined)
        {
            assets[asset] = [];
        }
        var utxo = {
            addr:item.addr,
            asset:asset,
            n:n,
            txid:txid,
            count:Neo.Fixed8.parse(count+"")
        };
        assets[asset].push(utxo);
    }
    return assets;
}


function makeTran(utxos, targetaddr, assetid, sendcount)
{
    console.log(sendcount);
    var tran = new ThinNeo.Transaction();
    tran.type = ThinNeo.TransactionType.ContractTransaction;
    tran.version = 0;//0 or 1
    tran.extdata = null;

    tran.attributes = [];

    tran.inputs = [];
    var scraddr = "";
    utxos[assetid].sort((a, b) =>
    {
        return a.count.compareTo(b.count);
    });
    var us = utxos[assetid];
    var count = Neo.Fixed8.Zero;
    for (var i = 0; i < us.length; i++)
    {
        var input = new ThinNeo.TransactionInput();
        input.hash = us[i].txid.hexToBytes().reverse();
        input.index = us[i].n;
        input["_addr"] = us[i].addr;//利用js的隨意性，臨時傳個值
        tran.inputs.push(input);
        count = count.add(us[i].count);
        scraddr = us[i].addr;
        if (count.compareTo(sendcount) > 0)
        {
            break;
        }
    }
    if (count.compareTo(sendcount) >= 0)//输入大于等于输出
    {
        tran.outputs = [];
        //输出
        if (sendcount.compareTo(Neo.Fixed8.Zero) > 0 && !!targetaddr)
        {
            var output = new ThinNeo.TransactionOutput();
            output.assetId = assetid.hexToBytes().reverse();
            output.value = sendcount;
            output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(targetaddr);
            tran.outputs.push(output);
        }

        //找零
        var change = count.subtract(sendcount);
        if (change.compareTo(Neo.Fixed8.Zero) > 0)
        {
            var outputchange = new ThinNeo.TransactionOutput();
            outputchange.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
            outputchange.value = change;
            outputchange.assetId = assetid.hexToBytes().reverse();
            tran.outputs.push(outputchange);

        }
    }
    else
    {
        throw new Error("no enough money.");
    }
    return tran;
}

