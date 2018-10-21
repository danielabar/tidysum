const fs = require('fs');

// https://medium.com/@dalaidunc/fs-readfile-vs-streams-to-read-text-files-in-node-js-5dd0710c80ea
async function processFile(file) {
  return new Promise(resolve => {
    const label = `read2-${file}`;
    console.time(label);
    const stream = fs.createReadStream(file, { encoding: 'utf8' });
    stream.on('data', data => {
      console.log(data);
      stream.destroy();
    });
    stream.on('close', () => {
      console.timeEnd(label);
      resolve();
    });
  });
}

module.exports = {
  processFile,
};
