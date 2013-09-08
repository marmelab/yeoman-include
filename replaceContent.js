var fs = require('fs');

module.exports = function(content, fileDir) {
		var regexp = /<!--\s+\[include:([^\]]+)\]\s+-->/g;

		var placeholders = content.match(regexp);
		if(!placeholders || !placeholders.length){
				return content;
		}

		for(var j = 0, length = placeholders.length; j < length; j++){
				var placeHolder = placeholders[j];
				var layoutFile = placeHolder.match(/\[include:([^\]]+)\]/)[1];

				var endPlaceHolder = placeHolder.split('[').join('\\[');

				var layout = fs.readFileSync(fileDir+layoutFile);
				content = content.split(placeHolder).join(placeHolder+layout+endPlaceHolder);
		}

		return content;
};