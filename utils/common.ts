/**
 * Checks if a value is truthy, considering boolean `true` and the string "true".
 *
 * @param {string | boolean | null | undefined} value - The value to check.
 * @returns {boolean} Returns `true` if the value is a boolean `true` or the string "true", otherwise returns `false`.
 *
 * @example
 * // Example usage:
 * console.log(isTrue(true));    // true
 * console.log(isTrue("true"));  // true
 * console.log(isTrue("True"));  // true
 * console.log(isTrue("FALSE")); // false
 * console.log(isTrue(false));   // false
 * console.log(isTrue("other")); // false
 * console.log(isTrue(""));      // false
 * console.log(isTrue(null));    // false
 * console.log(isTrue(undefined));// false
 */
export const isTrue = (value: string | boolean | null | undefined, defaultValue = false): boolean => {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  return typeof value === "boolean" ? value : value.toLowerCase() === "true";
};
