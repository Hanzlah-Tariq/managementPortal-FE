import {
  each,
  isEmpty,
  isArray,
  isObject,
  isString,
  camelCase,
  snakeCase,
} from 'lodash';

const transform = (body, transformFn) => {
  const transformObj = (obj) => {
    each(obj, (value, key) => {
      delete obj[key];
      obj[transformFn(key)] = value;
      if (!isString(value)) {
        transformObj(value);
      }
    });
  };

  if (isArray(body)) {
    each(body, (obj) => {
      if (isObject(obj)) {
        transformObj(obj);
      }
    });
  } else if (isObject(body)) {
    transformObj(body);
  }

  return body;
};

const transformKeys = {
  toCamelCase: (body) => {
    return isEmpty(body) ? body : transform(body, camelCase);
  },
  toSnakeCase: (body) => {
    return isEmpty(body) ? body : transform(body, snakeCase);
  },
};

export default transformKeys;
