import { findModifiedKeysInLists } from './sync';

describe('sync unit tests', () => {
  // TODO: fix this test
  test('Should test findModifiedKeysInLists', async () => {
    // Given
    const list1 = [{ id: 1, nest: { c: 2, d: 4 } }, { id: 2 }, { id: 3, safe: true }];
    const list2 = [
      { id: 1, nest: { c: 3, e: 5 } },
      { id: 2, newField: 20 },
      { id: 3, safe: true },
    ];

    // When
    const response = findModifiedKeysInLists(list1, list2);

    // Then
    expect(response).toEqual(4);
  });

  test('Should find modified keys in simple lists', async () => {
    // Given
    const apiData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Jim' },
    ];
    const dbData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Laurent' },
    ];

    // When
    const response = findModifiedKeysInLists(apiData, dbData);

    // Then
    expect(response).toEqual([{ id: 3, name: 'Laurent' }]);
  });
});
