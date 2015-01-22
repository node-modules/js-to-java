/**!
 * js-to-java - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

var combine = function (type, value) {
  if (value == null) {
    return null;
  }
  if (typeof type === 'string') {
    type = {
      name: type,
      valid: ignore
    };
  }
  return {
    $class: type.name,
    $: type.valid(value)
  };
};

var combineArray = function (type, value) {
  var values = [];
  for (var i = 0, len = value.length; i < len; i++) {
    values.push(combine(type, value[i]));
  }
  return {
    $class: '[' + (type.name || type),
    $: values
  };
};

/**
 * java('com.java.Object', {})
 * =>
 * {
 *   $class: 'com.java.Object',
 *   $: {}
 * }
 * @param {String} className
 * @param {Mixed} value
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

// valid list
function ignore(val) {return val;}
function bool(val) {return !!bool;}
function integer(val) {return parseInt(val, 10)}
// parseInt;
// parseFloat;
// String

var simpleTypeMap = exports.simpleTypeMap = {
  Boolean: {name: 'java.lang.Boolean', valid: bool},
  boolean: {name: 'boolean', valid: bool},
  Integer: {name: 'java.lang.Integer', valid: integer},
  int: {name: 'int', valid: integer},
  short: {name: 'short', valid: integer},
  Short: {name: 'java.lang.Short', valid: integer},
  byte: {name: 'byte', valid: integer},
  Byte: {name: 'java.lang.Byte', valid: integer},
  // long support both string and number
  long: {name: 'long', valid: ignore},
  Long: {name: 'java.lang.Long', valid: ignore},
  double: {name: 'double', valid: parseFloat},
  Double: {name: 'java.lang.Double', valid: parseFloat},
  float: {name: 'float', valid: parseFloat},
  Float: {name: 'java.lang.Float', valid: parseFloat},
  String: {name: 'java.lang.String', valid: String},
  char: {name: 'char', valid: String},
  chars: {name: 'char[]', valid: String},
  Character: {name: 'java.lang.Character', valid: String},
  List: {name: 'java.util.List', valid: ignore},
  Set: {name: 'java.util.Set', valid: ignore},
  Iterator: {name: 'java.util.Iterator', valid: ignore},
  Enumeration: {name: 'java.util.Enumeration', valid: ignore},
  HashMap: {name: 'java.util.HashMap', valid: ignore},
  Map: {name: 'java.util.Map', valid: ignore},
  Dictionary: {name: 'java.util.Dictionary', valid: ignore},
};

/**
 * java.Boolean(true);
 * =>
 * {
 *   $class: 'java.lang.Boolean',
 *   $: true
 * }
 */

Object.keys(simpleTypeMap).forEach(function (key) {
  exports[key] = function (val) {
    return combine(simpleTypeMap[key], val);
  };
});

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
  return combineArray(className, val);
};

/**
 * java.array.Boolean([true, false]);
 * =>
 * {
 *   $class: '[java.lang.Boolean',
 *   $: [true, false]
 * }
 */

Object.keys(simpleTypeMap).forEach(function (key) {
  exports.array[key] = function (val) {
    return combineArray(simpleTypeMap[key], val);
  };
});

/**
 * java abstract class
 *
 * @param {String} abstractClassName
 * @param {String} className
 * @param {Object} val
 * @return {Object}
 */

exports.abstract = function (abstractClassName, className, val) {
  if (val == null) {
    return null;
  }
  var res = combine(className, val);
  res.$abstractClass = abstractClassName;
  return res;
};

/**
 * java.enum("hessian.demo.Color", "RED");
 * =>
 * {
 *   $class: 'hessian.demo.Color',
 *   $: { name: 'RED' }
 * }
 */
exports.enum = function (className, name) {
  if (name == null) {
    return null;
  }
  return combine(className, {
    name: name
  });
};

/**
 * java.Class("java.lang.String");
 * =>
 * {
 *   $class: 'java.lang.Class',
 *   $: { name: 'java.lang.String' }
 * }
 */
exports.Class = function (name) {
  if (name == null) {
    return null;
  }
  return combine('java.lang.Class', {
    name: name
  });
};

/**
 * // for java.util.Locale
 * java.Locale("zh_CN");
 * =>
 * {
 *   $class: 'com.caucho.hessian.io.LocaleHandle',
 *   $: { value: 'zh_CN' }
 * }
 */
exports.Locale = function (locale, handle) {
  if (locale == null) {
    return null;
  }
  return combine(handle || 'com.caucho.hessian.io.LocaleHandle', {
    value: locale
  });
};
