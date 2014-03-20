/*!
 * js-to-java - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

var combine = function (className, value) {
  return {
    $class: className,
    $: value
  };
};

/**
 * java('com.java.Object', {})
 * =>
 * {
 *   $class: 'com.java.Object',
 *   $: {}
 * }
 * @param {[type]} className [description]
 * @param {[type]} value [description]
 * @return {[type]} [description]
 */
exports = module.exports = function (className, value) {
  return combine(className, value);
};

exports.__defineSetter__('combine', function (fn) {
  combine = fn;
});

exports.__defineGetter__('combine', function () {
  return combine;
});

var simpleTypeMap = exports.simpleTypeMap = {
  Boolean: 'java.lang.Boolean',
  boolean: 'boolean',
  Integer: 'java.lang.Integer',
  int: 'int',
  short: 'short',
  Short: 'java.lang.Short',
  byte: 'byte',
  Byte: 'java.lang.Byte',
  long: 'long',
  Long: 'java.lang.Long',
  double: 'double',
  Double: 'java.lang.Double',
  float: 'float',
  Float: 'java.lang.Float',
  String: 'java.lang.String',
  char: 'char',
  chars: 'char[]',
  Character: 'java.lang.Character',
  List: 'java.util.List',
  Set: 'java.util.Set',
  Iterator: 'java.util.Iterator',
  Enumeration: 'java.util.Enumeration',
  HashMap: 'java.util.HashMap',
  Map: 'java.util.Map',
  Dictionary: 'java.util.Dictionary'
};

/**
 * java.Boolean(true);
 * =>
 * {
 *   $class: 'java.lang.Boolean',
 *   $: true
 * }
 */
for (var key in simpleTypeMap) {
  (function (key) {
    exports[key] = function (val) {
      return combine(simpleTypeMap[key], val);
    };
  })(key);
}

/**
 * java.array('Boolean', [true, false]);
 * =>
 * {
 *   $class: '[java.lang.Boolean',
 *   $: [true, false]
 * }
 *
 * @param {String} className class name in array
 * @param {Array} val
 */
exports.array = function (className, val) {
  className = simpleTypeMap[className] || className;
  return combine('[' + className, val);
};

/**
 * java.array.Boolean([true, false]);
 * =>
 * {
 *   $class: '[java.lang.Boolean',
 *   $: [true, false]
 * }
 */
for (var key in simpleTypeMap) {
  (function (key) {
    exports.array[key] = function (val) {
      return combine('[' + simpleTypeMap[key], val);
    };
  })(key);
}

