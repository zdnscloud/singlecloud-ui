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
import AddIcon from '@material-ui/icons/Add';

import injectSaga from 'utils/injectSaga';
import * as actions from './actions';
import saga from './saga';
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

  componentWillMount() {
    this.props.initAction(this.props.match);
  }

  render() {
    const {
      classes,
      openCreateNamespace,
    } = this.props;

    return (
      <div className={classes.root}>
        <NamespacesPageHelmet />
        <CssBaseline />
        <Menubar headerText={<FormattedMessage {...messages.header} />} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.namespaces} />
            <Fab
              color="primary"
              aria-label="create cluster"
              className={classes.menuButton}
              onClick={openCreateNamespace}
            >
              <AddIcon />
            </Fab>
            <CreateNamespaceDialog />
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <NamespacesTable location={this.props.location} />
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'namespacesPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles),
)(NamespacesPage);
