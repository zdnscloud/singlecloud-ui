/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');
const duckExists = require('../utils/duckExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'HomePage',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'duck',
      message: 'Input duck pluralize name for Page',
      default: '',
      validate: (value) => {
        if (/.+/.test(value)) {
          return duckExists(value)
            ? true
            : 'Must have a duck that exists in ducks';
        }

        return 'The duck is required';
      },
    },
    {
      type: 'input',
      name: 'singular',
      message: 'Input duck singularize name',
      default: '',
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return 'The duck is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
    {
      type: 'confirm',
      name: 'wantTable',
      default: true,
      message: 'Do you want Table Componet?',
    },
    {
      type: 'confirm',
      name: 'wantCreatePage',
      default: true,
      message: 'Do you want to have create action?',
    },
    {
      type: 'confirm',
      name: 'wantUpdatePage',
      default: true,
      message: 'Do you want to have update action?',
    },
    {
      type: 'confirm',
      name: 'wantShowItemPage',
      default: true,
      message: 'Do you want to have show action?',
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './container/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './container/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/index.js',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/index.test.js',
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/styles.js',
        templateFile: './container/styles.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/messages.js',
        templateFile: './container/messages.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    // If component wants table
    if (data.wantTable) {
      actions.push([
        {
          type: 'add',
          path: '../../app/containers/{{properCase name}}/Table.js',
          templateFile: './container/table.js.hbs',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '../../app/containers/{{properCase name}}/tableSchema.js',
          templateFile: './container/tableSchema.js.hbs',
          abortOnFail: true,
        },
      ]);
    }

    // If component wants create
    if (data.wantCreatePage) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/CreatePage.js',
        templateFile: './container/create.js.hbs',
        abortOnFail: true,
      });
    }

    // If component wants update
    if (data.wantUpdatePage) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/EditPage.js',
        templateFile: './container/update.js.hbs',
        abortOnFail: true,
      });
    }

    // If component wants showItem
    if (data.wantShowItemPage) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/ShowItemPage.js',
        templateFile: './container/showItem.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    return actions;
  },
};
