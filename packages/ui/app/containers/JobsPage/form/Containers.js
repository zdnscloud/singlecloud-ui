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

import Ports from './Ports';
import Volumes from './Volumes';
import Envs from './Envs';
import messages from '../messages';

const Containers = ({
  fields,
  meta: { error, submitFailed },
  configMaps,
  classes,
  formValues,
}) => {
  const configMapsOptions = configMaps
    .toList()
    .map((m) => ({
      label: m.get('name'),
      value: m.get('id'),
    }))
    .unshift({
      label: <FormattedMessage {...messages.formNone} />,
      value: '',
    });

  return (
    <Card style={{ padding: 0, marginBottom: 0 }}>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>
          <FormattedMessage {...messages.formContainers} />
        </h4>
      </CardHeader>
      <CardBody>
        <List component="ul">
          <ListItem>
            <ListItemText>
              <Button color="secondary" onClick={(evt) => fields.push({})}>
                <FormattedMessage {...messages.formAddContainer} />
                <PlusIcon />
              </Button>
            </ListItemText>
          </ListItem>
          {submitFailed && error && (
            <ListItem>
              <Danger>{error}</Danger>
            </ListItem>
          )}
          {fields.map((f, i) => (
            <ListItem key={i}>
              <Card key={i}>
                <CardBody>
                  <ListItemText>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.name`}
                          label={
                            <FormattedMessage {...messages.formContainerName} />
                          }
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.image`}
                          label={<FormattedMessage {...messages.formImage} />}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.command`}
                          label={<FormattedMessage {...messages.formCommand} />}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.args`}
                          label={<FormattedMessage {...messages.formArgs} />}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={6} sm={6} md={6}>
                        <FieldArray name={`${f}.env`} component={Envs} />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                        <FieldArray
                          name={`${f}.volumes`}
                          component={Volumes}
                          containerIndex={i}
                          configMapsOptions={configMapsOptions}
                          formValues={formValues}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                        <FieldArray
                          name={`${f}.exposedPorts`}
                          component={Ports}
                        />
                      </GridItem>
                    </GridContainer>
                  </ListItemText>
                </CardBody>
              </Card>
              {fields.length > 1 ? (
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                >
                  <MinusIcon />
                </IconButton>
              ) : null}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

export default Containers;
