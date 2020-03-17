import React, { PureComponent,useState,useEffect } from 'react';
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
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import messages from './messages';
import useStyles from './styles';

const UserQuotaForm = ({
  handleSubmit,
  error,
  initialValues,
  formRole,
  userHash,
}) => {
  const classes = useStyles();
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
        {formRole === 'edit' ? (
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              label={<FormattedMessage {...messages.formClusterName} />}
              value={initialValues.get('clusterName')}
              fullWidth
            />
          </GridItem>
        ) : null}
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          {formRole === 'edit' ? (
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formNamespace} />}
              value={initialValues.get('namespace')}
              fullWidth
            />
          ) : (
            <InputField
              label={<FormattedMessage {...messages.formNamespace} />}
              name="namespace"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
              fullWidth
            />
          )}
        </GridItem>
        {formRole === 'create' ? (
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <small className={classes.username}>{userHash}</small>
          </GridItem>
        ) : null}
      </GridContainer>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <InputField
            label={<FormattedMessage {...messages.formCPU} />}
            name="cpu"
            formControlProps={{
              className: classes.nameControl,
            }}
            inputProps={{
              type: 'text',
              autoComplete: 'off',
              endAdornment: (
                <FormattedMessage {...messages.formCPUEndAdornment} />
              ),
            }}
            fullWidth
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <InputField
            label={<FormattedMessage {...messages.formMemory} />}
            name="memory"
            formControlProps={{
              className: classes.nameControl,
            }}
            inputProps={{
              type: 'text',
              autoComplete: 'off',
              endAdornment: 'Gi',
            }}
            fullWidth
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <InputField
            label={<FormattedMessage {...messages.formStorage} />}
            name="storage"
            formControlProps={{
              className: classes.nameControl,
            }}
            inputProps={{
              type: 'text',
              autoComplete: 'off',
              endAdornment: 'Gi',
            }}
            fullWidth
          />
        </GridItem>
      </GridContainer>
      <GridContainer style={{ marginTop: '20px' }}>
        <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
          <TextareaField
            name="purpose"
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
    </form>
  );
};

export default UserQuotaForm;
