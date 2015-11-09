'use strict';

var DELIMITER = '_$$$_';

// {$class: 'xx', $: {foo: 'bar'}} => {foo: 'bar'}
function derecycle(java, refs, path) {
  refs = refs || [];
  path = path || '';

  // simple type, null, undefined
  if (typeof java !== 'object' ||
             java === null ||
             //java === undefined ||
             java instanceof Boolean ||
             java instanceof Date ||
             java instanceof Number ||
             java instanceof RegExp ||
             java instanceof String) {
    return java;
  }

  // plain object, array

  // cycular reference detection
  var cache;
  for (var i = 0, l = refs.length; i < l; i++) {
    cache = refs[i];
    if (cache.key === java) {
      return {
        $ref: cache.path, // path to root, ig. 'path_$$$_to_$$$_root'
      };
    }
  }

  refs.push({
    key: java,
    path: path,
  });

  var result;
  if (java.$class) {
    result = derecycle(java.$, refs, path);
  /*
  } else if (java instanceof Map) {
    result = {};
    java.forEach(function(v, k) {
      k = derecycle(k, refs);
      result[k] = derecycle(v, refs, path ? path + DELIMITER + k : k);
    });
  */
  } else if (java instanceof Array) {
    result = [];
    java.forEach(function(v, i) {
      result[i] = derecycle(v, refs, path ? path + DELIMITER + i : i + '');
    });
  } else if (java instanceof Error) {
    result = java;
  } else {
    // plain object
    result = {};
    for (var i in java) {
      result[i] = derecycle(java[i], refs, path ? path + DELIMITER + i : i);
    }
  }

  return result;
}

// obj = {
//   a: {
//     b: 1
//   }
// }
// retrieve(obj, 'a_$$$_b') => 1
function retrieve(obj, path) {
  if (!path) {
    return obj;
  }

  var arr = path.split(DELIMITER);
  var result = obj;
  for (var i = 0, l = arr.length; i < l; i++) {
    result = result[arr[i]];
  }
  return result;
}

function retrocycle(js, root) {
  if (!root) {
    root = js;
  }

  var i, l, item, path;

  if (js && typeof js === 'object') {
    if (js instanceof Array) {
      for (i = 0, l = js.length; i < l; i++) {
        item = js[i];
        if (item && typeof item === 'object') {
          path = item.$ref;
          if (typeof path === 'string') {
            js[i] = retrieve(root, path);
          } else {
            retrocycle(item, root);
          }
        }
      }
    } else if (js instanceof Error) {
      return js;
    } else {
      for (i in js) {
        item = js[i];
        if (item && typeof item === 'object') {
          path = item.$ref;
          if (typeof path === 'string') {
            js[i] = retrieve(root, path);
          } else {
            retrocycle(item, root);
          }
        }
      }
    }
  }
  return js;
}

function java2js(java) {
  return retrocycle(derecycle(java));
}

module.exports = java2js;
