import winston, { createLogger } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.align(),
  winston.format.printf(
    ({ timestamp, level, message, stack }) =>
      `${timestamp} ${level.toUpperCase()}: ${message}${stack ? '\n' + stack : ''}\n`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/all.log' }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  })
];

const Logger = createLogger({
  level: level(),
  levels,
  format,
  transports
});

process.on('uncaughtException', (e) => {
  Logger.error(`UncaughtException - ${e.message}\n${e.stack}`, () => process.exit(1));
});

export default Logger;
