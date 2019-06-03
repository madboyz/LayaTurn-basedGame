function activate(context) {
    var versionConfig = new XMLHttpRequest();
    versionConfig.open("GET", "http://ldc.layabox.com/download/LayaAir/versionconfig.json?" + Math.random());
    versionConfig.onreadystatechange = function () {
        console.log("remote.app.getDataPath()+path.sep");
        if (versionConfig.readyState !== 4) return;
        if (versionConfig.status === 200) {
            window.configVersion = JSON.parse(versionConfig.responseText);
            window.configVersion .versionList=window.configVersion.versionList.reverse();
        }
    }

    versionConfig.send(null);
    versionConfig.onerror = function (e) {

    }
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;