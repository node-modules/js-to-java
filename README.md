js-to-java [![Build Status](https://travis-ci.org/node-modules/js-to-java.svg?branch=master)](https://travis-ci.org/node-modules/js-to-java)
==========

easy way to wrap js object to java object.

in [hessian.js](https://github.com/node-modules/hessian.js), we need to write java classname with js object so make it encode as the write class.

## Install

[![NPM](https://nodei.co/npm/js-to-java.png?downloads=true)](https://nodei.co/npm/js-to-java/)

```bash
npm install js-to-java
```

## Usage

### Example

```js
var java = require('js-to-java');

// Java: com.java.Object o = new com.java.Object();
java('com.java.Object', {}); // => {$class: 'com.java.Object', $: {}}

// Java: Boolean r;
java.Boolean(true); // => {$class: 'java.lang.Boolean', $: true}

// Java: short[] shorts = new short[] {1, 2, 3};
java.array('short', [1, 2, 3]); // => {$class: '[short', $: [1, 2, 3]}

// Java: int[] ints = new int[] {1, 2, 3};
java.array('int', [1, 2, 3]); // same to the next example
java.array.int([1, 2, 3]); // => {$class: '[int', $: [1, 2, 3]}
```

### Type Mapping

```js
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
```

### abstract class

```js
java.abstract('AbstractClass', 'Class', {foo: 'bar'});
```

### Custom combineFunction

```
var java =require('js-to-java');
java.combine = function (className, value) {
  return {
    className: className,
    value: value
  };
};
java('com.test.Object', {}); // =>{className: 'com.test.Object', value: {}}
```

## License
MIT
