/*
 * yeoman-include
 * https://github.com/marmelab/yeoman-include
 *
 * Copyright (c) 2013 Emmanuel Quentin
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {

		grunt.registerMultiTask('include', 'Layout templating', function(){
				var regexp = /<!--\s+\[include:([^\]]+)\]\s+-->/g;

				this.files.forEach(function (files) {
						var destDir = files.dest;

						files.src.forEach(function(file){
								var content = grunt.file.read(file);
								var fileData = file.split('/');
								var filename = fileData.pop();
								var fileDir = fileData.join('/')+'/';

								var placeholders = content.match(regexp);
								if(!placeholders || !placeholders.length){
										return;
								}

								for(var i = 0, length = placeholders.length; i < length; i++){
										var placeHolder = placeholders[i];
										var layoutFile = placeHolder.match(/\[include:([^\]]+)\]/)[1];

										var endPlaceHolder = placeHolder.split('[').join('\\[');
										var layout = grunt.file.read(fileDir+layoutFile);
										content = content.split(placeHolder).join(placeHolder+layout+endPlaceHolder);
								}

								grunt.file.write(file, content);
						});
				});
		});

		grunt.registerMultiTask('include:clean', 'Clean layout templating', function(){
				if(this.files.length == 0){
						return;
				}

				var regexp = /(<!--\s+\[include:[^\]]+\]\s+-->)(?:\r|\n|.)+?<!--\s+\\\[include:[^\]]+\]\s+-->/g;
				var contentRegexp = /(<!--\s+\[include:[^\]]+\]\s+-->)((?:\r|\n|.)+?)<!--\s+\\\[include:[^\]]+\]\s+-->/;

				// Clean app files
				this.files.forEach(function (files) {
						files.src.forEach(function(file){
								var content = grunt.file.read(file);

								var layouts = content.match(regexp);
								if(!layouts || !layouts.length){
										return;
								}

								for(var i = 0, length = layouts.length; i < length; i++){
										var layoutContent = layouts[i].match(contentRegexp);

										content = content.split(layouts[i]).join(layoutContent[1]);
								}

								grunt.file.write(file, content);
						});
				});

		});

		grunt.registerMultiTask('include:clean-dest', 'Clean final layout templating', function(){
				var regexp = /(<!--\s+\[include:[^\]]+\]\s+-->)(?:\r|\n|.)+?<!--\s+\\\[include:[^\]]+\]\s+-->/g;
				var contentRegexp = /<!--\s+\[include:[^\]]+\]\s+-->((?:\r|\n|.)+?)<!--\s+\\\[include:[^\]]+\]\s+-->/;

				// Clean app files
				this.files.forEach(function (files) {
						files.src.forEach(function(file){
								var content = grunt.file.read(file);

								var layouts = content.match(regexp);
								if(!layouts || !layouts.length){
										return;
								}

								for(var i = 0, length = layouts.length; i < length; i++){
										var layoutContent = layouts[i].match(contentRegexp);

										content = content.split(layouts[i]).join(layoutContent[1]);
								}

								grunt.file.write(file, content);
						});
				});
		});
};
