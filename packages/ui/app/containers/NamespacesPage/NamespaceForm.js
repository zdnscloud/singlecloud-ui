import React, { PureComponent,useState,useEffect } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

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
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
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
  )
};

export default NamespaceForm;
