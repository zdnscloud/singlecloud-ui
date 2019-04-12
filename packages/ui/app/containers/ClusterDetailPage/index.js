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

import injectSaga from 'utils/injectSaga';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import styles from './styles';
import ClusterDetailPageHelmet from './helmet';
import { makeSelectCurrentCluster } from '../ClustersPage/selectors';
import ClusterDetail from './ClusterDetail';

/* eslint-disable react/prefer-stateless-function */
export class ClusterDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.initAction();
  }

  render() {
    const { classes, cluster } = this.props;

    return (
      <div className={classes.root}>
        <ClusterDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <GridContainer>
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

const withSaga = injectSaga({ key: 'clusterDetailPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles)
)(ClusterDetailPage);
