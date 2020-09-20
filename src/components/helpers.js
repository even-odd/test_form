export function validateStr (value = '', regexp) {
    console.debug('validateStr: value', value);
    let prepared = value.toLocaleLowerCase();
    return regexp.test(prepared);
}