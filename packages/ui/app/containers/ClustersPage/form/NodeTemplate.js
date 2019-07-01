import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import ChexboxesField from 'components/Field/ChexboxesField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';

const NodeTemplate = ({
  fields,
  classes,
  storageClasses,
  meta: { error, submitFailed },
}) => {
 
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <Button color="secondary" onClick={(evt) => fields.push({})}>
            <FormattedMessage {...messages.formAddNode} />
            <PlusIcon />
          </Button>
        </GridItem>
      </GridContainer>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => {
        return (
          <GridContainer key={i}>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.formHostName} />}
                name={`${f}.name`}
                fullWidth
                inputProps={{ type: 'text', autoComplete: 'off' }}
                classes={classes}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <InputField
                label="IP"
                name={`${f}.address`}
                fullWidth
                classes={classes}
                inputProps={{
                  type: 'text',
                  autoComplete: 'off',
                }}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine} style={{ paddingTop: 18 }}>
              <IconButton
                variant="contained"
                onClick={(evt) => fields.remove(i)}
              >
                <MinusIcon />
              </IconButton>
            </GridItem>
            <GridContainer key={i}>
              <GridItem xs={6} sm={6} md={6} className={classes.formLine}>
                  <ChexboxesField
                    name={`${f}.roles`}
                    label=""
                    classes={{
                      formControl: classes.chexboxesControl,
                      formLabel: classes.chexboxesLabel,
                      group: classes.chexboxesGroup,
                    }}
                    options={[
                      { label:  <FormattedMessage {...messages.formMainNode} />, value: 'controlplane' },
                      { label:  <FormattedMessage {...messages.formETCDNode} />, value: 'worker' },
                      { label:  <FormattedMessage {...messages.formWorkNode} />, value: 'etcd' },
                      { label:  <FormattedMessage {...messages.formBoundaryNode} />, value: 'edge' },
                    ]}
                    formControlComponent={'div'}
                    formLabelComponent={'div'}
                  />
              </GridItem>
              </GridContainer>
          </GridContainer>
        );
      })}
    </Fragment>
  );
};

export default NodeTemplate;
