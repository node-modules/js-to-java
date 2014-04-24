/*!
 * js-to-java - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var java = require('../');

describe('js to java', function () {
  it('should java wrap work fine', function () {
    java('com.test.Object', {}).should.eql({$class: 'com.test.Object', $: {}});
  });

  it('should simple type map work fine', function () {
    for (var key in java.simpleTypeMap) {
      var val = 1;
      java[key](val).should.eql({
        $class: java.simpleTypeMap[key],
        $: val
      });
    }
  });

  it('should array work fine', function () {
    java.array('Short', 1).should.eql({$class: '[java.lang.Short', $: 1});
    java.array('com.java.Object', [{}]).should.eql({$class: '[com.java.Object', $: [{}]});
  });

  it('should array.type work fine', function () {
    java.array.Integer([1, 2, 3]).should.eql({$class: '[java.lang.Integer', $: [1, 2, 3]});
  });

  it('should abstractClass work ok', function () {
    java.abstract('java.lang.Object', 'com.java.Object', {}).should.eql({
      $class: 'com.java.Object',
      $abstractClass: 'java.lang.Object',
      $: {}
    });
  });

  it('should combine work fine', function () {
    function combine(className, value) {
      return {
        className: className,
        value: value
      };
    }
    var _old = java.combine;
    java.combine = combine;
    java.combine.should.equal(combine);
    java('com.test.Object', {}).should.eql({className: 'com.test.Object', value: {}});
    java.combine = _old;
  });

  it('should create enum', function () {
    java.enum('hessian.demo.Color', 'RED').should.eql({
      $class: 'hessian.demo.Color',
      $: {name: 'RED'}
    });
  });
});
