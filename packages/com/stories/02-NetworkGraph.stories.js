import uuid from '@gsmlg/utils/uuid';
import React from 'react';
import NetworkGraph from '../src/NetworkGraph';

export default {
  title: 'NetworkGraph',
};

const  getRandomID = () => uuid();

const defaultNodes = [
  {
    x: 100,
    y: 200,
    id: getRandomID(),
    size: 10,
    opacity: 1,
    fill: '#e03131',
    label: 'User A',
    type: 'Attr',
  },
  {
    x: 200,
    y: 200,
    id: getRandomID(),
    size: 10,
    opacity: 0.3,
    fill: '#5f3dc4',
    label: 'User B',
    type: 'User',
  },
  {
    x: 200,
    y: 100,
    id: getRandomID(),
    size: 15,
    opacity: 0.8,
    label: 'User C',
    type: 'User',
  },
];

const defaultLinks = [
  {
    source: defaultNodes[1],
    target: defaultNodes[2],
    id: getRandomID(),
  },
  {
    source: defaultNodes[0],
    target: defaultNodes[2],
    id: getRandomID(),
  },
  {
    source: defaultNodes[0],
    target: defaultNodes[1],
    id: getRandomID(),
  },
];

const data = {
  nodes: defaultNodes,
  links: defaultLinks,
};

export const Base = () => (
  <div>
    <h3>NetworkGraph</h3>
    <div>
      <NetworkGraph
        width={800}
        height={300}
        graph={data}
      />
    </div>
  </div>
);
