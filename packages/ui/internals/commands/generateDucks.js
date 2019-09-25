const fs = require('fs');
const path = require('path');

const nodePlop = require('node-plop');

const plop = nodePlop(`${__dirname}/../generators/index.js`);

const duckDir = path.join(__dirname, '../../app/ducks');

const skips = [
  'innerServices',
  'outerServices',
  'pods',
];

const mapName = (name) => {
  const map = {
    blockdevices: 'blockDevices',
    configmaps: 'configMaps',
    cronjobs: 'cronJobs',
    daemonsets: 'daemonSets',
    innerservices: 'innerServices',
    limitranges: 'limitRanges',
    nodenetworks: 'nodeNetworks',
    outerservices: 'outerServices',
    persistentvolumes: 'persistentVolumes',
    persistentvolumesclaims: 'persistentVolumesClaims',
    podnetworks: 'podNetworks',
    resourcequotas: 'resourceQuotas',
    servicenetworks: 'serviceNetworks',
    statefulsets: 'statefulSets',
    storageclasses: 'storageClasses',
    storageclusters: 'storageClusters',
    udpingresses: 'udpIngresses',
    userquotas: 'userQuotas',
  };
  if (Object.keys(map).includes(name)) {
    return map[name];
  }
  return name;
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
    const pc = mapName(parent.collectionName);
    const pp = findParents(parent);
    return [...pp, pc];
  };

  const actions = data.map((res) => {
    const act = {
      name: mapName(res.collectionName),
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

    if (!act.name || skips.includes(act.name)) continue;

    console.log('run act: ', act);

    fs.rmdirSync(`${duckDir}/${act.name}`, { recursive: true });

    await runCreateDuck(act);
  }

})();
