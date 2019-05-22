/**
 *
 * Outer Charts
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
import Tasks from 'components/Tasks/Tasks';
import CustomTabs from 'components/CustomTabs/CustomTabs';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import OuterServiceTree from 'components/tree/OuterServiceTree';

import styles from './cardStyles';
import * as actions from 'ducks/serviceLinks/actions';
import { makeSelectCurrentOuterServices } from 'ducks/serviceLinks/selectors';

import messages from './messages';

const separator = '$';

/* eslint-disable react/prefer-stateless-function */
export class OuterCharts extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    outerServices: PropTypes.object.isRequired,
  };

  state = { reload: false, ocardWidth: 800 };

  t = null;

  ocardBodyRef = createRef();

  componentDidMount() {
    let ow = 800;
    if (this.ocardBodyRef.current) {
      const ocd = findDOMNode(this.ocardBodyRef.current); // eslint-disable-line react/no-find-dom-node
      const { width } = ocd.getBoundingClientRect();
      ow = width;
    }
    this.setState({ ocardWidth: ow - 40 });
  }

  componentWillReceiveProps(nextProps) {
    const { nextOuterServices } = nextProps;
    const { outerServices } = this.props;
    if (nextOuterServices !== outerServices) {
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
    const { classes, outerServices } = this.props;
    const os = outerServices.toJS() || [];

    return (
      <GridContainer>
        {os.map((s, i) => {
          const [type, name] = s.name.split(separator);

          return (
            <GridItem xs={12} sm={12} md={12} key={i}>
              <Card>
                <CardHeader color="info" stats icon>
                  <h3 className={classes.cardTitle}>
                    <b>
                      <FormattedMessage {...messages.outerServiceName} />
                    </b>
                    {'    '}
                    {name}
                  </h3>
                </CardHeader>
                <CardBody ref={i === 0 ? this.ocardBodyRef : null}>
                  <OuterServiceTree
                    width={this.state.ocardWidth}
                    height={288}
                    data={s}
                  />
                </CardBody>
                <CardFooter stats />
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  outerServices: makeSelectCurrentOuterServices(),
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
)(OuterCharts);