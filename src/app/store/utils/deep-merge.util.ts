/**
 * The `deepMerge` function recursively merges two objects, preserving nested structures and
 * overwriting values.
 * @param {any} value - The `value` parameter in the `isObject` function is a variable that can be of
 * any type. The function checks if this value is not `null` and if its type is `object`, returning a
 * boolean value based on this condition.
 * @returns The `deepMerge` function is returning a merged object of type `T`, which is a deep merge of
 * the `target` object and the `patch` object.
 */
export function deepMerge<T>(target: T, patch: Partial<T>): T {
  const result = { ...target };

  for (const key in patch) {
    const patchValue = patch[key];
    const targetValue = result[key];

    if (
      isObject(patchValue) &&
      isObject(targetValue) &&
      !Array.isArray(patchValue)
    ) {
      result[key] = deepMerge(
        targetValue as Record<string, any>,
        patchValue as Record<string, any>
      ) as T[Extract<keyof T, string>];
    } else {
      result[key] = patchValue as T[Extract<keyof T, string>];
    }
  }

  return result;
}

function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object';
}
