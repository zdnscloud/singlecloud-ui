import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';

import messages from './messages';

class NamespaceForm extends PureComponent {
  state = {};

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      profile,
      initialValues,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.formName} />}
              name="name"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.CPUQuota} />}
              name="limits.cpu"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: (
                  <FormattedMessage {...messages.CPUQuotaEndAdornment} />
                ),
              }}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.memoryQuota} />}
              name="limits.memory"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: 'Gi',
              }}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.storageQuota} />}
              name="limits.storage"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: 'Gi',
              }}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default NamespaceForm;
