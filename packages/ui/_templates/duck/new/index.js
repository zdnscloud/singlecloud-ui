module.exports = {
  prompt: ({ prompter, args }) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        skip: !!args.name,
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
    ];

    return prompter.prompt(questions);
  },
};
