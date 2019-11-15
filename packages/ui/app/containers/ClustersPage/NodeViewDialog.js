import React, { useRef } from 'react';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { fromJS, Map, List } from 'immutable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { withStyles } from '@material-ui/core/styles';
import { Observable } from 'rxjs';
import { map, scan, throttleTime, debounceTime } from 'rxjs/operators';

import * as actions from 'ducks/clusters/actions';

import useStyles from './styles';
import messages from './messages';
import CreateNodeForm from './NodeForm';

export const NodeViewDialog = ({ isOpen, closeDialog, nodes, setNodes }) => {
  const classes = useStyles();
  const formRef = useRef(null);

  const doSubmit = (formValues) => {
    const main = formValues.nodes.main || [];
    const work = formValues.nodes.work || [];
    main.forEach((item) => {
      const { roles } = item;
      if (roles.length > 0) {
        roles.push('controlplane');
      } else {
        item.roles = ['controlplane'];
      }
    });
    work.forEach((item) => {
      const { roles } = item;
      if (roles.length > 0) {
        roles.push('worker');
      } else {
        item.roles = ['worker'];
      }
    });

    setNodes(fromJS(nodes.concat(main).concat(work)));
    closeDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      maxWidth="lg"
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="secondary" className={classes.dialogHeader}>
          <h4>
            <FormattedMessage {...messages.nodeTitle} />
          </h4>
          <IconButton onClick={closeDialog} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.dialogCardBody}>
          <Paper className={classes.dialogCardBodyPaper}>
            <div className={classes.nodesWrapper}>
              <CreateNodeForm
                classes={classes}
                onSubmit={doSubmit}
                formRef={formRef}
                // initialValues={{
                //   nodes: {
                //     main: [{ name: '', addrsss: '', roles: [] }],
                //     work: [{ name: '', addrsss: '', roles: [] }],
                //   },
                // }}
              />
            </div>
          </Paper>
        </CardBody>
        <CardFooter>
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Button
                onClick={() => {
                  formRef.current.dispatchEvent(
                    new Event('submit', { cancelable: true })
                  );
                }}
                type="submit"
                color="primary"
                variant="contained"
              >
                <FormattedMessage {...messages.createClusterButton} />
              </Button>
              <Button
                onClick={closeDialog}
                variant="contained"
                className={classes.cancleBtn}
              >
                <FormattedMessage {...messages.cancleClustersButton} />
              </Button>
            </GridItem>
          </GridContainer>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

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

export default compose(withConnect)(NodeViewDialog);
