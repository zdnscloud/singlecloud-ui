module.exports = (app) => {
  const clusters = {
    type: 'collection',
    resourceType: 'folder',
    links: {
      self: 'https://base/v1/folders',
      /* ... more links ... */
    },
    data: [
      {
        type: 'folder',
        id: 'b1b2e7006be',
        name: 'Documents',
        links: {
          self: '/apis/zcloud.cn/v1/clusters/b1b2e7006be',
          nodes: '/apis/zcloud.cn/v1/clusters/b1b2e7006be/nodes',
        },
        actions: {
          /* see actions */
        },
      },
      /* ... more folder resources ... */
    ],
    actions: {
      deleteAll: 'https://base/v1/folders?deleteAll',
    },
    pagination: {
      /* see pagination */
    },
    sort: {
      /* see sorting */
    },
    filters: {
      /* see filtering */
    },
  };

  app.get('/apis/zcloud.cn/v1/clusters', (req, res) => {
    res.status(200).json(clusters);
  });

  app.post('/apis/zcloud.cn/v1/clusters', (req, res) => {
    const id = parseInt(
      Math.random()
        .toString()
        .slice(2),
      10,
    ).toString(36);
    clusters.data.push({
      id,
      type: 'folder',
      name: req.body.name,
      links: {
        self: `/apis/zcloud.cn/v1/clusters/${id}`,
        nodes: `/apis/zcloud.cn/v1/clusters/${id}/nodes`,
      },
      actions: {
        /* see actions */
      },
    });
    res.status(201).json({});
  });

  app.get('/apis/zcloud.cn/v1/clusters/:cluster_id', (req, res) => {
    const cluster = clusters.data.find((c) => c.id === req.params.cluster_id);
    if (cluster) {
      res.status(200).json(cluster);
    } else {
      res.status(404).end();
    }
  });

  app.get('/apis/zcloud.cn/v1/clusters/:cluster_id/nodes', (req, res) => {
    res.status(200).json(clusters);
  });
};
