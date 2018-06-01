'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var java = require('../');

describe('js error to java exception', function() {
  it('should work with TypeError', function() {
    var err = new TypeError('mock js type error throw');
    var exception = java.exception(err, 'com.nodejs.eggdemo.FooException');
    assert.equal(exception.$class, 'com.nodejs.eggdemo.FooException');
    assert.equal(exception.$.detailMessage.$, 'TypeError: mock js type error throw');
    assert.equal(exception.$.stackTrace.$class, '[java.lang.StackTraceElement');
    exception.$.stackTrace.$.forEach(function(ele) {
      assert.equal(ele.$class, 'java.lang.StackTraceElement');
    });
    assert.equal(exception.$.cause.$class, 'java.lang.Throwable');
    assert(exception.$.cause.$ === null);
    // console.log(JSON.stringify(exception, null, 2));
  });

  it('should work with Error and default className', function() {
    var err = new Error('mock js error throw');
    var exception = java.exception(err);
    assert.equal(exception.$class, 'java.lang.Exception');
    assert.equal(exception.$.detailMessage.$, 'Error: mock js error throw');
    assert.equal(exception.$.stackTrace.$class, '[java.lang.StackTraceElement');
    exception.$.stackTrace.$.forEach(function(ele) {
      assert.equal(ele.$class, 'java.lang.StackTraceElement');
    });
    assert.equal(exception.$.cause.$class, 'java.lang.Throwable');
    assert(exception.$.cause.$ === null);
    // console.log(JSON.stringify(exception, null, 2));
  });
});
