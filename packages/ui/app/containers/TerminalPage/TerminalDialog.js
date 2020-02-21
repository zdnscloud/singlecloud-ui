/**
 *
 * Terminal Dialog
 *
 */

import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@material-ui/core/Paper';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';

import { makeSelectTermUrl } from 'ducks/app/selectors';
import * as actions from 'ducks/app/actions';

import { useTerm } from 'hooks/term';

import messages from './messages';
import useStyles from './styles';

export const TerminalDialog = ({ url, closeTerminal }) => {
  const classes = useStyles();
  const { open, close, ref } = useTerm();

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth="md"
      open={Boolean(url)}
      onEnter={() => {
        open(url);
      }}
      onExit={() => {
        close();
      }}
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="light" className={classes.dialogHeader}>
          <h4>
            <FormattedMessage {...messages.header} />
          </h4>
          <IconButton onClick={closeTerminal} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.dialogCardBody}>
          <Paper className={classes.dialogCardBodyPaper} ref={ref} />
        </CardBody>
      </Card>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectTermUrl(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TerminalDialog);
