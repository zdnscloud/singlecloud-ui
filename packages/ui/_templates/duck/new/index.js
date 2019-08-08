module.exports = {
  prompt: ({ prompter, args }) => {
    if (args.name) {
      return Promise.resolve({ allow: true });
    }
    return prompter.prompt({
      type: 'input',
      name: 'name',
      message: 'Please input duck name:'
    });
  },
};
