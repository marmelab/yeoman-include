var fs = require('fs');

module.exports = function(content, fileDir) {
		var regexp = /<!--\s+\[include:([^\]]+)\]\s+-->/g;

		var placeholders = content.match(regexp);
		if(!placeholders || !placeholders.length){
				return content;
		}

		for(var j = 0, length = placeholders.length; j < length; j++){
				var placeHolder = placeholders[j];
				var includeData = placeHolder.match(/\[include:([^\],]+)(,\s*({[^}]*}))?\]/);

				var fileToInclude = includeData[1];
				var templateVars = 3 in includeData ? includeData[3] : null;
				var layout = String(fs.readFileSync(fileDir+fileToInclude));


				if (templateVars) {
						// Build vars (trust me I'm an engineer)
						templateVars = eval('var templateData = '+templateVars);

						for (var attrName in templateData) {
								var pattern = new RegExp('{{\\s*('+attrName+')\\s*}}');

								layout = layout.replace(pattern, templateData[attrName]);
						}
				}

				var endPlaceHolder = placeHolder.split('[').join('\\[');


				content = content.split(placeHolder).join(placeHolder+layout+endPlaceHolder);
		}

		return content;
};