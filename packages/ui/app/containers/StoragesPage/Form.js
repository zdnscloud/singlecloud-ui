import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

import Button from 'components/CustomButtons/Button';
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

import messages from './messages';
import Hosts from './form/Hosts';

const StorageForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  profile,
  blockDevices,
  initialValues,
  formValues,
  edit,
}) => (
  <form className={classes.form} onSubmit={handleSubmit}>
    <GridContainer className={classes.grid}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formStorage} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {error ? (
                <GridItem xs={12} sm={12} md={12}>
                  <Danger>{getByKey(error, ['response', 'message'])}</Danger>
                </GridItem>
              ) : null}
              <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    {edit ? (
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.formName} />}
                        value={initialValues.get('name')}
                        fullWidth
                      />
                    ) : (
                      <InputField
                        label={<FormattedMessage {...messages.formName} />}
                        name="name"
                        fullWidth
                        inputProps={{
                          type: 'text',
                          autoComplete: 'off',
                        }}
                      />
                    )}
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    {edit ? (
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formStorageType} />
                        }
                        value={initialValues.get('storageType')}
                        fullWidth
                      />
                    ) : (
                      <SelectField
                        label={
                          <FormattedMessage {...messages.formStorageType} />
                        }
                        name="storageType"
                        fullWidth
                        options={['lvm', 'ceph']}
                      />
                    )}
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formHostnames} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                <Field
                  name="hosts"
                  classes={classes}
                  blockDevices={blockDevices}
                  component={Hosts}
                  values={formValues.get('hosts')}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  </form>
);

export default StorageForm;
