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
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="create cluster"
                        className={classes.menuButton}
                        onClick={openCreateNamespace}
                      >
                        <AddIcon />
                      </Fab>
                      <CreateNamespaceDialog />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <NamespacesTable location={this.props.location} />
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

const mapStateToProps = createStructuredSelector({});

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

const withSaga = injectSaga({ key: 'namespacesPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles)
)(NamespacesPage);
