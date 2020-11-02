export const EMPTY: boolean = false;
export const NOT_EMPTY: boolean = true;

// This enum also includes items that aren't JS types, like array and NaN.
// They're here to provide more info.
export enum CheckType {
  NULL,
  NUMBER,
  BOOLEAN,
  SYMBOL,
  STRING,
  ARRAY,
  OBJECT,
  FUNCTION,
  BIGINT,
  NAN,
  UNDEFINED
}

export type CheckResponse = {
    type: CheckType
    result: boolean
}

/**
 * Checks if the specified element can be considered empty.
 * @param {any} el A javascript element of any type
 * @param {boolean} fullResponse Tells the function what to return as response
 * @returns {boolean|CheckResponse} true (not empty) or false (empty) or an object
 * which describe also its type.
 */
export default function checkvar(el: any, fullResponse: boolean = false): boolean | CheckResponse {
  let response: CheckResponse;

  if (el === null) {
    response = {
      type: CheckType.NULL,
      result: EMPTY,
    };
  } else if (el === undefined) {
    response = {
      type: CheckType.UNDEFINED,
      result: EMPTY,
    };
  } else if (typeof el === 'number') {
    if (Number.isNaN(el)) {
      response = {
        type: CheckType.NAN,
        result: EMPTY,
      };
    } else {
      response = {
        type: CheckType.NUMBER,
        result: NOT_EMPTY,
      };
    }
  } else if (typeof el === 'boolean') {
    response = {
      type: CheckType.BOOLEAN,
      result: NOT_EMPTY,
    };
  } else if (typeof el === 'bigint') {
    response = {
      type: CheckType.BIGINT,
      result: NOT_EMPTY,
    };
  } else if (typeof el === 'string') {
    response = {
      type: CheckType.STRING,
      result: el.trim().length !== 0,
    };
  } else if (Object.prototype.toString.call(el).indexOf('Function') > -1) {
    const theFunction: Function = el as Function;
    const m = theFunction!.toString().match(/\{([\s\S]*)\}/m)![1];
    const body = m
      .replace(/^\s*\/\/.*$/mg, '')
      .replace(/\/\*([\s\S]*?)\*\//g, '')
      .trim();

    response = {
      type: CheckType.FUNCTION,
      result: body.length !== 0,
    };
  } else if (typeof el === 'symbol') {
    response = {
      type: CheckType.SYMBOL,
      result: NOT_EMPTY,
    };
  } else if (typeof el === 'object') {
    if (Array.isArray(el)) {
      response = {
        type: CheckType.ARRAY,
        result: el.length !== 0,
      };
    } else {
      // here we also cover the primitive classes like new Date(), new Object(), new String(), etc
      const json = JSON.stringify(el);
      response = {
        type: CheckType.OBJECT,
        result: json !== '{}' && json !== '""',
      };
    }
  }

  return fullResponse === true ? response! : response!.result;
}
