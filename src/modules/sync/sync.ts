export function findModifiedKeysInLists(apiData: any[], dbData: any[]): any[] {
  const modifiedKeys: any[] = [];

  const map1 = new Map(apiData.map((item) => [item.id, item]));
  const map2 = new Map(dbData.map((item) => [item.id, item]));

  for (const [id, item1] of map1) {
    const item2 = map2.get(id);
    if (item2) {
      const modifiedFields = Object.keys(item2).filter((key) => item1[key] !== item2[key]);
      if (modifiedFields.length > 0) {
        modifiedKeys.push({ id, ...item2 });
      }
    }
  }

  return modifiedKeys;
}
