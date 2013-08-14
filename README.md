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
      "destinationFolder": 'source/*.html'
  },

  // Run others grunt task like uglify

  "include:clean": {
      "app": 'source/*.html'
  },
  "include:clean-dest": {
      "dest": 'destinationFolder/*.html'
  },
})
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  include: {
      "test/dest": 'test/fixtures/app/*.html'
  },
  "include:clean": {
      "app": 'test/fixtures/app/*.html'
  },
  "include:clean-dest": {
      "dest": 'test/dest/*.html'
  },
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.1 (08/14/2013) : Add simple yeoman include task
