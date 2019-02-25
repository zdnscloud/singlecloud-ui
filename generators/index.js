const fs = require('fs');

module.exports = (plop) => {
  plop.setGenerator('package', packageGenerator);
};

const packageGenerator = {
  description: 'Generate a package',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Please input package\'s name',
      validate(value) {
        const path = value.replace(/^@.+\//, '');
        if (/[^\w/@.]/.test(value)) return 'name invalid!';
        if (fs.existsSync(`packages/${path}`)) return 'package exists!';
        return true;
      }
    },
    {
      type: 'list',
      name: 'test',
      message: 'Plesase select one of test framework, karma-mocha or jest',
      default: 'jest',
      choices: () => ['jest', 'karma-mocha']
    }
  ],
  actions: (data) => {
    const path = data.name.replace(/^@.+\//, '').toLowerCase();

    const actions = [
      {
        type: 'addMany',
        destination: `${__dirname}/../packages/${path}/`,
        templateFiles: `${data.test}/**/*`,
        globOptions: {
          dot: true
        }
      }
    ];

    return actions;
  },
};
