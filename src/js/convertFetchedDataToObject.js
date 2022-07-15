import lodash from 'lodash';

export const convertFetchedDataToObject = obj => {
  return lodash.map(obj, (value, key) => {
    if (
      lodash.isArray(value) ||
      lodash.isPlainObject(value) ||
      lodash.isObject(value)
    ) {
      return { key, value: convertFetchedDataToObject(value) };
    }

    return { key, value };
  });
};
