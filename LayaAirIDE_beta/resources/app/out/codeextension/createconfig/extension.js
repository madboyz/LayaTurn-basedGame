function activate(context)
{
	if (codeMain.workspacePath)
	{
		setTimeout(checktypescript, 2000)
			// var launchfile = path.join(codeMain.configuration.workspacePath, ".laya", "launch.json");
	}

	function checktypescript()
	{
		var popPanel = layainfobar;
		console.log("checktypescript")
		if (codeMain.layaProtype == "as")
		{
			if (codeMain.fs.existsSync(codeMain.path.join(codeMain.workspacePath, ".laya", "tasks.json")))
			{
				codeMain.copyDir(codeMain.path.join(__dirname, ".laya", "astool"), codeMain.path.join(codeMain.workspacePath, ".laya", "astool"))
			}
			else
			{
				codeMain.copyDir(codeMain.path.join(__dirname, ".laya"), codeMain.path.join(codeMain.workspacePath, ".laya"))
			}
			return 
		}
		else if (codeMain.layaProtype == "ts")
		{
			console.log("ts-------监测")
			childProcess.exec("tsc -v", function(err, stout)
			{
				if (err)
				{
					var pop = new popPanel.ShowPop([codeMain.getPanelLang(103), codeMain.getPanelLang(204)], codeMain.getPanelLang(205), function(e)
					{

						if (e == codeMain.getPanelLang(204))
						{
							window.open("http://ldc.layabox.com/doc/?nav=ch-ts-1-0-0")
						}
						else
						{
							pop.dispose();
						}
					}, true);
				}

				/* body... */
			})
		}
	}

}
exports.activate = activate;

function deactivate()
{}
exports.deactivate = deactivate;