'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.include = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  simple_include: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/dest/index.html');
    var expected = grunt.file.read('test/expected/index.html');
    test.equal(actual, expected, 'should replace simple inclusion');

    test.done();
  },
  complex_include: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/dest/about.html');
    var expected = grunt.file.read('test/expected/about.html');
    test.equal(actual, expected, 'should replace inclusion with multiple tags');

    test.done();
  }
};
