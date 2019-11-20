import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Paper from '@material-ui/core/Paper';
import LogView from 'components/Log/LogView';

import { useLogs } from 'hooks/logs';

import { makeSelectCurrentID } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import useStyles from './styles';
import messages from './messages';

const LogViewDialog = ({ isOpen, id, closeDialog }) => {
  const classes = useStyles();
  const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/apis/ws.zcloud.cn/v1/clusters/${id}/zkelog`;
  const { open, close, logs } = useLogs();

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      onEnter={() => {
        open(url);
      }}
      onExit={() => {
        close();
      }}
      maxWidth="lg"
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="secondary" className={classes.dialogHeader}>
          <h4>
            <FormattedMessage {...messages.logTitle} />
          </h4>
          <IconButton onClick={closeDialog} style={{ padding: 0 }}>
            <CloseIcon style={{ color: '#fff' }} />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.logCardBody}>
          <Paper className={classes.logCardBodyPaper}>
            <LogView logs={logs} />
          </Paper>
        </CardBody>
        <CardFooter>
          <Button onClick={closeDialog} color="primary" variant="contained">
            <FormattedMessage {...messages.logClose} />
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  id: makeSelectCurrentID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LogViewDialog);
