const inflection = require('inflection');
const changeCase = require('change-case')

module.exports = (plop) => {
  plop.addHelper('pluralize', (n) => inflection.pluralize(n));
  plop.addHelper('singularize', (n) => inflection.singularize(n));
  plop.addHelper('constantCase', (n) => changeCase.constantCase(n));

  plop.addHelper('pcCase', (n) => changeCase.constantCase(inflection.pluralize(n)));
  plop.addHelper('scCase', (n) => changeCase.constantCase(inflection.singularize(n)));
  plop.addHelper('pCamelCase', (n) => changeCase.camelCase(inflection.pluralize(n)));
  plop.addHelper('sCamelCase', (n) => changeCase.camelCase(inflection.singularize(n)));
  plop.addHelper('pProperCase', (n) => changeCase.pascalCase(inflection.pluralize(n)));
  plop.addHelper('sProperCase', (n) => changeCase.pascalCase(inflection.singularize(n)));

  plop.addHelper('last', (l) => l && l.length > 0 ? l[l.length - 1] : '');
  plop.addHelper('lastSP', (l) => changeCase.pascalCase(inflection.singularize(l && l.length > 0 ? l[l.length - 1] : '')));
};
