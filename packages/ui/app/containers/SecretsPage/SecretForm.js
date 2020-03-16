import React, { PureComponent, Fragment, useState,useEffect } from 'react';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from 'components/Icons/Minus';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import messages from './messages';

const renderConfigs = ({ fields, meta: { error, submitFailed }, classes }) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.addNodeBtnWrap}>
        <Button
          className={classes.addNodeBtn}
          variant="contained" color="primary"
          onClick={(evt) => fields.push(fromJS({}))}
        >
          <span className={classes.plusIcon}>+</span>
          <FormattedMessage {...messages.formData} />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    <Card border={fields&&fields.length>0 ? 'border':null } className={classes.addList}>
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i}>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.key`}
                fullWidth
                label={<FormattedMessage {...messages.formDataKey} />}
              />
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.value`}
                fullWidth
                label={<FormattedMessage {...messages.formDataValue} />}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <IconButton
                variant="contained"
                onClick={(evt) => fields.remove(i)}
                className={classes.minusIcon}
              >
                <MinusIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        ))}
      </CardBody>
    </Card>
  </Fragment>
) ;

const SecretForm = ({
  clusters,
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  edit,
  initialValues,
  secret,
  type,
}) =>{
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
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          {type === 'create' ? (
            <InputField
              label={<FormattedMessage {...messages.formName} />}
              name="name"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                disabled: edit,
              }}
              fullWidth
            />
          ) : (
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formName} />}
              value={secret ? secret.get('name') : ''}
              formControlProps={{
                className: classes.nameControl,
              }}
              fullWidth
            />
          )}
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <FieldArray name="data" component={renderConfigs} classes={classes} />
        </GridItem>
      </GridContainer>
    </form>
  )
} ;

export default SecretForm;
