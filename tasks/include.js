/*
 * yeoman-include
 * https://github.com/marmelab/yeoman-include
 *
 * Copyright (c) 2013 Emmanuel Quentin
 * Licensed under the MIT license.
 */

'use strict';

var fs      = require('fs');
var execSync = require('exec-sync');

module.exports = function(grunt) {

		grunt.registerMultiTask('include', 'Layout templating', function(){
				var regexp = /<!--\s+\[include:([^\]]+)\]\s+-->/g;

				var files = execSync('ls '+this.data).split("\n");

				for(var i = 0, nbFiles = files.length; i < nbFiles; i++){
						var file = files[i];
						var content = grunt.file.read(file);
						var fileData = file.split('/');
						fileData.pop();
						var fileDir = fileData.join('/')+'/';

						var placeholders = content.match(regexp);
						if(!placeholders || !placeholders.length){
								return;
						}

						for(var j = 0, length = placeholders.length; j < length; j++){
								var placeHolder = placeholders[j];
								var layoutFile = placeHolder.match(/\[include:([^\]]+)\]/)[1];

								var endPlaceHolder = placeHolder.split('[').join('\\[');
								var layout = grunt.file.read(fileDir+layoutFile);
								content = content.split(placeHolder).join(placeHolder+layout+endPlaceHolder);
						}

						grunt.file.write(file, content);
				}
		});

		grunt.registerMultiTask('include:clean', 'Clean layout templating', function(){
				if(this.files.length == 0){
						return;
				}

				var regexp = /(<!--\s+\[include:[^\]]+\]\s+-->)(?:\r|\n|.)+?<!--\s+\\\[include:[^\]]+\]\s+-->/g;
				var contentRegexp = /(<!--\s+\[include:[^\]]+\]\s+-->)((?:\r|\n|.)+?)<!--\s+\\\[include:[^\]]+\]\s+-->/;

				var files = execSync('ls '+this.data).split("\n");

				// Clean app files
				for(var i = 0, nbFiles = files.length; i < nbFiles; i++){
						var file = files[i];
						var content = grunt.file.read(file);

						var layouts = content.match(regexp);
						if(!layouts || !layouts.length){
								return;
						}

						for(var j = 0, length = layouts.length; j < length; j++){
								var layoutContent = layouts[j].match(contentRegexp);

								content = content.split(layouts[j]).join(layoutContent[1]);
						}

						grunt.file.write(file, content);
				}
		});

		grunt.registerMultiTask('include:clean-dest', 'Clean final layout templating', function(){
				if(this.files.length == 0){
						return;
				}

				var regexp = /(<!--\s+\[include:[^\]]+\]\s+-->)(?:\r|\n|.)+?<!--\s+\\\[include:[^\]]+\]\s+-->/g;
				var contentRegexp = /<!--\s+\[include:[^\]]+\]\s+-->((?:\r|\n|.)+?)<!--\s+\\\[include:[^\]]+\]\s+-->/;

				var files = execSync('ls '+this.data).split("\n");

				// Clean app files
				for(var i = 0, nbFiles = files.length; i < nbFiles; i++){
						var file = files[i];
						var content = grunt.file.read(file);

						var layouts = content.match(regexp);
						if(!layouts || !layouts.length){
								return;
						}

						for(var j = 0, length = layouts.length; j < length; j++){
								var layoutContent = layouts[j].match(contentRegexp);

								content = content.split(layouts[j]).join(layoutContent[1]);
						}

						grunt.file.write(file, content);
				}
		});
};
