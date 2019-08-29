module.exports = {
  prompt: async ({ prompter, args }) => {
    let data = {};

    const questions = [
      {
        type: 'input',
        name: 'name',
        skip: !!args.name,
        initial: args.name,
        message: 'Please input duck name:'
      },
      {
        type: 'confirm',
        name: 'wannaCreateAction',
        initial: true,
        message: 'Wanna add create action?',
      },
      {
        type: 'confirm',
        name: 'wannaUpdateAction',
        initial: true,
        message: 'Wanna add update action?',
      },
      {
        type: 'confirm',
        name: 'wannaReadOneAction',
        initial: true,
        message: 'Wanna add readOne action?',
      },
      {
        type: 'confirm',
        name: 'wannaRemoveAction',
        initial: true,
        message: 'Wanna add remove action?',
      },
      {
        type: 'confirm',
        name: 'wannaResourceActions',
        initial: true,
        message: 'Wanna add resource actions?',
      },
      {
        type: 'confirm',
        name: 'hasParents',
        initial: false,
        message: 'Does this resource have parents resources?'
      },
    ];

    data = await prompter.prompt(questions);

    if (data.hasParents) {
      const parentQuestions = [
        {
          type: 'list',
          name: 'parents',
          initial: [],
          message: 'Please enter resource\'s parents, type comma-separated keywords: '
        },
      ];
      const d = await prompter.prompt(parentQuestions);
      data = { ...data, ...d };
    } else {
      data = { ...data, parents: [] };
    }
    console.log(data);
    return data;
  },
};
