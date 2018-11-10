const fs = require('fs');
const path = require('path');
const winston = require('winston');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(__dirname, '../logs/app.log');
console.log(`logging at ${logFile}`); // eslint-disable-line no-console

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: logFile,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logger.on('error', function(err) {
  console.error('Unable to log', err); // eslint-disable-line no-console
});

module.exports = logger;
