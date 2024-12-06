import { getRequest } from '@/common/http-request';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { initialOffsetSync } from './offset-sync';

describe('initialOffsetSync unit tests', () => {
  let mock: MockAdapter;
  const _syncDate = new Date().toISOString();

  beforeEach(() => {
    mock = new MockAdapter(axios);
    global.Date.prototype.toISOString = jest.fn(() => _syncDate);
  });

  test('Should initial offset sync with sync date', async () => {
    // Given
    const url = '/api/data';
    const apiData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Jim' },
    ];
    mock.onGet(url).reply(200, apiData);

    // When
    await initialOffsetSync(
      async () => {
        const response = await getRequest<any[]>(url);
        return response.body;
      },
      async (data) => {
        // Then
        expect(data).toEqual([
          { id: 1, name: 'John', _syncDate },
          { id: 2, name: 'Jane', _syncDate },
          { id: 3, name: 'Jim', _syncDate },
        ]);
      },
    );
  });
});
