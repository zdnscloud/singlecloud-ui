import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import AuthField from 'components/Field/AuthField';

import messages from './messages';

const UserForm = ({
  clusters,
  namespacesData,
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  edit,
  profile,
  initialValues,
}) => {
  const isAdmin = initialValues.get('id') === 'admin';

  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
          <InputField
            label={<FormattedMessage {...messages.username} />}
            name="name"
            formControlProps={{
              className: classes.nameControl,
            }}
            inputProps={{
              type: 'text',
              autoComplete: 'off',
              disabled: edit || profile,
            }}
          />
        </GridItem>
        {!(edit || profile) ? (
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.password} />}
              name="password"
              formControlProps={{
                className: classes.passwordControl,
              }}
              inputProps={{ type: 'password', autoComplete: 'off' }}
            />
          </GridItem>
        ) : null}
        {isAdmin ? null : (
          <GridItem xs={12} sm={12} md={12} className={classes.formAuthLine}>
            <AuthField
              name="projects"
              clusters={clusters}
              namespacesData={namespacesData}
              readOnly={profile}
            />
          </GridItem>
        )}
      </GridContainer>
    </form>
  );
};

export default UserForm;
