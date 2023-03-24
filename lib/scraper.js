import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { logItemCompletion } from './helpers/index.js';
import { mkDirPromise } from './utils/index.js';

// Logs in the user
export async function loginUser({ email, password }) {
  const { data } = await axios.post('https://api.parentzone.me/v1/auth/login', {
    email,
    password,
  });

  return data;
}

// Creates a user session by returning an API key
export async function createSession({ id, password }) {
  const { data } = await axios.post(
    'https://api.parentzone.me/v1/auth/create-session',
    {
      id,
      password,
    },
    {
      headers: {
        'x-api-product': 'iConnect',
      },
    }
  );

  return data;
}

// Gets the media data
export async function getMedia(apiKey) {
  const { data } = await axios.get('https://api.parentzone.me/v1/gallery', {
    headers: {
      'x-api-key': apiKey,
    },
  });

  return data;
}

// Download the media
export async function downloadMedia({ media, apiKey, directory }) {
  return new Promise(async (resolve, reject) => {
    // Check to see if the media directory already exists
    const fullPathToMediaDir = path.resolve(directory);
    let skippedCount = 0;
    let downloadedCount = 0;

    // If the directory doesn't exist, create it
    if (!fs.existsSync(fullPathToMediaDir)) {
      await mkDirPromise(directory);
      logItemCompletion(`Created ${fullPathToMediaDir} directory`);
    }

    // Loop through all the media and download each one
    for (let i = 0; i < media.length; i++) {
      const item = media[i];
      const extension = item.type === 'image' ? 'jpeg' : 'mp4';
      const fileName = `${item.updated.split('T')[0]}-${item.id}.${extension}`;
      const itemPath = path.resolve(fullPathToMediaDir, fileName);

      // Check if item already exist, no need to download again
      if (fs.existsSync(itemPath)) {
        logItemCompletion(`Skipping ${fileName} already exists`);
        skippedCount++;
        continue;
      }

      await axios
        .get(
          `https://api.parentzone.me/v1/media/${item.id}/full?key=${apiKey}`,
          {
            responseType: 'stream',
          }
        )
        .then((response) => {
          // Create the file
          response.data.pipe(fs.createWriteStream(itemPath));

          // On complete log it in the output
          response.data.on('end', () => {
            logItemCompletion(`Download complete for ${fileName}`);
            downloadedCount++;
          });
        })
        .catch((error) => {
          reject(error);
        });
    }

    resolve({
      skipped: skippedCount,
      downloaded: downloadedCount,
    });
  });
}
