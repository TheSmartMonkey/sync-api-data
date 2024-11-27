import { HttpMessage, message } from 'sync-api-data';

if (require.main === module) {
  console.log('hello !');
  message();
  const test: HttpMessage = {} as HttpMessage;
}
