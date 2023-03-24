import inquirer from 'inquirer';
import path from 'path';
import { questions } from './lib/questions.js';
import {
  loginUser,
  createSession,
  getMedia,
  downloadMedia,
} from './lib/scraper.js';
import {
  logIntro,
  logError,
  logItemCompletion,
  logConclusion,
} from './lib/helpers/index.js';

async function go() {
  const { email, password, mediaDirectory } = await inquirer.prompt(questions);

  // Log introduction
  logIntro({
    dir: path.resolve(mediaDirectory),
  });

  // Log in the user
  const loggedInResponse = await loginUser({ email, password });

  logItemCompletion('Logged in successfully');

  // Create a session to get api key
  const { key: apiKey } = await createSession({
    id: loggedInResponse[0].id,
    password,
  });

  logItemCompletion('Created user session successfully');

  // Hits the gallery api endpoint which returns ALL the media in JSON
  const media = await getMedia(apiKey);

  logItemCompletion('Retrieved media data successfully');

  // Download the media
  await downloadMedia({
    media,
    apiKey,
    directory: mediaDirectory,
  })
    .then((response) => {
      logConclusion(response);
    })
    .catch((error) => {
      logError(`There was an error ${error.code}`);
    });
}

go();
