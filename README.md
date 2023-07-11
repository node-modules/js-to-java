# js-to-java

[![NPM version][npm-image]][npm-url]
[![CI](https://github.com/node-modules/js-to-java/actions/workflows/nodejs.yml/badge.svg)](https://github.com/node-modules/js-to-java/actions/workflows/nodejs.yml)
[![Test coverage][cov-image]][cov-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/js-to-java.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-to-java
[cov-image]: http://codecov.io/github/node-modules/js-to-java/coverage.svg?branch=master
[cov-url]: http://codecov.io/github/node-modules/js-to-java?branch=master
[download-image]: https://img.shields.io/npm/dm/js-to-java.svg?style=flat-square
[download-url]: https://npmjs.org/package/js-to-java

Easy way to wrap js object to java object.

In [hessian.js](https://github.com/node-modules/hessian.js), we need to write java classname with js object so make it encode as the write class.

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
java('com.java.Object', { foo: 'bar' });
// => {$class: 'com.java.Object', $: { foo: 'bar' }}

// Java: Boolean r;
java.Boolean(true);
// => {$class: 'java.lang.Boolean', $: true}

// Java: short[] shorts = new short[] {1, 2, 3};
java.array('short', [1, 2, 3]);
// => {$class: '[short', $: [1, 2, 3]}

// Java: int[] ints = new int[] {1, 2, 3};
java.array('int', [1, 2, 3]);
// same to the next example
java.array.int([1, 2, 3]);
// => {$class: '[int', $: [1, 2, 3]}
```

## API

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
  Collection: 'java.util.Collection',
  Iterator: 'java.util.Iterator',
  Enumeration: 'java.util.Enumeration',
  HashMap: 'java.util.HashMap',
  Map: 'java.util.Map',
  Dictionary: 'java.util.Dictionary'
```

### java.abstract(abstractClassname, classname, value)

abstract class

```js
java.abstract('com.demo.Parent', 'com.demo.Child', { foo: 'bar' });
// => { $abstractClass: 'com.demo.Parent', $class: 'com.demo.Child', $: { foo: 'bar' } }
```

### java[.combine](classname, value)

Custom combineFunction:

```js
java.combine('com.test.Object', { foo: 'bar' });
java('com.test.Object', { foo: 'bar' });
// => { $class: 'com.test.Object', $: { foo: 'bar' } }
```

### java.Class(classname)

```js
java.Class('java.lang.String');
// => { $class: 'java.lang.Class', $: { name: 'java.lang.String' } }
```

### java.Locale(locale, handle)

```js
java.Locale('zh_CN', ['com.caucho.hessian.io.LocaleHandle']);
// => { $class: 'com.caucho.hessian.io.LocaleHandle', $: { value: 'zh_CN' } }
```

### java.BigDecimal(decimal)

```js
java.BigDecimal('100.06');
// Or java.BigDecimal({value: '100.06'});
// => { $class: 'java.math.BigDecimal', $: { value: '100.06' } }
```

### java.enum(classname, value)

```js
java.enum('hessian.demo.Color', 'RED');
  or
java.enum('hessian.demo.Color', {name: 'RED'});
// => { $class: 'hessian.demo.Color', $: { name: 'RED' } }
```

### java.array(classname, values)

```js
java.array('Boolean', [true, false]);
// => { $class: '[java.lang.Boolean' $: [true, false] }
```

Available built-in classes shortcuts:

- `java.array.Boolean(values)`
- `java.array.boolean(values)`
- `java.array.Integer(values)`
- `java.array.int(values)`
- `java.array.short(values)`
- `java.array.Short(values)`
- `java.array.byte(values)`
- `java.array.Byte(values)`
- `java.array.long(values)`
- `java.array.Long(values)`
- `java.array.double(values)`
- `java.array.Double(values)`
- `java.array.float(values)`
- `java.array.Float(values)`
- `java.array.String(values)`
- `java.array.char(values)`
- `java.array.chars(values)`
- `java.array.Character(values)`
- `java.array.List(values)`
- `java.array.Set(values)`
- `java.array.Iterator(values)`
- `java.array.Enumeration(values)`
- `java.array.HashMap(values)`
- `java.array.Map(values)`
- `java.array.Dictionary(values)`

### java.exception(err[, className])

default className is `java.lang.Exception`.

```js
{
  '$class': `${className}`,
  '$': {
    detailMessage: {
      '$class': 'java.lang.String',
      '$': `${err.name}: ${err.message}`,
    },
    stackTrace: {
      '$class': '[java.lang.StackTraceElement',
      '$': stackTraceElements,
    },
  },
}
```

### java.revert(obj)

Wrap java object back to js object reversely.

```js
var data = {
  $class: 'xxxx',
  $: {
    foo: 'bar',
    bar: {
      $class: 'int',
      $: 3,
    },
  },
};
java.revert(data);
// => {foo: 'bar', bar: 3}
```

## License

[MIT](LICENSE)

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/985607?v=4" width="100px;"/><br/><sub><b>dead-horse</b></sub>](https://github.com/dead-horse)<br/>|[<img src="https://avatars.githubusercontent.com/u/1400114?v=4" width="100px;"/><br/><sub><b>coolme200</b></sub>](https://github.com/coolme200)<br/>|[<img src="https://avatars.githubusercontent.com/u/156269?v=4" width="100px;"/><br/><sub><b>fengmk2</b></sub>](https://github.com/fengmk2)<br/>|[<img src="https://avatars.githubusercontent.com/u/14790466?v=4" width="100px;"/><br/><sub><b>greenkeeperio-bot</b></sub>](https://github.com/greenkeeperio-bot)<br/>|[<img src="https://avatars.githubusercontent.com/u/456108?v=4" width="100px;"/><br/><sub><b>shaoshuai0102</b></sub>](https://github.com/shaoshuai0102)<br/>|[<img src="https://avatars.githubusercontent.com/u/1207064?v=4" width="100px;"/><br/><sub><b>gxcsoccer</b></sub>](https://github.com/gxcsoccer)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |
[<img src="https://avatars.githubusercontent.com/u/17831480?v=4" width="100px;"/><br/><sub><b>mytEcust</b></sub>](https://github.com/mytEcust)<br/>|[<img src="https://avatars.githubusercontent.com/u/32174276?v=4" width="100px;"/><br/><sub><b>semantic-release-bot</b></sub>](https://github.com/semantic-release-bot)<br/>|[<img src="https://avatars.githubusercontent.com/u/15973504?v=4" width="100px;"/><br/><sub><b>zhaoleipeng</b></sub>](https://github.com/zhaoleipeng)<br/>

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Tue Jul 11 2023 11:39:26 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->
