/**
 *
 * ClusterDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as actions from 'ducks/events/actions';

import messages from './messages';
import styles from './styles';
import ClusterDetailPageHelmet from './helmet';
import ClusterDetail from './ClusterDetail';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
/* eslint-disable react/prefer-stateless-function */
export class ClusterDetailPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { openCluster, closeCluster, cluster } = this.props;
    closeCluster();
    openCluster(cluster.get('id'));
    
  }

  render() {
    const { classes, cluster } = this.props;
    return (
      <div className={classes.root}>
        <ClusterDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
        <Breadcrumbs 
            data={[
              {
                path: '/clusters/' + cluster.toJS().name,
                name: <FormattedMessage {...messages.pageTitle}/>
              }
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage
                      {...messages.clusterDetail}
                      values={cluster.toJS()}
                    />
                  </h4>
                </CardHeader>
                <CardBody>
                  <ClusterDetail cluster={cluster} />
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
  cluster: makeSelectCurrentCluster(),
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
)(ClusterDetailPage);
