import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';
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
import {
  makeSelectNodesList,
  makeSelectNodeIsOpening,
} from 'ducks/clusters/selectors';

import { withStyles } from '@material-ui/core/styles';
import { Observable } from 'rxjs';
import { map, scan, throttleTime, debounceTime } from 'rxjs/operators';

import * as actions from 'ducks/clusters/actions';

import styles from './styles';
import messages from './messages';
import NodeForm from './NodeForm';

export const formName = 'createNodeForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const CreateNodeForm = reduxForm({
  form: formName,
  validate,
})(NodeForm);

export class NodeViewDialog extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {
      isOpen,
      classes,
      closeNode,
      values,
      submitForm,
      nodeList,
      setNodes,
    } = this.props;
    const doSubmit = (formValues) => {
      const { nodes } = formValues.toJS();
      const { main, work } = nodes;
      main.forEach((item) => {
        if (Object.keys(item).length !== 0) {
          if (item.roles) {
            item.roles.push('controlplane');
          } else {
            item.roles = ['controlplane'];
          }
        }
      });
      work.forEach((item) => {
        if (Object.keys(item).length !== 0) {
          if (item.roles) {
            item.roles.push('worker');
          } else {
            item.roles = ['worker'];
          }
        }
      });
      const nodeArr = main.concat(work).filter((v) => v.roles);
      if (nodeArr.length > 0) {
        setNodes(nodeList.concat(fromJS(nodeArr)));
        closeNode();
      } else {
        closeNode();
      }
    };
    return (
      <Dialog
        open={isOpen}
        onClose={closeNode}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        PaperProps={{ style: { overflow: 'hidden' } }}
      >
        <Card className={classes.dialogCard}>
          <CardHeader color="secondary" className={classes.dialogHeader}>
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.nodeTitle} />
            </h4>
            <IconButton onClick={closeNode} style={{ padding: 0 }}>
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>
          </CardHeader>
          <CardBody className={classes.dialogCardBody}>
            <Paper className={classes.dialogCardBodyPaper}>
              <div className={classes.nodesWrapper}>
                <CreateNodeForm
                  classes={classes}
                  onSubmit={doSubmit}
                  formValues={values}
                  initialValues={fromJS({ nodes: { main: [{}], work: [{}] } })}
                />
              </div>
            </Paper>
          </CardBody>
          <CardFooter>
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Button
                  onClick={submitForm}
                  color="primary"
                  variant="contained"
                >
                  <FormattedMessage {...messages.nodeSave} />
                </Button>
                <Button
                  onClick={closeNode}
                  variant="contained"
                  className={classes.cancleBtn}
                >
                  <FormattedMessage {...messages.nodeClose} />
                </Button>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </Card>
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectNodeIsOpening(),
  values: getFormValues(formName),
  nodeList: makeSelectNodesList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NodeViewDialog));
