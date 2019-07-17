import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';

import messages from '../messages';

class SearchForm extends PureComponent {
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
      formRole,
      role,
    } = this.props;
    // eslint-disable-next-line no-console
    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <GridItem xs={6} sm={6} md={6} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.searchFormUserName} />}
              name="userName"
              formControlProps={{
                className: classes.nameControl,
                style: {
                  width: '100%',
                },
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6} className={classes.formLine}>
            <SelectField
              label={<FormattedMessage {...messages.searchFormStatus} />}
              name="status"
              options={[
                {
                  label: <FormattedMessage {...messages.selectAll} />,
                  value: 'all',
                },
                {
                  label: <FormattedMessage {...messages.tableProcessing} />,
                  value: 'processing',
                },
                {
                  label: <FormattedMessage {...messages.tableApproval} />,
                  value: 'approval',
                },
                {
                  label: <FormattedMessage {...messages.tableRejection} />,
                  value: 'rejection',
                },
              ]}
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

export default SearchForm;
