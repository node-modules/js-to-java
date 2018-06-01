'use strict';

module.exports = function toException(err, className) {
  className = className || 'java.lang.Exception';
  var stackTraceElements = [];
  var lines = err.stack.match(/ at .+$/gm);
  if (lines) {
    // Error: foo
    // at repl:1:11
    // at REPLServer.defaultEval (repl.js:262:27)
    // at bound (domain.js:287:14)
    // at REPLServer.runBound [as eval] (domain.js:300:12)
    // at REPLServer.<anonymous> (repl.js:431:12)
    // at emitOne (events.js:82:20)
    // at REPLServer.emit (events.js:169:7)
    // at REPLServer.Interface._onLine (readline.js:211:10)
    // at REPLServer.Interface._line (readline.js:550:8)
    // at REPLServer.Interface._ttyWrite (readline.js:827:14)
    for (var line of lines) {
      var splits = line.replace(' at ', '').split('(');
      if (splits.length < 2) {
        splits.push(splits[0]);
        splits[0] = '<anonymous>.<anonymous>';
      }
      var declaring = splits[0];
      var lastIndexDot = declaring.lastIndexOf('.');
      var declaringClass = declaring.substring(0, lastIndexDot) || '<unknow>';
      var methodName = declaring.substring(lastIndexDot + 1).trim();

      var fileSplits = splits[1].split(':');
      var fileName = fileSplits[0].replace(')', '');
      var lineNumber = parseInt(fileSplits[1]) || 0;
      // if (isNaN(lineNumber)) {
      //   // ignore invaild format
      //   // e.g.: `at next (native)`
      //   continue;
      // }
      stackTraceElements.push({
        '$class': 'java.lang.StackTraceElement',
        '$': {
          declaringClass: { '$class': 'java.lang.String', '$': declaringClass },
          methodName: { '$class': 'java.lang.String', '$': methodName },
          fileName: { '$class': 'java.lang.String', '$': fileName },
          lineNumber: { '$class': 'int', '$': lineNumber },
        },
      });
    }
  }
  return {
    '$class': className,
    '$': {
      detailMessage: {
        '$class': 'java.lang.String',
        '$': err.name + ': ' + err.message,
      },
      stackTrace: {
        '$class': '[java.lang.StackTraceElement',
        '$': stackTraceElements,
      },
      cause: {
        '$class': 'java.lang.Throwable',
        '$': null,
      },
    },
  };
};
