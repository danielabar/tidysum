const fs = require('fs');
const logger = require('./logger');

// https://medium.com/@dalaidunc/fs-readfile-vs-streams-to-read-text-files-in-node-js-5dd0710c80ea
async function processFile(file) {
  return new Promise(resolve => {
    const stream = fs.createReadStream(file, { encoding: 'utf8' });
    stream.on('data', data => {
      logger.debug('stream chunk');
      const lines = data.split('\n');
      lines.forEach(line => logger.debug('read line', { data: line }));
      stream.destroy();
    });
    stream.on('close', () => {
      resolve();
    });
  });
}

module.exports = {
  processFile,
};
