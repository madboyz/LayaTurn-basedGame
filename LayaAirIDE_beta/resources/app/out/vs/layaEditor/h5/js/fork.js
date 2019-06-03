console.log('child pid: ' + process.pid);
var UglifyJS = require('uglify-js');
var fs = require("fs");
process.on('message', function(msg)
{
	console.log('child get message: ' + JSON.stringify(msg));
	try
	{
		// var option = JSON.stringify(msg);
		var options = msg//JSON.stringify(msg);
		var result = UglifyJS.minify([options.inputPath]);
		fs.writeFileSync(options.outputPath, result.code);
	}
	catch (e)
	{
		process.send(e.message);
	}
	// setTimeout(function(){
	// 	process.exit(1);
	// },1000)
	process.exit(0);

});

// fs.writeFile("d:/dddd","asd");