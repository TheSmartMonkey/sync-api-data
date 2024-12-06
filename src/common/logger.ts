export class Logger {
  static info(message: string): void {
    console.log(message);
  }

  static error(error: unknown): void {
    console.error(error);
  }
}
