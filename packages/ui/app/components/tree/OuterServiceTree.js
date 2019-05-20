import React from 'react';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import { hierarchy, cluster } from 'd3-hierarchy';
import _ from 'lodash';

import Links from './LinksMove';
import Nodes from './NodesMove';

export default class OuterServiceTree extends React.Component {
  state = {
    // cartesian, polar
    layout: 'cartesian',
    // vertical, horizontal
    orientation: 'horizontal',
    // diagonal step curve line elbow
    linkType: 'diagonal',
    stepPercent: 0.5,
  };

  render() {
    const {
      data,
      width,
      height,
      events = false,
      margin = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30,
      },
    } = this.props;
    const { layout, orientation, linkType, stepPercent } = this.state;

    if (width < 10) return null;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;

    if (layout === 'polar') {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2,
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === 'vertical') {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }

    const root = hierarchy(data, (d) => d.children);

    return (
      <div>
        <svg width={width} height={height}>
          <LinearGradient id="lg" from="#fdfba3" to="#fefefe" />
          <rect width={width} height={height} rx={0} fill="#000" fillOpacity={0} />
          <Group top={margin.top*5} left={margin.left*4}>
            <Tree
              root={root}
              size={[sizeWidth - margin.left*2, sizeHeight - margin.top*2]}
              separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
              nodeSize={[200, 150]}
            >
              {(data) => (
                <Group top={origin.y} left={origin.x}>
                  <Links
                    links={data.links()}
                    linkType={linkType}
                    layout={layout}
                    orientation={orientation}
                    stepPercent={stepPercent}
                  />

                  <Nodes
                    nodes={data.descendants()}
                    layout={layout}
                    Orientation={orientation}
                    onNodeClick={(node) => {
                      node.data.x0 = node.x;
                      node.data.y0 = node.y;
                      node.data.isExpanded = !node.data.isExpanded;
                      console.log('click node: ', node);
                      this.forceUpdate();
                    }}
                  />
                </Group>
              )}
            </Tree>
          </Group>
        </svg>
      </div>
    );
  }
}
