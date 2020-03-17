/**
 *
 * ClustersPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import getByKey from '@gsmlg/utils/getByKey';

import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import Helmet from 'components/Helmet/Helmet';
import DangerText from 'components/Typography/Danger';
import ErrorDialog from 'components/Dialog/ErrorDialog';

import { makeSelectHttpError } from 'ducks/app/selectors';
import * as actions from 'ducks/app/actions';

import messages from './messages';

export const ErrorDialogPage = ({ error, clearHttpError }) => {
  const status = error && error.status;
  const responseMessage = error && error.response && error.response.message;

  return (
    <ErrorDialog
      title={<FormattedMessage {...messages.dialogTitle} />}
      open={Boolean(error)}
      onClose={clearHttpError}
    >
      <Card>
        <CardBody>
          <DangerText>
            {status === 0 ? <FormattedMessage {...messages.connectionFailed} /> : responseMessage}
          </DangerText>
        </CardBody>
      </Card>
    </ErrorDialog>
  );
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectHttpError(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ErrorDialogPage);
