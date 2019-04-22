/**
 *
 * Charts
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import Icon from '@material-ui/core/Icon';
import teal from '@material-ui/core/colors/teal';
// @material-ui/icons
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import red from '@material-ui/core/colors/red';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Tasks from 'components/Tasks/Tasks';
import CustomTabs from 'components/CustomTabs/CustomTabs';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import InnerServiceTree from 'components/tree/InnerServiceTree';
import OuterServiceTree from 'components/tree/OuterServiceTree';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';
import * as actions from 'ducks/serviceLinks/actions';
import {
  makeSelectCurrentInnerServices,
  makeSelectCurrentOuterServices,
} from 'ducks/serviceLinks/selectors';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Charts extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    innerServices: PropTypes.object.isRequired,
    outerServices: PropTypes.object.isRequired,
  };

  state = { reload: false };

  t = null;

  componentWillReceiveProps(nextProps) {
    const { nextOuterServices, nextInnerServices } = nextProps;
    const { outerServices, innerServices } = this.props;
    if (
      nextOuterServices !== outerServices ||
      nextInnerServices !== innerServices
    ) {
      const os = outerServices.toJS() || [];
      const is = innerServices.toJS() || [];
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
    const { classes, outerServices, innerServices } = this.props;
    const os = outerServices.toJS() || [];
    const is = innerServices.toJS() || [];

    return (
      <Fragment>
        <GridContainer>
          {os.map((s, i) => (
            <GridItem xs={12} sm={6} md={6} key={i}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <BubbleChartIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Outer Service Name</p>
                  <h3 className={classes.cardTitle}>{s.name}</h3>
                </CardHeader>
                <CardBody>
                  <OuterServiceTree width={498} height={388} data={s} />
                </CardBody>
                <CardFooter stats />
              </Card>
            </GridItem>
          ))}
        </GridContainer>
        <GridContainer>
          {is.map((s, i) => (
            <GridItem xs={12} sm={6} md={6} key={i}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <BubbleChartIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Inner Service Name</p>
                  <h3 className={classes.cardTitle}>{s.name}</h3>
                </CardHeader>
                <CardBody>
                  <InnerServiceTree width={498} height={388} data={s} />
                </CardBody>
                <CardFooter stats />
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  outerServices: makeSelectCurrentOuterServices(),
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
)(Charts);
