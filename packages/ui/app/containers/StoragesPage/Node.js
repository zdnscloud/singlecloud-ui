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
import { GradientPinkBlue } from '@vx/gradient';
import { letterFrequency, browserUsage } from '@vx/mock-data';

import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export const Node = (props) => {
  const [rect, setRect] = useState({ width: 100, height: 86 });
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const el = findDOMNode(node);
      setRect(el.getBoundingClientRect());
    }
  }, []);
  const { classes, theme, node, checkedNode, onClick } = props;
  const width = rect.width / 2;
  const { height } = rect;
  const radius = Math.min(width, height) * 0.8;
  const centerY = height / 2;
  const centerX = width / 2;
  const data = [
    { label: 'used', value: node.get('stat') ? node.get('usedsize') : 0 },
    { label: 'free', value: node.get('stat') ? node.get('freesize') : 1 },
  ];
  const percent = Math.round((node.get('usedsize') / node.get('size')) * 100);

  return (
    <Paper elevation={0} className={classes.node} ref={measuredRef} onClick={onClick}>
      <Typography className={classes.nodeChart} component="div">
        <svg width={width} height={height}>
          {!node.get('stat') ?    
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
                    const fillColor = label === 'used' ? '#EE827C' : '#eee';
                    return (
                      <g key={`usage-${label}-${i}`}>
                        <path d={pie.path(arc)} fill={fillColor} />
                      </g>
                    );
                  })
                }
              </Pie>
              <g fillRule="nonzero" fill="#EE827C" transform=" translate(-10.8, -10) scale(0.7)">
                <path 
                  d="M17.476933,8.02539505 C16.6020873,8.02920311 15.8936791,8.74356431 15.889693,9.62597317 L16.683348,18.4436446 C16.6549714,18.7488349 16.8004125,19.0439107 17.0587988,19.2053719 C17.3171851,19.3668332 17.6439538,19.3668332 17.9023401,19.2053719 C18.1607263,19.0439107 18.3061674,18.7488349 18.2777908,18.4436446 L19.0713759,9.62597317 C19.0674598,8.74081405 18.3547158,8.02539505 17.476933,8.02539505 Z M17.476933,20.8444765 C16.601388,20.8484959 15.8942386,21.5668062 15.8968885,22.4498499 C15.8994835,23.3328934 16.6107589,24.0469726 17.4864437,24.0455641 C18.3621286,24.0443633 19.0713059,23.3280981 19.0713059,22.4449841 C19.0674598,21.5598955 18.3547158,20.8444765 17.476933,20.8444765 Z M34.5578924,24.0455621 L20.2581869,1.61581911 C19.71158,0.589205172 18.6314863,-0.0323757349 17.476933,0.0152409986 C16.3407838,0.0320668022 15.2929809,0.636630459 14.702882,1.61581911 L0.403246509,24.0455621 C0.116691656,24.5304729 -0.0224856948,25.0895068 0.00295741561,25.6534038 C0.0107198351,27.4180099 1.42746629,28.8467322 3.17743734,28.8545599 L31.7766384,28.8545599 C33.5292669,28.8507519 34.950419,27.4209716 34.9581815,25.6534038 C35.0015208,25.0878358 34.861004,24.5234216 34.5578924,24.0455621 Z M31.7766384,27.254134 L3.17743734,27.254134 C2.30238188,27.2501033 1.59418348,26.5358831 1.59019738,25.6534742 C1.60030353,25.4378681 1.62660327,25.2233448 1.66887055,25.0117481 L1.74740385,24.9324138 L16.0470394,2.49533668 L16.1328456,2.41614342 C16.4259264,1.94563188 16.9268206,1.64737913 17.476933,1.61581911 C18.0230587,1.59417353 18.5388089,1.86930007 18.8283632,2.33673861 C18.8283632,2.41607291 18.9068966,2.41607291 18.9068966,2.58193447 L33.2065321,25.0117481 L33.2923383,25.0910824 C33.3412104,25.3015414 33.3675389,25.5166825 33.3708716,25.7328085 C33.3324791,26.5900421 32.6276374,27.2626556 31.7766384,27.254134 Z"
                ></path>
              </g>
            </Group>
          :   
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
          }
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
              { node.get(s) ? node.get(s)+'G' :  '--'}
            </Typography>
          </Typography>
        ))}
      </Typography>
    </Paper>
  );
};

export default compose(withStyles(styles, { withTheme: true }))(Node);
