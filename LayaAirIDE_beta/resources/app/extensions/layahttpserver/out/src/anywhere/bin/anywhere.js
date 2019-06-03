#!/usr/bin/env node
 // this method is called when your extension is activated
// your extension is activated the very first time the command is executed
var vscode = require("vscode")
var os = require('os');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var fallback = require('connect-history-api-fallback');

var debug = require('debug');
debug.enable('anywhere');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var app = connect();
var layaserver;

function activate(context)
{
    // const config = vscode.workspace.getConfiguration('launch');

    // // retrieve values
    // const values = config.get('configurations');
    // console.log(values)
    var disposable = vscode.commands.registerCommand('extension.startServer', function()
    {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        //  process.send({"message":"asdas"})
        process.stdout.write('close-connection');
        console.log("Also running at ");
        if (process.platform == "win32")
        {
            var port = fs.readFileSync(path.join(process.env.APPDATA, "port.json"), "utf-8");
        }
        else
        {
            var port = fs.readFileSync(path.join(process.env.TMPDIR, "port.json"), "utf-8");
        }

        startserver(port >> 0);

    });
    context.subscriptions.push(disposable);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate()
{}
exports.deactivate = deactivate;

function startserver(port)
{
    console.log(port)
    if (!vscode.workspace.rootPath) return;
    if (layaserver) layaserver.close();
    var argv = require("minimist")(process.argv.slice(2),
    {
        alias:
        {
            'silent': 's',
            'port': 'p',
            'hostname': 'h',
            'dir': 'd',
            'log': 'l',
            'fallback': 'f'
        },
        string: ['port', 'hostname', 'fallback'],
        boolean: ['silent', 'log'],
        'default':
        {
            'port': 8000,
            'dir': process.cwd()
        }
    });

    app.use(function(req, res, next)
    {
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (argv.log)
        {
            log(req.method + ' ' + req.url);
        }
        next();
    });
    if (argv.fallback !== undefined)
    {
        console.log('Enable html5 history mode.');
        app.use(fallback(
        {
            index: argv.fallback || '/index.html'
        }));
    }
    app.use(serveStatic(vscode.workspace.rootPath,
    {
        'index': ['index.html']
    }));
    app.use(serveIndex(vscode.workspace.rootPath,
    {
        'icons': true
    }));
    layaserver = http.createServer(app);
    layaserver.listen(port, function()
    {
        console.log("Running at " + port);
        console.log(vscode.workspace.rootPath);

    });
}