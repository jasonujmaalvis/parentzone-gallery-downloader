import fs from 'fs';

export const mkDirPromise = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, (err) => {
      err ? reject(err) : resolve();
    });
  });
};
