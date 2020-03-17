import React, { PureComponent, Fragment, useState,useEffect } from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  FormSection,
  reduxForm,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import useStyles from './styles';
import messages from './messages';

export const formName = 'createAlarmForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const Form = ({ formValues, handleSubmit, error }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? <ConfirmDialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          content={<p className={classes.saveFaildText}>{getByKey(error, ['response', 'message'])}</p>}
          hideActions
          type="save"
          showCloseIcon
        />: null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.clusterThreshold} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formCPU} />}
                    normalize={(val) => (val ? Number(val) : val)}
                    name="cpu"
                    fullWidth
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      endAdornment: '%',
                    }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formMemory} />}
                    normalize={(val) => (val ? Number(val) : val)}
                    name="memory"
                    fullWidth
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      endAdornment: '%',
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formStorage} />}
                    normalize={(val) => (val ? Number(val) : val)}
                    name="storage"
                    fullWidth
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      endAdornment: '%',
                    }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formPodCount} />}
                    normalize={(val) => (val ? Number(val) : val)}
                    name="podCount"
                    fullWidth
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      endAdornment: '%',
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formMailTo} />}
                    name="mailTo"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formMailFrom} />}
                    name="mailFrom.user"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formPassword} />}
                    name="mailFrom.password"
                    fullWidth
                    inputProps={{ type: 'password', autoComplete: 'off' }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formSMTP} />}
                    name="mailFrom.host"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formSMTPPort} />}
                    name="mailFrom.port"
                    fullWidth
                    normalize={(val) => (val ? Number(val) : val)}
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );
};

const CreateAlarmForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateAlarmForm;
