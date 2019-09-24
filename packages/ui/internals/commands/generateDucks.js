const fs = require('fs');
const path = require('path');

const nodePlop = require('node-plop');

const plop = nodePlop(`${__dirname}/../generators/index.js`);

const duckDir = path.join(__dirname, '../../app/ducks');

const runCreateDuck = async (action) => {
  const act = plop.getGenerator('duck');
  return act.runActions(action);
};

const dir = process.argv[2];

const getResource = require('./getResources');

(async () => {
  const data = await getResource(dir);

  const findParents = (res) => {
    if (!res.parentResources || res.parentResources.length === 0) return [];
    const p = res.parentResources[0];
    const parent = data.find((r) => r.resourceType === p);
    const pc = parent.collectionName;
    const pp = findParents(parent);
    return [...pp, pc];
  };

  const actions = data.map((res) => {
    const act = {
      name: res.collectionName,
      wannaCreateAction: !!(res.collectionMethods && res.collectionMethods.includes('POST')),
      wannaUpdateAction: !!(res.resourceMethods && res.resourceMethods.includes('PUT')),
      wannaReadOneAction: !!(res.resourceMethods && res.resourceMethods.includes('GET')),
      wannaRemoveAction: !!(res.resourceMethods && res.resourceMethods.includes('DELETE')),
      wannaResourceActions: !!(res.resourceActions && res.resourceActions.length > 0),
      hasParents: !!(res.parentResources && res.parentResources.length > 0),
      parents: findParents(res),
    };

    return act;
  });

  for (let i = 0; i < actions.length; i += 1) {
    const act = actions[i];

    console.log('run act: ', act);

    fs.rmdirSync(`${duckDir}/${act.name}`, { recursive: true });

    await runCreateDuck(act);
  }

})();
