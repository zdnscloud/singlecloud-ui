import React from 'react';
import { render } from 'react-dom';
import Tree from './Tree';
import data from './data';

const App = () => (
  <Tree data={data} width={600} height={500} />
);

export default App;
