import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, json, splat, prettyPrint } = format;
import 'winston-daily-rotate-file';

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} - ${level}: ${JSON.stringify(message, null, 2)}`;
});

var transport = new transports.DailyRotateFile({
  filename: "./log/%DATE%.log",
  datePattern: "YYYY-MM-DD",
});

var logger = createLogger({
  format: combine(
    timestamp(),
    json(),
    splat(),
    prettyPrint(),
    myFormat,
  ),
  transports: [transport],
});

export default logger;