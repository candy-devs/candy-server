import fileLogger from "./fileLogger";

class LoggerWrapper {
  error(msg: any): void;
  error(msg: string, ...meta: any[]): void
  error(msg: any, ...meta: any[]): void {
    if (typeof msg === 'string')
      fileLogger.error(msg, meta);
    else
      fileLogger.error(msg);
  }

  info(msg: any): void;
  info(msg: string, ...meta: any[]): void
  info(msg: any, ...meta: any[]): void {
    if (typeof msg === 'string')
      fileLogger.info(msg, meta);
    else
      fileLogger.info(msg);
  }

  warn(msg: any): void;
  warn(msg: string, ...meta: any[]): void
  warn(msg: any, ...meta: any[]): void {
    if (typeof msg === 'string')
      fileLogger.warn(msg, meta);
    else
      fileLogger.warn(msg);
  }

}

const logger = new LoggerWrapper();

export default logger;
