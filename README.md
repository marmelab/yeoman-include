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
      myTask: 'test/fixtures/app/*.html'
  },

  // Run others grunt task like uglify

  "include:clean": {
  		myTask: 'test/fixtures/app/*.html'
  },
  "include:clean-dest": {
      myTask: 'test/dest/*.html'
  },
})
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  include: {
      test: 'test/fixtures/app/*.html',
      tmp: '.tmp/*.html'
  },

  "include:clean": {
      test: 'test/fixtures/app/*.html',
      tmp: '.tmp/*.html'
  },

  "include:clean-dest": {
      test: 'test/dest/*.html',
      tmp: '.tmp/*.html'
  },
})

grunt.registerTask('test', ['clean', 'include:test', 'copy', 'include:clean:test', 'include:clean-dest:test']);
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.1 (08/14/2013) : Add simple yeoman include task
v0.1 (09/08/2013) : Allows multiple tasks (like : include:build, include:tmp)
