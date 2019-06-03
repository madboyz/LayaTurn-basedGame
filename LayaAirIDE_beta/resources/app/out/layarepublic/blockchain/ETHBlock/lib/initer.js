/**
 * 完成项目的初始化创建
 */
const temp = require("temp");
const path = require("path");
const fs = require("fs-extra");
const replace = require('replace-in-file');

var initer = function (name, dir, callback) {
  let self = this
  let tempPath = ''
  if (typeof dir == "function") {
    callback = dir;
    dir = ".";
  }
  // $LayaFlag 不拼接name
  // dir = path.join(dir, name)

  let p1 = Promise.resolve()
  p1
  .then(function() {
    return new Promise(function(resolve, reject) {
      temp.mkdir("layasol-", function(err, value) {
        if (err) return reject(err)
        tempPath = value
        // console.log("temp dir:", tempPath)
        resolve()
      })
    })
  }).then(function() {
    return new Promise(function(resolve, reject) {
      // $LayaFlag
      let LayaSorRoot = path.dirname(__dirname);
      let src = path.join(LayaSorRoot, "templates");
      fs.copy(src, tempPath, function(err) {
        if(err) return reject(err)
        resolve()
      })
    })
  }).then(function() {
    let files = [
      "index.html", 
      path.join("contracts", "game.sol")
    ]
    
    const options = {
      files: files.map((f) => path.join(tempPath, f)),
      from: /GAME_SYMBOL/g,
      to: name,
    }
    // console.log("replace options:", options)
    replace(options)
  }).then(function() {
    // console.log("copy to :", dir)
    return new Promise(function(resolve, reject) {
      fs.copy(tempPath, dir, function(err) {
        if(err) return reject(err)
        resolve()
      })
    })
  }).then(function() {
    callback(null)
  }).catch(function(err) {
    return callback(err)
  })
}

module.exports = initer