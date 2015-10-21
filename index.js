/**!
 * js-to-java - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

var combine = function (type, value) {
  if (typeof type === 'string') {
    type = simpleTypeMap[type] || {
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
  var values = null;
  if (value) {
    values = [];
    for (var i = 0, len = value.length; i < len; i++) {
      values.push(combine(type, value[i]));
    }
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

function bool(val) {return !!val;}

function baseInt(val) {
  return val == null ? 0 : integer(val);
}

function baseFloat(val) {
  return val == null ? 0 : float(val);
}

function float(val) {
  if (val == null) {
    return null;
  }
  var r = parseFloat(val);
  return isNaN(r) ? val : r;
}

function integer(val) {
  if (val == null) {
    return null;
  }
  var r = parseInt(val, 10);
  return isNaN(r) ? val : r;
}

function string(val) {
  if (val == null) {
    return null;
  }
  return String(val);
}

function safeLong(val) {
  if (process.env.NODE_ENV !== 'production' && typeof val !== 'string') {
    console.warn('Long value: %d is a Number, Use String type will be more safe!', val);
  }
  return val;
}

var simpleTypeMap = exports.simpleTypeMap = {
  Boolean: {name: 'java.lang.Boolean', valid: bool},
  boolean: {name: 'boolean', valid: bool},
  Integer: {name: 'java.lang.Integer', valid: integer},
  int: {name: 'int', valid: baseInt},
  short: {name: 'short', valid: baseInt},
  Short: {name: 'java.lang.Short', valid: integer},
  byte: {name: 'byte', valid: integer},
  Byte: {name: 'java.lang.Byte', valid: integer},
  // long support both string and number
  long: {name: 'long', valid: safeLong},
  Long: {name: 'java.lang.Long', valid: safeLong},
  double: {name: 'double', valid: baseFloat},
  Double: {name: 'java.lang.Double', valid: float},
  float: {name: 'float', valid: baseFloat},
  Float: {name: 'java.lang.Float', valid: float},
  String: {name: 'java.lang.String', valid: string},
  char: {name: 'char', valid: string},
  chars: {name: 'char[]', valid: string},
  Character: {name: 'java.lang.Character', valid: string},
  List: {name: 'java.util.List', valid: ignore},
  Set: {name: 'java.util.Set', valid: ignore},
  Iterator: {name: 'java.util.Iterator', valid: ignore},
  Enumeration: {name: 'java.util.Enumeration', valid: ignore},
  HashMap: {name: 'java.util.HashMap', valid: ignore},
  Map: {name: 'java.util.Map', valid: ignore},
  Dictionary: {name: 'java.util.Dictionary', valid: ignore},
};

for (var key in simpleTypeMap) {
  var type = simpleTypeMap[key];
  simpleTypeMap[type.name] = type;
}

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
  var value;
  if (!name) {
    value = null;
  } else if (typeof name === 'string') {
    value = {name: name};
  } else if (typeof name === 'object' && name.name) {
    value = {name: name.name};
  } else {
    // Still to return the wrong value, when the error is convenient to find the reasons.
    value = name;
  }
  return combine(className, value);
};

exports.array.enum = function (className, names) {
  var values = null;
  if (names) {
    values = [];
    for (var i = 0, len = names.length; i < len; i++) {
      values.push(exports.enum(className, names[i]));
    }
  }
  return {
    $class: '[' + className,
    $: values
  };
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
  var value;
  if (!name) {
    value = null;
  } else if (typeof name === 'string') {
    value = {
      name: name.indexOf('[') !== -1 ? ('[L' + name.replace(/(\[L)|(\[)|;/g, '') + ';') : name
    };
  } else if (typeof name === 'object' && name.name) {
    value = {
      name: name.name
    };
  } else {
    // Still to return the wrong value, when the error is convenient to find the reasons.
    value = name;
  }
  return combine('java.lang.Class', value);
};

exports.array.Class = function (names) {
  var values = null;
  if (names) {
    values = [];
    for (var i = 0, len = names.length; i < len; i++) {
      values.push(exports.Class(names[i]));
    }
  }
  return {
    $class: '[java.lang.Class',
    $: values
  };
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
  var value = locale ? {
    value: locale
  } : null;
  return combine(handle || 'com.caucho.hessian.io.LocaleHandle', value);
};

exports.array.Locale = function (locales, handle) {
  var values = null;
  if (locales) {
    values = [];
    for (var i = 0, len = locales.length; i < len; i++) {
      values.push(exports.Locale(locales[i], handle));
    }
  }
  return {
    $class: '[' + (handle || 'com.caucho.hessian.io.LocaleHandle'),
    $: values
  };
};

/**
 * // for java.math.BigDecimal
 * java.BigDecimal("100.06");
 * =>
 * {
 *   $class: 'java.math.BigDecimal',
 *   $: { value: '100.06' }
 * }
 */
exports.BigDecimal = function (val) {
  return combine('java.math.BigDecimal', { value: String(val) });
};

exports.array.BigDecimal = function (vals) {
  var values = null;
  if (vals) {
    values = [];
    for (var i = 0, len = vals.length; i < len; i++) {
      values.push(exports.BigDecimal(vals[i]));
    }
  }
  return {
    $class: '[java.math.BigDecimal',
    $: values
  };
};

exports.Currency = function (value) {
  if (typeof value === 'string') {
    value = {
      currencyCode: value,
    };
  } else if (typeof value === 'object' && value.currencyCode) {
    value = {
      currencyCode: value.currencyCode,
    };
  } else if (!value || !value.currencyCode) {
    value = null;
  }
  return combine('java.util.Currency', value);
};

exports.array.Currency = function (vals) {
  var values = null;
  if (Array.isArray(vals)) {
    values = [];
    for (var i = 0, len = vals.length; i < len; i++) {
      values.push(exports.Currency(vals[i]));
    }
  }
  return {
    $class: '[java.util.Currency',
    $: values,
  };
};