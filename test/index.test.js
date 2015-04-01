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
    var val = 1;
    java.boolean(val).should.eql({$class: 'boolean', $: true});
    java.Boolean(val).should.eql({$class: 'java.lang.Boolean', $: true});
    java.Boolean().should.eql({$class: 'java.lang.Boolean', $: false});

    java.Integer('1').should.eql({$class: 'java.lang.Integer', $: 1});
    java.int('1').should.eql({$class: 'int', $: 1});
    java.int().should.eql({$class: 'int', $: 0});

    java.Short('101').should.eql({$class: 'java.lang.Short', $: 101});
    java.short('101').should.eql({$class: 'short', $: 101});
    java.short('str').should.eql({$class: 'short', $: 'str'});
    java.short().should.eql({$class: 'short', $: 0});

    java.byte('1').should.eql({$class: 'byte', $: 1});
    java.Byte('1').should.eql({$class: 'java.lang.Byte', $: 1});
    java.Byte().should.eql({$class: 'java.lang.Byte', $: null});

    java.long('1').should.eql({$class: 'long', $: '1'});
    java.Long(1).should.eql({$class: 'java.lang.Long', $: 1});

    java.double('1.02').should.eql({$class: 'double', $: 1.02});
    java.double().should.eql({$class: 'double', $: 0});
    java.Double('1').should.eql({$class: 'java.lang.Double', $: 1});
    java.Double().should.eql({$class: 'java.lang.Double', $: null});

    java.float('1').should.eql({$class: 'float', $: 1});
    java.float().should.eql({$class: 'float', $: 0});
    java.float('str').should.eql({$class: 'float', $: 'str'});
    java.Float('1.03').should.eql({$class: 'java.lang.Float', $: 1.03});
    java.Float().should.eql({$class: 'java.lang.Float', $: null});

    java.String(123).should.eql({$class: 'java.lang.String', $: '123'});
    java.String().should.eql({$class: 'java.lang.String', $: null});

    java.char('2').should.eql({$class: 'char', $: '2'});
    java.chars('3').should.eql({$class: 'char[]', $: '3'});
    java.char().should.eql({$class: 'char', $: null});

    java.Character(1).should.eql({$class: 'java.lang.Character', $: '1'});
    java.List([]).should.eql({$class: 'java.util.List', $: []});
    java.Integer().should.eql({$class: 'java.lang.Integer', $: null});
    java.Integer('a').should.eql({$class: 'java.lang.Integer', $: 'a'});
  });

  it('should array work fine', function () {
    java.array('Short', [1]).should.eql({$class: '[java.lang.Short', $: [
      {
        $class: 'java.lang.Short',
        $: 1
      }
    ]});
    java.array('com.java.Object', [{}]).should.eql({$class: '[com.java.Object', $: [{
      $class: 'com.java.Object',
      $: {}
    }]});
  });

  it('should array.type work fine', function () {
    java.array.Integer(['1', '2', 3]).should.eql({$class: '[java.lang.Integer', $: [
      { $: 1, $class: 'java.lang.Integer' },
      { $: 2, $class: 'java.lang.Integer' },
      { $: 3, $class: 'java.lang.Integer' }
    ]});
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
    java.enum('hessian.demo.Color', {name: 'RED'}).should.eql({
      $class: 'hessian.demo.Color',
      $: {name: 'RED'}
    });
    java.enum('xxx').should.eql({
      $class: 'xxx',
      $: null
    });
    java.array.enum('com.xxx').should.eql({
      $class: '[com.xxx',
      $: null
    });
    java.array.enum('com.xxx', ['aaa']).should.eql({
      $class: '[com.xxx',
      $: [
        {
          $class: 'com.xxx',
          $: {
            name: 'aaa'
          }
        }
      ]
    });
    java.array.enum('com.xxx', [{name: 'aaa'}]).should.eql({
      $class: '[com.xxx',
      $: [
        {
          $class: 'com.xxx',
          $: {
            name: 'aaa'
          }
        }
      ]
    });
  });

  it('should create Class', function () {
    java.Class('java.lang.String').should.eql({
      $class: 'java.lang.Class',
      $: {name: 'java.lang.String'}
    });
    java.Class().should.eql({
      $class: 'java.lang.Class',
      $: null
    });
    java.Class('[java.lang.String').should.eql({
      $class: 'java.lang.Class',
      $: {
        name: '[Ljava.lang.String;'
      }
    });
    java.Class('[Ljava.lang.String;').should.eql({
      $class: 'java.lang.Class',
      $: {
        name: '[Ljava.lang.String;'
      }
    });
    java.Class('[Ljava.lang.String').should.eql({
      $class: 'java.lang.Class',
      $: {
        name: '[Ljava.lang.String;'
      }
    });
    java.Class('[Ljava.Lang.String').should.eql({
      $class: 'java.lang.Class',
      $: {
        name: '[Ljava.Lang.String;'
      }
    });
    java.array.Class().should.eql({
      $class: '[java.lang.Class',
      $: null
    });
    java.array.Class(['aaa']).should.eql({
      $class: '[java.lang.Class',
      $: [
        {
          $class: 'java.lang.Class',
          $: {
            name: 'aaa'
          }
        }
      ]
    });
  });

  it('should create Locale with out input `handle`', function () {
    java.Locale('zh_CN').should.eql({
      $class: 'com.caucho.hessian.io.LocaleHandle',
      $: {value: 'zh_CN'}
    });
    java.array.Locale().should.eql({
      $class: '[com.caucho.hessian.io.LocaleHandle',
      $: null
    });
    java.array.Locale(['zh_CN']).should.eql({
      $class: '[com.caucho.hessian.io.LocaleHandle',
      $: [
        {
          $class: 'com.caucho.hessian.io.LocaleHandle',
          $: {
            value: 'zh_CN'
          }
        }
      ]
    });
  });

  it('should create Locale with input `handle`', function () {
    java.Locale('zh_CN', 'test.com.caucho.hessian.io.LocaleHandle').should.eql({
      $class: 'test.com.caucho.hessian.io.LocaleHandle',
      $: {value: 'zh_CN'}
    });
    java.Locale().should.eql({
      $class: 'com.caucho.hessian.io.LocaleHandle',
      $: null
    });
  });

  it('should check type with combile', function () {
    java('java.lang.Integer', '123').should.eql({$class: 'java.lang.Integer', $: 123});
    java('int', '123').should.eql({$class: 'int', $: 123});
    java('java.lang.String', 123).should.eql({$class: 'java.lang.String', $: '123'});
  });

});
