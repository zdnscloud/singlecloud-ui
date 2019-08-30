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

const NamespaceForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  profile,
  initialValues,
  type,
  namespaceID,
}) => (
  <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
    <GridContainer>
      {error ? (
        <GridItem xs={12} sm={12} md={12}>
          <Danger>{getByKey(error, ['response', 'message'])}</Danger>
        </GridItem>
      ) : null}
      {type === 'edit' ? (
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <ReadOnlyInput
            labelText={<FormattedMessage {...messages.formName} />}
            fullWidth
            value={namespaceID}
          />
        </GridItem>
      ) : (
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <InputField
            label={<FormattedMessage {...messages.formName} />}
            name="name"
            fullWidth
            inputProps={{
              type: 'text',
              autoComplete: 'off',
            }}
          />
        </GridItem>
      )}
    </GridContainer>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <InputField
          label={<FormattedMessage {...messages.storageQuota} />}
          name="storage"
          fullWidth
          inputProps={{
            autoComplete: 'off',
            endAdornment: 'Gi',
          }}
        />
      </GridItem>
    </GridContainer>
  </form>
);

export default NamespaceForm;
