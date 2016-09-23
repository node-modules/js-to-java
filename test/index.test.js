'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var java = require('../');

describe('js to java', function () {
  it('should java wrap work fine', function () {
    java('com.test.Object', {}).should.eql({$class: 'com.test.Object', $: {}});
    java.revert({$class: 'com.test.Object', $: {}}).should.eql({});
  });

  it('should simple type map work fine', function () {
    var val = 1;
    java.boolean(val).should.eql({$class: 'boolean', $: true});
    java.revert({$class: 'boolean', $: true}).should.equal(true);
    java.Boolean(val).should.eql({$class: 'java.lang.Boolean', $: true});
    java.revert({$class: 'java.lang.Boolean', $: true}).should.equal(true);
    java.Boolean().should.eql({$class: 'java.lang.Boolean', $: null});
    java.revert({$class: 'java.lang.Boolean', $: false}).should.equal(false);

    java.Integer('1').should.eql({$class: 'java.lang.Integer', $: 1});
    java.revert({$class: 'java.lang.Integer', $: 1}).should.equal(1);
    java.int('1').should.eql({$class: 'int', $: 1});
    java.revert({$class: 'int', $: 1}).should.equal(1);
    java.int().should.eql({$class: 'int', $: 0});
    java.revert({$class: 'int', $: 0}).should.equal(0);

    java.Short('101').should.eql({$class: 'java.lang.Short', $: 101});
    java.revert({$class: 'java.lang.Short', $: 101}).should.equal(101);
    java.short('101').should.eql({$class: 'short', $: 101});
    java.revert({$class: 'short', $: 101}).should.equal(101);
    java.short('str').should.eql({$class: 'short', $: 'str'});
    java.revert({$class: 'short', $: 'str'}).should.equal('str');
    java.short().should.eql({$class: 'short', $: 0});
    java.revert({$class: 'short', $: 0}).should.equal(0);

    java.byte('1').should.eql({$class: 'byte', $: 1});
    java.revert({$class: 'byte', $: 1}).should.equal(1);
    java.Byte('1').should.eql({$class: 'java.lang.Byte', $: 1});
    java.revert({$class: 'java.lang.Byte', $: 1}).should.equal(1);
    java.Byte().should.eql({$class: 'java.lang.Byte', $: null});
    should(java.revert({$class: 'java.lang.Byte', $: null})).equal(null);

    java.long('1').should.eql({$class: 'long', $: '1'});
    java.revert({$class: 'long', $: '1'}).should.equal('1');
    java.Long(1).should.eql({$class: 'java.lang.Long', $: 1});
    java.revert({$class: 'java.lang.Long', $: 1}).should.equal(1);
    java.long().should.eql({$class: 'long', $: 0});
    java.Long().should.eql({$class: 'java.lang.Long', $: null});

    java.double('1.02').should.eql({$class: 'double', $: 1.02});
    java.revert({$class: 'double', $: 1.02}).should.equal(1.02);
    java.double().should.eql({$class: 'double', $: 0});
    java.revert({$class: 'double', $: 0}).should.equal(0);
    java.Double('1').should.eql({$class: 'java.lang.Double', $: 1});
    java.revert({$class: 'java.lang.Double', $: 1}).should.equal(1);
    java.Double().should.eql({$class: 'java.lang.Double', $: null});
    should(java.revert({$class: 'java.lang.Double', $: null})).equal(null);

    java.float('1').should.eql({$class: 'float', $: 1});
    java.revert({$class: 'float', $: 1}).should.equal(1);
    java.float().should.eql({$class: 'float', $: 0});
    java.revert({$class: 'float', $: 0}).should.equal(0);
    java.float('str').should.eql({$class: 'float', $: 'str'});
    java.revert({$class: 'float', $: 'str'}).should.equal('str');
    java.Float('1.03').should.eql({$class: 'java.lang.Float', $: 1.03});
    java.revert({$class: 'java.lang.Float', $: 1.03}).should.equal(1.03);
    java.Float().should.eql({$class: 'java.lang.Float', $: null});
    should(java.revert({$class: 'java.lang.Float', $: null})).equal(null);

    java.String(123).should.eql({$class: 'java.lang.String', $: '123'});
    java.revert({$class: 'java.lang.String', $: '123'}).should.equal('123');
    java.String().should.eql({$class: 'java.lang.String', $: null});
    should(java.revert({$class: 'java.lang.String', $: null})).equal(null);

    java.char('2').should.eql({$class: 'char', $: '2'});
    java.revert({$class: 'char', $: '2'}).should.equal('2');
    java.chars('3').should.eql({$class: 'char[]', $: '3'});
    java.revert({$class: 'char[]', $: '3'}).should.equal('3');
    java.char().should.eql({$class: 'char', $: null});
    should(java.revert({$class: 'char', $: null})).equal(null);

    java.Character(1).should.eql({$class: 'java.lang.Character', $: '1'});
    java.revert({$class: 'java.lang.Character', $: '1'}).should.equal('1');
    java.List([]).should.eql({$class: 'java.util.List', $: []});
    java.revert({$class: 'java.util.List', $: []}).should.eql([]);
    java.Integer().should.eql({$class: 'java.lang.Integer', $: null});
    should(java.revert({$class: 'java.lang.Integer', $: null})).equal(null);
    java.Integer('a').should.eql({$class: 'java.lang.Integer', $: 'a'});
    java.revert({$class: 'java.lang.Integer', $: 'a'}).should.equal('a');

  });

  it('should array work fine', function () {
    var result = {$class: '[java.lang.Short', $: [
      {
        $class: 'java.lang.Short',
        $: 1
      }
    ]};
    java.array('Short', [1]).should.eql(result);
    java.revert(result).should.eql([1]);

    result = {$class: '[com.java.Object', $: [{
      $class: 'com.java.Object',
      $: {}
    }]};
    java.array('com.java.Object', [{}]).should.eql(result);
    java.revert(result).should.eql([{}]);
  });

  it('should array.type work fine', function () {
    var result = {$class: '[java.lang.Integer', $: [
      { $: 1, $class: 'java.lang.Integer' },
      { $: 2, $class: 'java.lang.Integer' },
      { $: 3, $class: 'java.lang.Integer' }
    ]};
    java.array.Integer(['1', '2', 3]).should.eql(result);
    java.revert(result).should.eql([1, 2, 3]);
  });

  it('should dyadicArray work fine', function() {
    var result = {
      $class: '[[java.lang.Integer',
      $: [{
        $class: '[java.lang.Integer',
        $: [
          {
            $class: 'java.lang.Integer',
            $: 1,
          }
        ]
      }]
    };
    var result2 = {
      $class: '[[java.lang.Integer',
      $: [{
        $class: '[java.lang.Integer',
        $: [
          {
            $class: 'java.lang.Integer',
            $: null,
          }
        ]
      }]
    };
    java.dyadicArray.Integer([[1]]).should.eql(result);
    java.dyadicArray('java.lang.Integer', [['1']]).should.eql(result);
    java.dyadicArray('java.lang.Integer', [[null]]).should.eql(result2);
  });

  it('should abstractClass work ok', function () {
    var result = {
      $class: 'com.java.Object',
      $abstractClass: 'java.lang.Object',
      $: {}
    };
    java.abstract('java.lang.Object', 'com.java.Object', {}).should.eql(result);
    java.revert(result).should.eql({});
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
    var result = {
      $class: 'hessian.demo.Color',
      $: {name: 'RED'}
    };
    java.enum('hessian.demo.Color', 'RED').should.eql(result);
    java.enum('hessian.demo.Color', {name: 'RED'}).should.eql(result);
    java.revert(result).should.eql({name: 'RED'});

    result = {
      $class: 'xxx',
      $: null
    };
    java.enum('xxx').should.eql(result);
    should(java.revert(result)).equal(null);

    result = {
      $class: '[com.xxx',
      $: null
    };
    java.array.enum('com.xxx').should.eql(result);
    should(java.revert(result)).equal(null);

    result = {
      $class: '[com.xxx',
      $: [
        {
          $class: 'com.xxx',
          $: {
            name: 'aaa'
          }
        }
      ]
    };
    java.array.enum('com.xxx', ['aaa']).should.eql(result);
    java.array.enum('com.xxx', [{name: 'aaa'}]).should.eql(result);
    java.revert(result).should.eql([{name: 'aaa'}]);
  });

  it('should create Class', function () {
    var result = {
      $class: 'java.lang.Class',
      $: {name: 'java.lang.String'}
    };
    java.Class({name: 'java.lang.String'}).should.eql(result);
    java.Class('java.lang.String').should.eql(result);
    java.revert(result).should.eql({name: 'java.lang.String'});

    result = {
      $class: 'java.lang.Class',
      $: null
    };
    java.Class().should.eql(result);
    should(java.revert(result)).equal(null);

    result = {
      $class: 'java.lang.Class',
      $: {
        name: '[Ljava.lang.String;'
      }
    };
    java.Class('[java.lang.String').should.eql(result);
    java.Class('[Ljava.lang.String;').should.eql(result);
    java.Class('[Ljava.lang.String').should.eql(result);
    java.revert(result).should.eql({name: '[Ljava.lang.String;'});

    result = {
      $class: 'java.lang.Class',
      $: {
        name: '[Ljava.Lang.String;'
      }
    };
    java.Class('[Ljava.Lang.String').should.eql(result);
    java.revert(result).should.eql({name: '[Ljava.Lang.String;'});

    result = {
      $class: '[java.lang.Class',
      $: null
    };
    java.array.Class().should.eql(result);
    should(java.revert(result)).equal(null);

    result = {
      $class: '[java.lang.Class',
      $: [
        {
          $class: 'java.lang.Class',
          $: {
            name: 'aaa'
          }
        }
      ]
    };
    java.array.Class(['aaa']).should.eql(result);
    java.revert(result).should.eql([{name: 'aaa'}]);
  });

  it('should create Locale with out input `handle`', function () {
    var result = {
      $class: 'com.caucho.hessian.io.LocaleHandle',
      $: {value: 'zh_CN'}
    };
    java.Locale('zh_CN').should.eql(result);
    java.revert(result).should.eql({value: 'zh_CN'});

    result = {
      $class: '[com.caucho.hessian.io.LocaleHandle',
      $: null
    };
    java.array.Locale().should.eql(result);
    should(java.revert(result)).equal(null);

    result = {
      $class: '[com.caucho.hessian.io.LocaleHandle',
      $: [
        {
          $class: 'com.caucho.hessian.io.LocaleHandle',
          $: {
            value: 'zh_CN'
          }
        }
      ]
    };
    java.array.Locale(['zh_CN']).should.eql(result);
    java.revert(result).should.eql([{value: 'zh_CN'}]);
  });

  it('should create Locale with input `handle`', function () {
    var result = {
      $class: 'test.com.caucho.hessian.io.LocaleHandle',
      $: {value: 'zh_CN'}
    };
    java.Locale('zh_CN', 'test.com.caucho.hessian.io.LocaleHandle').should.eql(result);
    java.revert(result).should.eql({value: 'zh_CN'});

    result = {
      $class: 'com.caucho.hessian.io.LocaleHandle',
      $: null
    };
    java.Locale().should.eql(result);
    should(java.revert(result)).equal(null);
  });

  it('should create BigDecimal', function () {
    var result = {
      $class: 'java.math.BigDecimal',
      $: {value: '100.06'}
    };
    java.BigDecimal('100.06').should.eql(result);
    java.revert(result).should.eql({value: '100.06'});
    java.BigDecimal({value: '100.06'}).should.eql(result);
    java.BigDecimal({value: 100.06}).should.eql(result);
    java.BigDecimal({val: '100.06'}).should.eql({
      $class: 'java.math.BigDecimal',
      $: {value: '0'}
    });
    result = {
      $class: '[java.math.BigDecimal',
      $: [
        {
          $class: 'java.math.BigDecimal',
          $: {value: '100.06'}
        },
        {
          $class: 'java.math.BigDecimal',
          $: {value: '200.07'}
        }
      ]
    };
    java.array.BigDecimal(['100.06', '200.07']).should.eql(result);
    java.revert(result).should.eql([{value: '100.06'}, {value: '200.07'}]);

    result = {
      $class: '[java.math.BigDecimal',
      $: null
    };
    java.array.BigDecimal(null).should.eql(result);
    should(java.revert(result)).equal(null);
  });

  it('should check type with combile', function () {
    java('java.lang.Integer', '123').should.eql({$class: 'java.lang.Integer', $: 123});
    java.revert({$class: 'java.lang.Integer', $: 123}).should.equal(123);
    java('int', '123').should.eql({$class: 'int', $: 123});
    java.revert({$class: 'int', $: 123}).should.equal(123);
    java('java.lang.String', 123).should.eql({$class: 'java.lang.String', $: '123'});
    java.revert({$class: 'java.lang.String', $: '123'}).should.equal('123');
  });

  it('should create Currency', function () {
    java.Currency('CNY').should.eql({$class: 'java.util.Currency', $: {currencyCode: 'CNY'}});
    java.revert({$class: 'java.util.Currency', $: {currencyCode: 'CNY'}}).should.eql({currencyCode: 'CNY'});
    java.Currency({currencyCode: undefined}).should.eql({$class: 'java.util.Currency', $: null});
    java.Currency(undefined).should.eql({$class: 'java.util.Currency', $: null});
    should(java.revert({$class: 'java.util.Currency', $: null})).equal(null);
    java.Currency({currencyCode: 'CNY'}).should.eql({$class: 'java.util.Currency', $: {currencyCode: 'CNY'}});
    java.revert({$class: 'java.util.Currency', $: {currencyCode: 'CNY'}}).should.eql({currencyCode: 'CNY'});

    java.array.Currency([]).should.eql({$class: '[java.util.Currency', $: []});
    java.revert({$class: '[java.util.Currency', $: []}).should.eql([]);
    java.array.Currency().should.eql({$class: '[java.util.Currency', $: null});
    should(java.revert({$class: '[java.util.Currency', $: null})).equal(null);
    java.array.Currency(['CNY']).should.eql({$class: '[java.util.Currency', $: [{$class: 'java.util.Currency', $: {currencyCode: 'CNY'}}]});
    java.revert({$class: '[java.util.Currency', $: [{$class: 'java.util.Currency', $: {currencyCode: 'CNY'}}]}).should.eql([{currencyCode: 'CNY'}]);
  });

});
