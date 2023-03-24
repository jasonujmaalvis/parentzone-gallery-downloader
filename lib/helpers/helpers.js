import chalk from 'chalk';

export const colors = {
  red: [216, 16, 16],
  green: [142, 215, 0],
  blue: [0, 186, 255],
  gold: [255, 204, 0],
  darkGray: [90, 90, 90],
};

export const logIntro = ({ dir }) => {
  console.info('\n');
  console.info(`✨  Downloading the media  ✨`);
  console.info('\n');

  const pathString = chalk.bold.rgb(...colors.blue)(dir);

  console.info(`Directory:  ${pathString}`);
  console.info(
    chalk.rgb(...colors.darkGray)('=========================================')
  );

  console.info('\n');
};

export const logError = (error) => {
  const cross = chalk.rgb(...colors.red)('✗');
  console.info(`${cross} ${chalk.rgb(...colors.red)(error)}`);
};

export const logConclusion = ({ skipped, downloaded }) => {
  console.info('\n');
  console.info(`🚀  ${chalk.rgb(...colors.gold)('All media downloaded')}  🚀`);
  console.info(`Skipped: ${chalk.rgb(...colors.blue)(skipped)} items`);
  console.info(`Downloaded: ${chalk.rgb(...colors.green)(downloaded)} items`);
  console.info('\n');
};

export const logItemCompletion = (successText) => {
  const checkmark = chalk.rgb(...colors.green)('✓');
  console.info(`${checkmark} ${successText}`);
};
