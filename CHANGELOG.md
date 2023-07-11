# Changelog

## [2.8.0](https://github.com/node-modules/js-to-java/compare/v2.7.0...v2.8.0) (2023-07-11)


### Features

* support revert array in vm ([#69](https://github.com/node-modules/js-to-java/issues/69)) ([dcb2384](https://github.com/node-modules/js-to-java/commit/dcb2384928c5eec1189d8f9fa3420079f42a11d2))

---


2.7.0 / 2021-04-25
==================

**fixes**
  * [[`19bb555`](http://github.com/node-modules/js-to-java/commit/19bb555118795b964374f10aa6bec9a0f65802fe)] - fix: add Enum for ts (#67) (赵磊鹏 <<872538464@qq.com>>)

2.6.1 / 2019-01-30
==================

  * fix: enum default use  https://github.com/alipay/sofa-hessian-node/pull/14 (#63)

2.6.0 / 2018-06-01
==================

**fixes**
  * [[`8a9a7da`](http://github.com/node-modules/js-to-java/commit/8a9a7da99e90a215c8073d2c2ea4675c99e30d5d)] - fix: add cause prop to exception (#60) (zōng yǔ <<gxcsoccer@users.noreply.github.com>>)

**others**
  * [[`8324a91`](http://github.com/node-modules/js-to-java/commit/8324a91eefb147280ee1eda47bf75445a61de124)] - chore: fix version (#58) (zōng yǔ <<gxcsoccer@users.noreply.github.com>>)

2.5.0 / 2018-02-27
==================

  * feat: 增加 collection (#57)
  * chore(package): update should to version 10.0.0

2.4.0 / 2016-06-07
==================

  * feat: convert js error to java exception (#44)

2.3.5 / 2016-03-30
==================

  * fix: Boolean null
  * fix: Long == null should return null

2.3.4 / 2016-03-09
==================

  * fix: bigdecimal support {value}

2.3.3 / 2016-01-08
==================

  * chore: rm safeLong warn
  * chore(package): update should to version 8.0.2

2.3.1 / 2015-11-27
==================

  * chore: rm 0.10 test
  * fix: long prompt info

2.3.0 / 2015-11-09
==================

  * chore: jslint and ci
  * feat: add revert method as an implementation of java to js
  * chore(package): update dependencies

2.2.0 / 2015-10-21
==================

 * chore: add env check
 * feat: currency & safeLong
 * chore: use codecov.io

2.1.0 / 2015-09-07 
==================

  * feat: support java.math.BigDecimal

2.0.7 / 2015-07-06
==================

  * fix: Class({name:})

2.0.6 / 2015-04-02
==================

  * fix(class): array type

2.0.5 / 2015-03-13
==================

  * feat(combile): add check in combile

2.0.4 / 2015-03-09
==================

  * perf(enum): Improve the enumeration type conversion

2.0.3 / 2015-02-03
==================

  * feat(array): class enum locale

2.0.2 / 2015-01-28
==================

  * fix(valid): string & boolean; add null type test

2.0.1 / 2015-01-28 
==================

  * fix(null): null should target type; modify int type valid

2.0.0 / 2015-01-22 
==================

  * feat(valid): #5 support valid & Null valud

1.1.0 / 2014-11-05 
==================

  * Merge pull request #3 from node-modules/more
  * feat(support): add java.lang.Class & java.util.Locale

1.0.0 / 2014-04-24
==================

  * Merge pull request #1 from node-modules/enum
  * fix github links
  * add enum() test cases
  * add enum() helper
  * add abstract in readme

0.0.3 / 2014-04-06
==================

  * add abstract
  * fix comment

0.0.2 / 2014-03-20
==================

  * add files in package
  * fix readme link
  * no need to use harmony istanbul

0.0.1 / 2014-03-20
==================

  * update readme
  * complete
  * Initial commit
