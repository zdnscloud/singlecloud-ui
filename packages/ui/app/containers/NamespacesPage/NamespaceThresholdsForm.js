import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import messages from './messages';

const Form = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  profile,
  initialValues,
  type,
}) => (
  <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
    {error ? (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Danger>{getByKey(error, ['response', 'message'])}</Danger>
        </GridItem>
      </GridContainer>
    ) : null}
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <InputField
          label={<FormattedMessage {...messages.storageQuota} />}
          name="cpu"
          fullWidth
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </GridItem>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <InputField
          label={<FormattedMessage {...messages.storageQuota} />}
          name="memory"
          fullWidth
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </GridItem>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <InputField
          label={<FormattedMessage {...messages.storageQuota} />}
          name="storage"
          fullWidth
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <InputField
          label={<FormattedMessage {...messages.storageQuota} />}
          name="podStorage"
          fullWidth
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <InputField
          label={<FormattedMessage {...messages.storageQuota} />}
          name="mailTo"
          fullWidth
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </GridItem>
    </GridContainer>
  </form>
);

export default Form;
