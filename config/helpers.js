var fs = require('fs');
var path = require('path');
var async = require('async');
var EasyZip = require('easy-zip').EasyZip;

var _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function WarPlugin(options) {
  this.options = options || {};
  this.fileName = options.fileName || 'project.war';
}

WarPlugin.prototype.apply = function (compiler) {
  var self = this;
  var options = compiler.options;

  self.fileName = path.join(options.output.path, '..', self.fileName);

  compiler.plugin('emit', function (compilation, callback) {
    console.log('check', self.fileName);
    if (fs.existsSync(self.fileName)) {
      console.log(self.fileName, 'exist must be deleted');
      fs.unlink(self.fileName, (err) => {
        if (err) callback(err);
      });
    }
    callback();
  });

  compiler.plugin('after-emit', function (compilation, callback) {
    let zips = [];
    let folder = options.output.path;

    if (!fs.existsSync(folder)) {
      callback(new Error('Folder not found'), me);
    } else {
      let files = fs.readdirSync(folder);
      while (files.length > 0) {
        let file = files.shift();
        let sourcePath = path.join(folder, file);
        let targetPath = path.join('', file);
        if (fs.statSync(sourcePath).isFile()) {
          zips.push({
            target: targetPath,
            source: sourcePath
          });
        } else {
          zips.push({
            target: targetPath
          });
          async.map(fs.readdirSync(sourcePath), function (item, callback) {
            callback(null, path.join(file, item));
          }, function (erro, result) {
            files = files.concat(result);
          });
          
        }
      }
      console.log('###########_ZIP_##############');
      console.log(zips);
      let zip = new EasyZip();
      zip.batchAdd(zips, function () {
        zip.writeToFile(self.fileName);
      });
    }
    callback();
  });
};

exports.root = root;
exports.WarPlugin = WarPlugin;