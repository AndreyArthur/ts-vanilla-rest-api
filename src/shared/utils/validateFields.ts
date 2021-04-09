import AppError from '@shared/exceptions/AppError';

export default function validateFields(expected: any, data: any): any {
  Object.keys(expected).map((property) => {
    if (!Object.keys(data).includes(property)) {
      throw new AppError(`Field "${property}" is required`);
    }
  });

  Object.keys(data).map((property) => {
    if (!Object.keys(expected).includes(property)) {
      throw new AppError(`Field '${property}' is not valid`);
    }
  });

  entries(expected).map(([property, value]) => {
    if (value === '%number%') {
      if (typeof data[property] !== 'number') {
        throw new AppError(`Field '${property}' need be a number`);
      }
    }

    if (value.indexOf('%any%') > -1) {
      const requiredChars = value.replace(/%any%/g, '').split('');

      let currentDataValue: string = data[property];

      requiredChars.map((char: string) => {
        if (currentDataValue.indexOf(char) > -1) {
          [, currentDataValue] = currentDataValue.split(char);

          return;
        }

        throw new AppError(`Field '${property}' has invalid pattern`);
      });
    }
  });

  function entries(obj: any): any[][] {
    return Object.keys(obj).map((property) => [property, obj[property]]);
  }

  return data;
}
