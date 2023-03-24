export const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Please provide the email address used to login',
    validate: (value) => {
      if (!value) {
        return 'Please provide your email address';
      }

      return true;
    },
  },
  {
    type: 'password',
    name: 'password',
    message: 'Please provide the password used to login',
    validate: (value) => {
      if (!value) {
        return 'Please provide your password';
      }

      return true;
    },
  },
  {
    type: 'input',
    name: 'mediaDirectory',
    message: 'Please provide the directory you want the media downloaded to',
    default: './media',
    validate: (value) => {
      if (!value) {
        return 'Please provide the directory you want the media downloaded to';
      }

      return true;
    },
  },
];
