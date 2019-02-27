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
        type:    'folder',
        id:      'b1b2e7006be',
        name:    'Documents',
        links:   { /* see links */ },
        actions: { /* see actions */ }
      },
      /* ... more folder resources ... */
    ],
    actions: {
      deleteAll: 'https://base/v1/folders?deleteAll',
    },
    pagination: { /* see pagination */ },
    sort:       { /* see sorting */ },
    filters:    { /* see filtering */ }
  };


  app.get('/zcloud.cn/v1/clusters', (req, res) => {
    res.status(200).json(clusters);
  });

  app.post('/zcloud.cn/v1/clusters', (req, res) => {
    clusters.data.push({
      type:    'folder',
      id: parseInt(Math.random().toString().slice(2), 10).toString(36),
      name: req.body.name,
      links:   { /* see links */ },
      actions: { /* see actions */ }
    });
    res.status(201).json({});
  });
};
