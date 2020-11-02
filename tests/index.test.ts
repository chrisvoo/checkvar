import checkvar, { CheckResponse, CheckType } from '../src/index';

test('can correctly detect the types and their emptiness', () => {
  let result: CheckResponse = checkvar(0, true) as CheckResponse;
  expect(result.type).toBe(CheckType.NUMBER);
  expect(result.result).toBe(true);

  result = checkvar('0', true) as CheckResponse;
  expect(result.type).toBe(CheckType.STRING);
  expect(result.result).toBe(true);

  result = checkvar('  ', true) as CheckResponse;
  expect(result.type).toBe(CheckType.STRING);
  expect(result.result).toBe(false);

  // eslint-disable-next-line no-new-wrappers
  result = checkvar(new String(), true) as CheckResponse;
  expect(result.type).toBe(CheckType.OBJECT);
  expect(result.result).toBe(false);

  // eslint-disable-next-line no-new-wrappers
  result = checkvar(new String('hey'), true) as CheckResponse;
  expect(result.type).toBe(CheckType.OBJECT);
  expect(result.result).toBe(true);

  result = checkvar(null, true) as CheckResponse;
  expect(result.type).toBe(CheckType.NULL);
  expect(result.result).toBe(false);

  result = checkvar(undefined, true) as CheckResponse;
  expect(result.type).toBe(CheckType.UNDEFINED);
  expect(result.result).toBe(false);

  result = checkvar(false, true) as CheckResponse;
  expect(result.type).toBe(CheckType.BOOLEAN);
  expect(result.result).toBe(true);

  // eslint-disable-next-line no-new-wrappers
  result = checkvar(new Boolean(), true) as CheckResponse;
  expect(result.type).toBe(CheckType.OBJECT);
  expect(result.result).toBe(true);

  result = checkvar(parseInt('a', 10), true) as CheckResponse;
  expect(result.type).toBe(CheckType.NAN);
  expect(result.result).toBe(false);

  result = checkvar(BigInt(5), true) as CheckResponse;
  expect(result.type).toBe(CheckType.BIGINT);
  expect(result.result).toBe(true);

  result = checkvar(Symbol(5), true) as CheckResponse;
  expect(result.type).toBe(CheckType.SYMBOL);
  expect(result.result).toBe(true);

  result = checkvar([], true) as CheckResponse;
  expect(result.type).toBe(CheckType.ARRAY);
  expect(result.result).toBe(false);

  // eslint-disable-next-line no-array-constructor
  result = checkvar(new Array(), true) as CheckResponse;
  expect(result.type).toBe(CheckType.ARRAY);
  expect(result.result).toBe(false);

  result = checkvar(['s'], true) as CheckResponse;
  expect(result.type).toBe(CheckType.ARRAY);
  expect(result.result).toBe(true);

  result = checkvar({}, true) as CheckResponse;
  expect(result.type).toBe(CheckType.OBJECT);
  expect(result.result).toBe(false);

  result = checkvar({ a: 1 }, true) as CheckResponse;
  expect(result.type).toBe(CheckType.OBJECT);
  expect(result.result).toBe(true);

  result = checkvar(new Date(), true) as CheckResponse;
  expect(result.type).toBe(CheckType.OBJECT);
  expect(result.result).toBe(true);

  result = checkvar(() => {}, true) as CheckResponse;
  expect(result.type).toBe(CheckType.FUNCTION);
  expect(result.result).toBe(false);

  result = checkvar(() => {
    // single comment
    /* multiline
        comment */
  }, true) as CheckResponse;
  expect(result.type).toBe(CheckType.FUNCTION);
  expect(result.result).toBe(false);

  // eslint-disable-next-line arrow-body-style
  result = checkvar(() => {
    // single comment
    /* multiline
        comment */
    return 5;
  }, true) as CheckResponse;
  expect(result.type).toBe(CheckType.FUNCTION);
  expect(result.result).toBe(true);

  // eslint-disable-next-line prefer-arrow-callback
  result = checkvar(function hey() {
    return '';
  }, true) as CheckResponse;
  expect(result.type).toBe(CheckType.FUNCTION);
  expect(result.result).toBe(true);
});
