/**
 *
 * Pods List
 *
 */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import long2ip from '@gsmlg/utils/long2ip';
import ip2long from '@gsmlg/utils/ip2long';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import DownIcon from 'components/Icons/Down';
import HostIcon from 'components/Icons/Host';

import messages from './messages';
import useStyles from './styles';

const PodsList = ({ data, nodeNetworks }) => {
  const classes = useStyles();
  const [state, setState] = useState({});

  return (
    <Paper className={classes.tableWrapper}>
      {data.map((n, idx) => {
        const id = n.get('id');
        const nodeName = n.get('nodeName');
        const podCIDR = n.get('podCIDR');
        const podIPs = n.get('podIPs');
        const [ip, mask] = podCIDR.split('/');
        const total = 2 ** (32 - Number(mask));
        const used = (podIPs && podIPs.size) || 0;
        const nodeNetwork = nodeNetworks.find(
          (node) => node.get('name') === nodeName
        );
        const nodeIp = nodeNetwork && nodeNetwork.get('ip');
        const podWithNodeNetwork = podIPs.filter((p) => p.get('ip') === nodeIp);

        return (
          <ExpansionPanel key={id}>
            <ExpansionPanelSummary
              expandIcon={<DownIcon style={{ color: '#000' }} />}
            >
              <div className={classes.podNode}>
                <div className={classes.c0}>
                  <IconButton>
                    <HostIcon style={{ color: '#fff' }} />
                  </IconButton>
                </div>
                <div className={classes.c1}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.nodeName} />}
                    value={nodeName}
                  />
                </div>
                <div className={classes.c2}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.podCIDR} />}
                    value={podCIDR}
                  />
                </div>
                <div className={classes.c3}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.total} />}
                    value={total}
                  />
                </div>
                <div className={classes.c4}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.used} />}
                    value={used}
                  />
                </div>
                <div className={classes.c5}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.unused} />}
                    value={total - used}
                  />
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.ipbox}>
                {_.times(total, (nn) => {
                  const ipAddr = long2ip(ip2long(ip) + nn);
                  let active = false;
                  if (podIPs)
                    active = podIPs.find((nnn) => nnn.get('ip') === ipAddr);
                  const mouseOver = (evt) => {
                    setState({
                      [id]: active ? active.toJS() : { ip: ipAddr },
                    });
                  };

                  return (
                    <div
                      key={`index-${nn}`}
                      role="cell"
                      onClick={mouseOver}
                      className={`${classes.ipitem} ${active ? 'active' : ''}`}
                    ></div>
                  );
                })}
                {podWithNodeNetwork.map((p) => {
                  const mouseOver = (evt) => {
                    setState({
                      [id]: p.toJS(),
                    });
                  };

                  return (
                    <div
                      key={`index-${p.get('name')}`}
                      role="cell"
                      onClick={mouseOver}
                      className={`${classes.ipitem} active`}
                    ></div>
                  );
                })}
              </div>
              <div className={classes.infobox}>
                <div className={classes.infoExample}>
                  <div className={classes.infoLine}>
                    <div className={`${classes.ipitem} active`}></div>
                    <FormattedMessage {...messages.used} />
                  </div>
                  <div className={classes.infoLine}>
                    <div className={classes.ipitem}></div>
                    <FormattedMessage {...messages.unused} />
                  </div>
                </div>
                <div className={classes.activeIP}>
                  <div className={classes.infoLine}>
                    <div className={classes.infoLineTitle}>
                      <FormattedMessage {...messages.activeIP} />
                    </div>
                    <div className={classes.infoLineContent}>
                      {state[id] && state[id].ip}
                    </div>
                  </div>
                  <div className={classes.infoLine}>
                    <div
                      className={classes.infoLineTitle}
                      title={<FormattedMessage {...messages.activePod} />}
                    >
                      <FormattedMessage {...messages.activePod} />
                    </div>
                    <div
                      className={classes.infoLineContent}
                      title={state[id] && state[id].name}
                    >
                      {state[id] && state[id].name}
                    </div>
                  </div>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Paper>
  );
};
export default PodsList;
