# yeoman-include

> Grunt task to include static templates with Yeoman

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-include --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('yeoman-include');
```

## The "include" task

### Overview
In your project's Gruntfile, add 2 sections named `include` & `include:clean` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  include: {
      myTask: 'source/*.html'
  },

  "include:clean": {
      myTask: 'source/*.html'
  },

  "include:clean-dest": {
      myTask: 'dest/*.html'
  },
})

grunt.registerTask('build', [
    'include:myTask',
    // Run task like cssmin, ugligy ...
    'include:clean:myTask',
    'include:clean-dest:myTask'
]);
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
	  include: {
	      build: '<%= yeoman.app %>/*.html',
	      tmp: '.tmp/*.html'
	  },

	  "include:clean": {
	      build: '<%= yeoman.app %>/*.html',
	      tmp: '.tmp/*.html'
	  },

	  "include:clean-dest": {
	      build: '<%= yeoman.dist %>/*.html',
	      tmp: '.tmp/*.html'
	  }
})

grunt.registerTask('build', [
    'clean:dist',
    'include:build',
    'cssmin',
    'concat',
    'uglify',
    'coffee',
    'copy:dist',
    'rev',
    'usemin',
    'include:clean:build',
    'include:clean-dest:build'
]);
```

## Using grunt with server

### Declare connect middleware
```js
// Gruntfile.js
module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

		var includeMiddleware = require('yeoman-include/middleware')(__dirname+'/'+yeomanConfig.app);

		// ...

		connect: {
				livereload: {
				    options: {
				        middleware: function (connect) {
				            return [
				                includeMiddleware,
				                // ...
				            ];
				        }
				    }
				},
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- v0.1 (08/14/2013) : Add simple yeoman include task
- v0.2 (09/08/2013) : Allows multiple task (eg. include:build, include:tmp)
- v0.3 (01/02/2014) : Use grunt.file.expand to be crossplatform
