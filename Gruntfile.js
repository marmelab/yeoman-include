/*
 * yeoman-include
 * https://github.com/marmelab/yeoman-include
 *
 * Copyright (c) 2013 Emmanuel Quentin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

		// Project configuration.
		grunt.initConfig({
				jshint: {
						all: [
								'Gruntfile.js',
								'tasks/*.js',
								'<%= nodeunit.tests %>'
						],
						options: {
								jshintrc: '.jshintrc'
						}
				},

				// Before generating any new files, remove any previously-created files.
				clean: {
						tests: ['test/dest']
				},

				copy: {
						tests: {
								files: [{
										expand: true,
										dest: 'test/dest/',
										cwd: 'test/fixtures/app/',
										src: '*.html'
								}]
						}
				},

				// Configuration to be run (and then tested).
				include: {
						test: 'test/fixtures/app/*.html'
				},

				"include:clean": {
						test: 'test/fixtures/app/*.html'
				},

				"include:clean-dest": {
						test: 'test/dest/*.html'
				},

				// Unit tests.
				nodeunit: {
						tests: ['test/*_test.js']
				}
		});

		// Actually load this plugin's task(s).
		grunt.loadTasks('tasks');

		// These plugins provide necessary tasks.
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-nodeunit');
		grunt.loadNpmTasks('grunt-contrib-copy');

		// Whenever the "test" task is run, first clean the "dest" dir, then run this
		// plugin's task(s), then test the result.
		grunt.registerTask('test', ['clean', 'include:test', 'copy', 'include:clean:test', 'include:clean-dest:test', 'nodeunit']);

		// By default, lint and run all tests.
		grunt.registerTask('default', ['jshint', 'test']);
};
