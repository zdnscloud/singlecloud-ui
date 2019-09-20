/**
 *
 * Node
 *
 */

import React, { useCallback, useState } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';

import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export const Node = (props) => {
  const [rect, setRect] = useState({ width: 100, height: 86 });
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      // eslint-disable-next-line react/no-find-dom-node
      const el = findDOMNode(node);
      setRect(el.getBoundingClientRect());
    }
  }, []);
  const { classes, node } = props;
  const width = rect.width / 2;
  const { height } = rect;
  const radius = Math.min(width, height) * 0.8;
  const centerY = height / 2;
  const centerX = width / 2;
  const data = [
    { label: 'used', value: node.get('usedsize') },
    { label: 'free', value: node.get('freesize') },
  ];
  const percent = Math.round((node.get('usedsize') / node.get('size')) * 100);

  return (
    <Paper elevation={0} className={classes.node} ref={measuredRef}>
      <Typography className={classes.nodeChart} component="div">
        <svg width={width} height={height}>
          <Group top={centerY} left={centerX}>
            <Pie
              data={data}
              pieValue={(d) => d.value}
              outerRadius={radius * 0.5}
              innerRadius={radius * 0.3}
              cornerRadius={0}
              padAngle={0}
              pieSort={(n) => true}
            >
              {(pie) =>
                pie.arcs.map((arc, i) => {
                  const { label } = arc.data;
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const { startAngle, endAngle } = arc;
                  const hasSpaceForLabel = endAngle - startAngle >= 0.1;
                  const fillColor = label === 'used' ? '#40B7E8' : '#eee';
                  return (
                    <g key={`usage-${label}-${i}`}>
                      <path d={pie.path(arc)} fill={fillColor} />
                    </g>
                  );
                })
              }
            </Pie>
            <text
              fill="#000"
              x={0}
              y={0}
              dy=".5em"
              fontSize={14}
              textAnchor="middle"
            >
              {`${percent}%`}
            </text>
          </Group>
        </svg>
      </Typography>
      <Typography className={classes.nodeInfo} component="div">
        <Typography className={classes.nodeInfoLine} component="div">
          <Typography className={classes.nodeInfoLineLabel} component="div">
            <FormattedMessage {...messages.nodeName} />
          </Typography>
          <Typography className={classes.nodeInfoLineValue} component="div">
            {node.get('name')}
          </Typography>
        </Typography>
        {['size', 'freesize', 'usedsize'].map((s) => (
          <Typography className={classes.nodeInfoLine} component="div" key={s}>
            <Typography className={classes.nodeInfoLineLabel} component="div">
              <FormattedMessage {...messages[s]} />
            </Typography>
            <Typography className={classes.nodeInfoLineValue} component="div">
              {node.get(s)}G
            </Typography>
          </Typography>
        ))}
      </Typography>
    </Paper>
  );
};

export default Node;
