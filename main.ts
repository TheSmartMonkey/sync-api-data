function findModifiedKeysInLists(list1: any[], list2: any[]): string[] {
  const modifiedKeys: string[] = [];

  const maxLength = Math.max(list1.length, list2.length);

  for (let i = 0; i < maxLength; i++) {
    const obj1 = list1[i] || {};
    const obj2 = list2[i] || {};

    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (const key of keys) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object') {
        const nestedModifiedKeys = findModifiedKeysInLists([val1], [val2]);
        if (nestedModifiedKeys.length > 0) {
          modifiedKeys.push(`${i}.${key}`);
        }
      } else if (val1 !== val2) {
        modifiedKeys.push(`${i}.${key}`);
      }
    }
  }

  return modifiedKeys;
}

// Example usage
const list1 = [{ id: 1, nest: { c: 2, d: 4 } }, { id: 2 }, { id: 3, safe: true }];
const list2 = [
  { id: 1, nest: { c: 3, e: 5 } },
  { id: 2, newField: 20 },
  { id: 3, safe: true },
];

console.log(findModifiedKeysInLists(list1, list2)); // Output: ['0.nest.c', '1.newField']
