const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const nodePlop = require('node-plop');
const inflection = require('inflection');
const changeCase = require('change-case')

const plop = nodePlop(`${__dirname}/../generators/index.js`);

const duckDir = path.join(__dirname, '../../app/ducks');

const skips = [
  'errorCodes',
  'innerServices',
  'outerServices',
  'pods',
];



const mapName = (name = '') => {
  if (name === name.toUpperCase()) {
    return inflection.pluralize(name.toLowerCase());
  }
  return changeCase.camelCase(inflection.pluralize(name));
};

const runCreateDuck = async (action) => {
  const act = plop.getGenerator('duck');
  return act.runActions(action);
};

const dir = process.argv[2];

const getResource = require('./getResources');

const sleep = (t) => new Promise((resolve, reject) => setTimeout(resolve, t));

(async () => {
  const data = await getResource(dir);

  const findParents = (res) => {
    if (!res.parentResources || res.parentResources.length === 0) return [];
    const p = res.parentResources[0];
    const parent = data.find((r) => r.resourceType === p);
    const pc = mapName(parent.goStructName);
    const pp = findParents(parent);
    return [...pp, pc];
  };

  const actions = data.map((res) => {
    if (Array.isArray(res.errorCode)) {
      return {
        ...res,
        name: 'errorCodes',
      };
    }

    const act = {
      name: mapName(res.goStructName || res.collectionName), // # 等海姣修复 hpa 的docs
      wannaCreateAction: !!(res.collectionMethods && res.collectionMethods.includes('POST')),
      wannaUpdateAction: !!(res.resourceMethods && res.resourceMethods.includes('PUT')),
      wannaReadOneAction: !!(res.resourceMethods && res.resourceMethods.includes('GET')),
      wannaRemoveAction: !!(res.resourceMethods && res.resourceMethods.includes('DELETE')),
      wannaResourceActions: !!(res.resourceActions && res.resourceActions.length > 0),
      hasParents: !!(res.parentResources && res.parentResources.length > 0),
      parents: findParents(res),
      collectionName: res.collectionName,
      resourceFields: res.resourceFields,
      subResources: res.subResources,
    };

    return act;
  });

  for (let i = 0; i < actions.length; i += 1) {
    const act = actions[i];

    if (!act.name || skips.includes(act.name)) continue;

    console.log('run act: ', act);

    rimraf.sync(`${duckDir}/${act.name}`);

    await runCreateDuck(act);
  }

})();
