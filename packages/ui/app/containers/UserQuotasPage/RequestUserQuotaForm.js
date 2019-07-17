import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import TextareaField from 'components/Field/TextareaField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import ReadOnlyTextarea from 'components/CustomTextarea/ReadOnlyTextarea';
import SelectField from 'components/Field/SelectField';

import messages from './messages';

class RequestUserQuotaForm extends PureComponent {
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
      userQuota,
      clusters,
    } = this.props;
    const clustersOptions = clusters.toList().map((sc) => ({
      label: sc.get('name'),
      value: sc.get('name'),
    }));
    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              value={userQuota.get('requestType')}
              labelText={<FormattedMessage {...messages.requestType} />}
              fullWidth
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} style={{ paddingTop: 10 }}>
            <SelectField
              label={<FormattedMessage {...messages.formClusterName} />}
              name="clusterName"
              formControlProps={{
                style: {
                  width: '100%',
                },
              }}
              options={clustersOptions}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formNamespace} />}
              fullWidth
              value={userQuota.get('namespace')}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              value={userQuota.get('cpu')}
              labelText={<FormattedMessage {...messages.formCPU} />}
              fullWidth
              inputProps={{
                endAdornment: (
                  <FormattedMessage {...messages.formCPUEndAdornment} />
                ),
              }}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              value={userQuota.get('memory')}
              labelText={<FormattedMessage {...messages.formMemory} />}
              fullWidth
              inputProps={{
                endAdornment: 'Gi',
              }}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              value={userQuota.get('storage')}
              labelText={<FormattedMessage {...messages.formStorage} />}
              fullWidth
              inputProps={{
                endAdornment: 'Gi',
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
            <ReadOnlyTextarea
              value={userQuota.get('purpose')}
              label={<FormattedMessage {...messages.formPurpose} />}
              formControlProps={{
                className: classes.textareaControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                rows: '4',
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
            <TextareaField
              name="reason"
              label={<FormattedMessage {...messages.formRejectionReason} />}
              formControlProps={{
                className: classes.textareaControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                rows: '4',
              }}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default RequestUserQuotaForm;
