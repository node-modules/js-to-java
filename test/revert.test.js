'use strict';

var assert = require('assert');
var vm = require('vm');
require('should');
var revert = require('../index').revert;

describe('revert: java to js', function() {
  it('should work with simple value', function() {
    var java = {
      $class: 'string',
      $: 'foo',
    };
    revert(java).should.equal('foo');

    java = {
      $class: 'int',
      $: 33,
    };
    revert(java).should.equal(33);

    java = {
      $class: 'long',
      $: 44,
    };
    revert(java).should.equal(44);

    java = {
      $class: 'boolean',
      $: true,
    };
    revert(java).should.equal(true);

    revert(33).should.equal(33);
    revert('foo').should.equal('foo');
    revert(true).should.equal(true);
  });

  it('should work with error', function() {
    var error = new Error();
    error.message = 'this is a java IOException instance';
    error.name = 'java.io.IOException';
    error.cause = error;
    var java = {
      $class: 'java.io.IOException',
      $: error,
    };
    revert(java).should.equal(error);
  });

  it('should work with nested object', function() {
    var java = {
      $class: 'xxxx',
      $: {
        $class: 'gggg',
        $: {
          $class: 'xxxxag',
          $: 'bar',
        },
      },
    };

    revert(java).should.equal('bar');

    java = {
      $class: 'xxxx',
      $: {
        foo: 'bar',
        bar: {
          $class: 'int',
          $: 3,
        },
      },
    };
    revert(java).should.eql({foo: 'bar', bar: 3});
  });

  it('should work with list', function() {
    var java = [2, 3, 5];
    revert(java).should.eql(java);

    java = [
      {$class: 'string', $: 'foo'},
      {$class: 'string', $: 'bar'},
      {$class: 'string', $: 'zoo'},
    ];
    revert(java).should.eql(['foo', 'bar', 'zoo']);
  });

  it('should work when used with cycular reference', function() {
    var java, result;

    java = {
      $class: 'xxxxx',
      $: {
        foo: 'bar',
      },
    };
    java.$.parent_node = java;

    result = {foo: 'bar'};
    result.parent_node = result;
    revert(java).should.eql(result);

    java = {
      $class: 'xxxxx',
      $: {
        foo: {
          $class: 'yyyyy',
          $: {
            a: 'barz',
            b: {
              $class: 'zzzzz',
              $: {
                c: 'barzz'
              }
            }
          },
        },
      },
    };
    java.$.parent_node = java;
    java.$.foo.$.parent_node = java.$.foo;
    java.$.foo.$.parent_node2 = java.$.foo.$;
    java.$.foo.$.ancestor_node = java;
    java.$.foo.$.ancestor_node2 = java.$;
    java.$.foo.$.b.$.parent_node = java.$.foo.$.b.$;
    result = {foo: {a: 'barz', b: {c: 'barzz'}}};
    result.parent_node = result;
    result.foo.parent_node = result.foo;
    result.foo.parent_node2 = result.foo;
    result.foo.ancestor_node = result;
    result.foo.ancestor_node2 = result;
    result.foo.b.parent_node = result.foo.b;
    revert(java).should.eql(result);

    java = {
      $class: 'xxList',
      $: [
        {
          $class: 'java.lang.object',
          $: {
            foo: 'bar',
          },
        },
        {
          $class: 'java.lang.object',
          $: {
            bar: {
              $class: 'java.lang.object',
              $: {
                foo: 'bar',
              },
            },
          }
        },
      ],
    };
    java.$[1].$.brother = java.$[0];
    java.$[1].$.brother2 = java.$[0].$;
    java.$[1].$.bar.$.parent_node = java.$[1].$.bar;
    java.$[1].$.bar.$.parent_node2 = java.$[1].$.bar.$;
    result = [{foo: 'bar'}, {bar: {foo: 'bar'}}];
    result[1].brother = result[0];
    result[1].brother2 = result[0];
    result[1].bar.parent_node = result[1].bar;
    result[1].bar.parent_node2 = result[1].bar;
    revert(java).should.eql(result);

    java = {
      $class: 'xxList',
      $: [
        {
          $class: 'java.lang.Object',
          $: {
            foo: 'bar',
          },
        },
      ],
    };
    java.$[1] = java.$[0];
    result = [{foo: 'bar'}];
    result[1] = result[0];
    revert(java).should.eql(result);
  });

  it('should work in vm', function() {
    revert(new vm.Script(`33`).runInNewContext({})).should.equal(33);
    revert(new vm.Script(`'foo'`).runInNewContext({})).should.equal('foo');
    revert(new vm.Script(`true`).runInNewContext({})).should.equal(true);

    assert.deepEqual(revert(new vm.Script(`new Boolean(true)`).runInNewContext({})), new Boolean(true));
    assert.deepEqual(revert(new vm.Script(`new Date('2023-01-01')`).runInNewContext({})), new Date('2023-01-01'));
    assert.deepEqual(revert(new vm.Script(`new Number(1)`).runInNewContext({})), new Number(1));
    assert.deepEqual(revert(new vm.Script(`new RegExp(/[12]/)`).runInNewContext({})), new RegExp(/[12]/));
    assert.deepEqual(revert(new vm.Script(`new String('foo')`).runInNewContext({})), new String('foo'));

    var java = new vm.Script(`[
      {$class: 'string', $: 'foo'},
      {$class: 'string', $: 'bar'},
      {$class: 'string', $: 'zoo'},
    ]`).runInNewContext({});
    revert(java).should.eql(['foo', 'bar', 'zoo']);

    var error = new Error();
    error.message = 'this is a java IOException instance';
    error.name = 'java.io.IOException';
    error.cause = error;
    assert.deepEqual(revert(new vm.Script(`var error = new Error();
      error.message = 'this is a java IOException instance';
      error.name = 'java.io.IOException';
      error.cause = error;
      var java = {
        $class: 'java.io.IOException',
        $: error,
      };`).runInNewContext({})), error);

    class javaError extends Error {
      constructor(message) {
        super(message);
        this.name = 'java.io.IOException';
        this.cause = this;
      }
    }
    var error2 = new javaError('this is a java IOException instance');

    assert.deepEqual(revert(new vm.Script(`class javaError extends Error {
      constructor(message) {
        super(message);
        this.name = 'java.io.IOException';
        this.cause = this;
      }
    }
    var error2 = new javaError('this is a java IOException instance');
    var java = {
      $class: 'java.io.IOException',
      $: error2,
    };
    java`).runInNewContext({})), error2);
  });
});
