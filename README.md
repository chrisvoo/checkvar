# checkvar

It checks if a variable is empty or not and returns `true` (not empty) or `false` (empty) accordingly. It also can return a `CheckResponse` type as response, which also includes the variable type.  

```typescrypt
type CheckResponse = {
    type: CheckType
    result: boolean
}
```

This module doesn't strictly consider [truthy/falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) values, so if you checks `0` or `false`, you'll get `true` as result.  
Always use the `===` operator to check for booleans and `0` or `1`, use this module just to exclude the "emptiness" of a value.

## Definitions of emptiness

This module has the following rules:

* `null` and `undefined` are always considered empty, as as such the function will return `false`.
* `number` will be `false` only when the passed value is `NaN`. `0` will return `true` instead, as it may be a desired value.
* a `function` will be considered empty only if it's body is completely empty (comments are stripped away).
* `boolean`, `symbol` and `bigint` will always return `true`.
* a `string` will be considered empty if, after having being trimmed, its length is 0.
* an `object` will be considered empty if its JSON serialization returns `{}` or `'""'` (if it was a wrapper for a primitive type like `new String()`).
