var replaceContent = require('./replaceContent.js');
var fs             = require('fs');

module.exports = function(appDir){

		if (appDir.substr(-1, 1) != '/') {
				appDir += '/';
		}

		return function (req, res, next) {
				var url = req.url;
				if (url == '/') {
						url = '/index.html';
				}

				if (url.split('.').pop() == 'html') {
						var fileName = url.split('/').pop();
						var filePath = appDir +'/' + fileName;
						var fileData = filePath.split('/');
						fileData.pop();

						var content = String(fs.readFileSync(filePath));
						content = replaceContent(content, fileData.join('/'));

						return res.end(content);
				}

				next();
		}
};