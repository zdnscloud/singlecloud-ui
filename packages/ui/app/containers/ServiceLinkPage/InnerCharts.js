/**
 *
 * Inner Charts
 *
 */

import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import moment from 'moment';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import teal from '@material-ui/core/colors/teal';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import red from '@material-ui/core/colors/red';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Tasks from 'components/Tasks/Tasks';
import CustomTabs from 'components/CustomTabs/CustomTabs';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import InnerServiceTree from 'components/tree/InnerServiceTree';

import * as actions from 'ducks/serviceLinks/actions';
import styles from './cardStyles';
import { makeSelectCurrentInnerServices } from 'ducks/serviceLinks/selectors';

import messages from './messages';

const separator = '$';

/* eslint-disable react/prefer-stateless-function */
export class InnerCharts extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    innerServices: PropTypes.object.isRequired,
  };

  state = { reload: false, icardWidth: 400 };

  t = null;

  icardBodyRef = createRef();

  componentDidMount() {
    let iw = 400;
    if (this.icardBodyRef.current) {
      const icd = findDOMNode(this.icardBodyRef.current); // eslint-disable-line react/no-find-dom-node
      const { width } = icd.getBoundingClientRect();
      iw = width;
    }
    this.setState({ icardWidth: iw - 40 });
  }

  componentWillReceiveProps(nextProps) {
    const { nextInnerServices } = nextProps;
    const { innerServices } = this.props;
    if (nextInnerServices !== innerServices) {
      this.reload();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.t);
    this.t = null;
  }

  reload() {
    this.setState(
      (state, props) => ({ reload: true }),
      () => {
        this.t = setTimeout(() => {
          this.setState({ reload: false });
        }, 1000 / 8);
      }
    );
  }

  render() {
    if (this.state.reload === true) return null;
    const { classes, innerServices } = this.props;
    const is = innerServices.toJS() || [];

    return (
      <GridContainer style={{ display: 'block' }}>
        {is.map((s, i) => {
          const [type, idx, name] = s.name.split(separator);
          const { children } = s;
          const count = _.reduce(children, (n, c) => {
            const m = _.reduce(c.children, (nn, cc) => {
              return nn += 1;
            }, 0);
            return n + (m < 4 ? 4 : m);
          }, 0);

          return (
            <GridItem xs={12} sm={6} md={6} key={i} style={{ float: i % 2 === 0 ? 'left' : 'right' }}>
              <Card>
                <CardHeader color="info" icon>
                  <h3 className={classes.cardTitle}>
                    <b>
                      <FormattedMessage {...messages.innerServiceName} />
                    </b>
                    {'    '}
                    {name}
                  </h3>
                </CardHeader>
                <CardBody ref={i === 0 ? this.icardBodyRef : null}>
                  <InnerServiceTree
                    width={this.state.icardWidth}
                    height={75 * count > 300 ? 75 * count : 300}
                    data={s}
                  />
                </CardBody>
                <CardFooter />
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  innerServices: makeSelectCurrentInnerServices(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(InnerCharts);
