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
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';

const Envs = ({ fields, meta: { error, submitFailed }, role,classes }) => (
  <List component="ul" className={classes.noPaddingList}>
    <ListItem>
      <ListItemText>
        {role === 'update' ? (
          <FormattedMessage {...messages.formENV} />
        ) : (
          <Button  
            className={classes.addNodeBtn}
            onClick={(evt) => fields.push(fromJS({}))}
            variant="contained" color="primary"
          >
            <AddIcon className={classes.plusIcon} />
            <FormattedMessage {...messages.formENV} />
          </Button>
        )}
      </ListItemText>
    </ListItem>
    {fields.map((f, i) => (
      <ListItem key={i}>
        <ListItemText>
          <InputField
            name={`${f}.name`}
            label={<FormattedMessage {...messages.formENVName} />}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <InputField
            name={`${f}.value`}
            label={<FormattedMessage {...messages.formENVValue} />}
          />
        </ListItemText>
        {role === 'update' ? null : <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
          <MinusIcon />
        </IconButton>}
        
      </ListItem>
    ))}
  </List>
);

export default Envs;
