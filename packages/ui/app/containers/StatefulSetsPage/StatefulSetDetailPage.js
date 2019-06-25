/**
 *
 * StatefulSetDetailPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import {
  makeSelectStatefulSetID,
  makeSelectCurrentStatefulSet,
  makeSelectURL,
} from 'ducks/statefulSets/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/statefulSets/actions';
import { makeSelectSTSURL as makeSelectPodsURL } from 'ducks/pods/selectors';
import PodsTable from 'containers/PodsPage/PodsTable';

import StatefulSet from './StatefulSet';
import messages from './messages';
import StatefulSetDetailPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class StatefulSetDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  timer = null;

  componentWillMount() {
    const { clusterID, namespaceID, url, loadStatefulSets } = this.props;
    loadStatefulSets({ url, clusterID, namespaceID });

    this.loadStatefulSetAndPods();
    this.timer = setInterval(() => {
      if (this.timer) {
        this.loadStatefulSetAndPods();
      }
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  loadStatefulSetAndPods() {
    const {
      clusterID,
      namespaceID,
      statefulSetID,
      statefulSet,
      podsUrl: url,
      loadSTSPods,
      loadStatefulSet,
    } = this.props;
    loadStatefulSet(statefulSetID, {
      clusterID,
      namespaceID,
      url: statefulSet.getIn(['links', 'self']),
    });
    loadSTSPods({ url, clusterID, namespaceID, statefulSetID });
  }

  render() {
    const { classes, statefulSet } = this.props;

    return (
      <div className={classes.root}>
        <StatefulSetDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs 
            data={[
              {
                path:"#",
                name: <FormattedMessage {...messages.pageDesc}/>
              },
              {
                path: '/clusters/' + clusterID + '/namespaces/' + namespaceID + '/statefulSets',
                name: <FormattedMessage {...messages.pageTitle}/>
              },
              {
                path: '#',
                name: <FormattedMessage {...messages.statefulSetDetail}/>
              }
            ]}
          />
          <StatefulSet statefulSet={statefulSet} />
          <GridContainer className={classes.grid}>>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.pods} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <PodsTable parentType="sts" />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  statefulSetID: makeSelectStatefulSetID(),
  url: makeSelectURL(),
  podsUrl: makeSelectPodsURL(),
  statefulSet: makeSelectCurrentStatefulSet(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...podsActions,
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
)(StatefulSetDetailPage);
