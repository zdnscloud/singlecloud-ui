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
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';

const Volumes = ({
  configMapsOptions,
  secretsOptions,
  containerIndex,
  fields,
  formValues,
  meta: { error, submitFailed },
  classes,
}) => (
  <List component="ul">
    <ListItem>
      <ListItemText>
        <Button  variant="contained" color="primary" onClick={(evt) => fields.push(fromJS({}))}>
          <AddIcon className={classes.plusIcon} />
          <FormattedMessage {...messages.formVolumes} />
        </Button>
      </ListItemText>
    </ListItem>
    {fields.map((f, i) => {
      let names = [];
      const type =
        formValues &&
        formValues.getIn(['containers', containerIndex, 'volumes', i, 'type']);
      const pvcts = formValues && formValues.get('persistentVolumes');
      switch (type) {
        case 'configmap':
          names = configMapsOptions;
          break;
        case 'secret':
          names = secretsOptions;
          break;
        case 'persistentVolume':
          if (pvcts && pvcts.size > 0) {
            names = pvcts.map((pvct) => ({
              label: pvct.get('name'),
              value: pvct.get('name'),
            }));
          }
          break;
        default:
          break;
      }
      return (
        <ListItem key={i}>
          <ListItemText>
            <SelectField
              name={`${f}.type`}
              label={<FormattedMessage {...messages.formVolumeType} />}
              options={[
                {
                  label: (
                    <FormattedMessage {...messages.formVolumeTypeConfigMap} />
                  ),
                  value: 'configmap',
                },
                {
                  label: (
                    <FormattedMessage {...messages.formVolumeTypeSecret} />
                  ),
                  value: 'secret',
                },
                {
                  label: (
                    <FormattedMessage
                      {...messages.formVolumeTypePersistentVolume}
                    />
                  ),
                  value: 'persistentVolume',
                },
              ]}
              formControlProps={{
                style: {
                  width: 146,
                },
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <SelectField
              name={`${f}.name`}
              label={<FormattedMessage {...messages.formVolumeName} />}
              options={names}
              formControlProps={{
                style: {
                  width: 146,
                },
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputField
              name={`${f}.mountPath`}
              label={<FormattedMessage {...messages.formMountPath} />}
            />
          </ListItemText>
          <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
            <MinusIcon />
          </IconButton>
        </ListItem>
      );
    })}
  </List>
);

export default Volumes;
