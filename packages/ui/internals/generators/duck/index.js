/**
 * Duck Generator
 */

const componentExists = require('../utils/componentExists');
const duckExists = require('../utils/duckExists');

module.exports = {
  description: 'Add a duck',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Please input duck name:',
      validate: (value) => {
        if (/.+/.test(value)) {
          return duckExists(value)
            ? 'A duck with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wannaCreateAction',
      default: true,
      message: 'Wanna add create action?',
    },
    {
      type: 'confirm',
      name: 'wannaUpdateAction',
      default: true,
      message: 'Wanna add update action?',
    },
    {
      type: 'confirm',
      name: 'wannaReadOneAction',
      default: true,
      message: 'Wanna add readOne action?',
    },
    {
      type: 'confirm',
      name: 'wannaRemoveAction',
      default: true,
      message: 'Wanna add remove action?',
    },
    {
      type: 'confirm',
      name: 'wannaResourceActions',
      default: true,
      message: 'Wanna add resource actions?',
    },
    {
      type: 'confirm',
      name: 'hasParents',
      default: false,
      message: 'Does this resource have parents resources?',
    },
    {
      type: 'input',
      name: 'parents',
      message: 'Please enter resource\'s parents, type comma-separated keywords: ',
      choices: ['clusters', 'namespaces'],
      when: ({ hasParents }) => hasParents,
      transformer: (d = '') => (Array.isArray(d) ? d : d.trim().split(/\s?,\s?/)).join(', '),
      filter: (d = '') => d.trim().split(/\s?,\s?/).filter((n) => !!n),
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: '../../app/ducks/{{ name }}/index.js',
        templateFile: './duck/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/ducks/{{ name }}/selectors.js',
        templateFile: './duck/selectors.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/ducks/{{ name }}/constants.js',
        templateFile: './duck/constants.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/ducks/{{ name }}/actions.js',
        templateFile: './duck/actions.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/ducks/{{ name }}/epic.js',
        templateFile: './duck/epic.js.hbs',
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: '/ducks/',
    });

    return actions;
  },
};
