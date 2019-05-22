/**
 *
 * Pods List
 *
 */
import React, { Fragment } from 'react';
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
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class PodsList extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  state = { activeIP: { ip: '' } };

  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.tableWrapper}>
        {data.map((n, idx) => {
          const podCIDR = n.get('podCIDR');
          const podIPs = n.get('podIPs');
          const [ip, mask] = podCIDR.split('/');
          const total = 2 ** (32 - Number(mask));
          const used = podIPs && podIPs.size || 0;

          return (
            <ExpansionPanel key={idx}>
              <ExpansionPanelSummary
                expandIcon={<DownIcon nativeColor="#000" />}
              >
                <div className={classes.podNode}>
                  <div className={classes.c0}>
                    <IconButton>
                      <HostIcon nativeColor="#fff" />
                    </IconButton>
                  </div>
                  <div className={classes.c1}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.nodeName} />}
                      value={n.get('nodeName')}
                    />
                  </div>
                  <div className={classes.c2}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.podCIDR} />}
                      value={n.get('podCIDR')}
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
                  {_.times(total, (n) => {
                    const ipAddr = long2ip(ip2long(ip) + n);
                    let active = false;
                    if (podIPs)
                      active = podIPs.find((n) => n.get('ip') === ipAddr);
                    const mouseOver = (evt) => {
                      this.setState({
                        activeIP: active ? active.toJS() : { ip: ipAddr },
                      });
                    };

                    return (
                      <div
                        onClick={mouseOver}
                        className={`${classes.ipitem} ${active ? 'active' : ''}`}
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
                      <FormattedMessage {...messages.activeIP} />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.activeIP.ip}
                    </div>
                    <div className={classes.infoLine}>
                      <FormattedMessage {...messages.activePod} />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.activeIP.name}
                    </div>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles)
)(PodsList);
