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

import messages from './messages';

class EventsFilterForm extends PureComponent {
  state = {};

  render() {
    const {
      types,
      namespaces,
      kinds,
      names,
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      initialValues,
      formValues,
      theme,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer style={{ marginBottom: 15 }}>
          <GridItem xs={2} sm={2} md={2}>
            <SelectField
              label={<FormattedMessage {...messages.tableTitleType} />}
              name="type"
              options={[{ label: 'ALL', value: '__all__' }].concat(types)}
              inputProps={{ displayEmpty: true }}
              formControlProps={{
                style: {
                  width: '100%',
                },
              }}
            />
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
            <SelectField
              label={<FormattedMessage {...messages.tableTitleNamespace} />}
              name="namespace"
              options={[{ label: 'ALL', value: '__all__' }].concat(namespaces)}
              inputProps={{ displayEmpty: true }}
              formControlProps={{
                style: {
                  width: '100%',
                },
              }}
            />
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
            <SelectField
              label={<FormattedMessage {...messages.tableTitleKind} />}
              name="kind"
              options={[{ label: 'ALL', value: '__all__' }].concat(kinds)}
              inputProps={{ displayEmpty: true }}
              formControlProps={{
                style: {
                  width: '100%',
                },
              }}
            />
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
            <SelectField
              label={<FormattedMessage {...messages.tableTitleName} />}
              name="name"
              options={[{ label: 'ALL', value: '__all__' }].concat(names)}
              inputProps={{ displayEmpty: true }}
              formControlProps={{
                style: {
                  width: '100%',
                },
              }}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default EventsFilterForm;
