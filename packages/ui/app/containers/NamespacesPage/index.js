/**
 *
 * NamespacesPage
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
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import { makeSelectClusterID } from '../App/selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import NamespacesTable from './NamespacesTable';
import NamespacesPageHelmet from './helmet';
import CreateNamespaceDialog from './CreateNamespaceDialog';

/* eslint-disable react/prefer-stateless-function */
export class NamespacesPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  // componentWillMount() {
  //   this.props.initAction();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.clusterID !== this.props.clusterID) {
  //     this.props.initAction();
  //   }
  // }

  render() {
    const { classes, openCreateNamespace } = this.props;

    return (
      <div className={classes.root}>
        <NamespacesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Typography component="div" className="">
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.namespaces} />
                      <IconButton
                        aria-label={<FormattedMessage {...messages.namespaces} />}
                        className={classes.menuButton}
                        onClick={openCreateNamespace}
                      >
                        <AddIcon nativeColor="#fff" />
                      </IconButton>
                      <CreateNamespaceDialog />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <NamespacesTable />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
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
)(NamespacesPage);
