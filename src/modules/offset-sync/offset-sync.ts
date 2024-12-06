import { Logger } from '@/common/logger';
import { OffsetSyncFields } from '@/models/offset-sync.model';

export async function initialOffsetSync<T>(apiDataRequest: () => Promise<T[]>, insertInDb: (data: T[]) => Promise<void>): Promise<void> {
  try {
    const response = await apiDataRequest();
    const dataWithSyncDate = setDbSyncFields(response);
    await insertInDb(dataWithSyncDate);
    Logger.info('Initial offset sync completed');
  } catch (error) {
    Logger.error(error);
  }
}

function setDbSyncFields<T>(data: T[]): (OffsetSyncFields & T)[] {
  return data.map((item) => ({ ...item, _syncDate: new Date().toISOString() }));
}
