/**
 *
 * ConfigMapsPage
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
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import * as actions from 'ducks/configMaps/actions';
import { makeSelectURL } from 'ducks/configMaps/selectors';

import messages from './messages';
import ConfigMapsPageHelmet from './helmet';
import styles from './styles';
import ConfigMapsTable from './ConfigMapsTable';

/* eslint-disable react/prefer-stateless-function */
export class ConfigMapsPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url, loadConfigMaps } = this.props;
    loadConfigMaps({ url, clusterID, namespaceID });
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
    } = prevProps;
    const { clusterID, namespaceID, url, loadConfigMaps } = this.props;
    if (prevClusterID !== clusterID || prevNamespaceID !== namespaceID) {
      loadConfigMaps({ url, clusterID, namespaceID });
    }
  }

  render() {
    const { classes , clusterID, namespaceID} = this.props;

    return (
      <div className={classes.root}>
        <ConfigMapsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
        <Breadcrumbs 
            data={[
              {
                path: '/clusters/' + clusterID + '/namespaces/' + namespaceID +'/configmaps',
                name: <FormattedMessage {...messages.pageTitle}/>
              }
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.configMaps} />
                    <Link
                      to={`${this.props.location.pathname}/create`}
                      className={classes.createBtnLink}
                    >
                      <IconButton
                        aria-label={<FormattedMessage {...messages.configMaps} />}
                      >
                        <AddIcon style={{ color: '#fff' }} />
                      </IconButton>
                    </Link>
                  </h4>
                </CardHeader>
                <CardBody>
                  <ConfigMapsTable />
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
)(ConfigMapsPage);
