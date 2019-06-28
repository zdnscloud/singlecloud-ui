/**
 *
 * StatefulSetsPage
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
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
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
import * as actions from 'ducks/statefulSets/actions';
import { makeSelectURL } from 'ducks/statefulSets/selectors';

import messages from './messages';
import StatefulSetsPageHelmet from './helmet';
import styles from './styles';
import StatefulSetsTable from './StatefulSetsTable';

/* eslint-disable react/prefer-stateless-function */
export class StatefulSetsPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url, loadStatefulSets } = this.props;
    loadStatefulSets({ url, clusterID, namespaceID });
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
    } = prevProps;
    const { clusterID, namespaceID, url, loadStatefulSets } = this.props;
    if (prevClusterID !== clusterID || prevNamespaceID !== namespaceID) {
      loadStatefulSets({ url, clusterID, namespaceID });
    }
  }

  render() {
    const { classes ,clusterID, namespaceID} = this.props;

    return (
      <div className={classes.root}>
        <StatefulSetsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs 
            data={[
              {
                path: '/clusters/' + clusterID + '/namespaces/' + namespaceID +'/statefulSets',
                name: <FormattedMessage {...messages.pageTitle}/>
              }
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.statefulSets} />
                    <Link
                      to={`${this.props.location.pathname}/create`}
                      className={classes.createBtnLink}
                    >
                      <IconButton>
                        <AddIcon style={{ color: '#fff' }} />
                      </IconButton>
                    </Link>
                  </h4>
                </CardHeader>
                <CardBody>
                  <StatefulSetsTable location={this.props.location} />
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
  url: makeSelectURL(),
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
)(StatefulSetsPage);
