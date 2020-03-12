import React, { Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import MinusIcon from 'components/Icons/Minus';
import SelectField from 'components/Field/SelectField';

import messages from '../messages';

export const Ports = ({
  fields,
  classes,
  meta: { error, submitFailed },
  role,
}) => {
  const options = [
    { label: 'TCP', value: 'tcp' },
    { label: 'UDP', value: 'udp' },
  ];
  
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
         
          {role === 'update' ? (
            <p> <FormattedMessage {...messages.formExposedPortBtn} /></p>
          ) : (
            <Button
              className={classes.addNodeBtn}
              style={{ marginBottom: fields && fields.length > 0 ? 25 : 0 }}
              variant="contained" color="primary"
              onClick={(evt) =>
                fields
                  .push(fromJS({}))
              }
            >
              <span className={classes.plusIcon}>+</span>
              <FormattedMessage {...messages.formExposedPortBtn} />
            </Button>
          )}
        </GridItem>
      </GridContainer>
      <Card  className={classes.addList} border={fields&&fields.length>0 ? 'border':null } >
        <CardBody>
          {fields.map((f, i) => (
            <GridContainer key={i}>
              <GridItem xs={3} sm={3} md={3}>
                <InputField
                  name={`${f}.name`}
                  disabled={role === 'update'}
                  fullWidth
                  label={<FormattedMessage {...messages.formPortName} />}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <SelectField
                  label={
                    <FormattedMessage {...messages.formPortProtocol} />
                  }
                  name={`${f}.protocol`}
                  formControlProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  disabled={role === 'update'}
                  options={options}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <InputField
                  name={`${f}.port`}
                  fullWidth
                  label={<FormattedMessage {...messages.formPort} />}
                  normalize={(val) => (val ? Number(val) : val)}
                  inputProps={{
                    type: 'number',
                  }}
                  disabled={role === 'update'}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                {role === 'update' ? null : <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                  className={classes.minusIcon}
                >
                  <MinusIcon />
                </IconButton> }
              </GridItem>
            </GridContainer>
          ))}
        </CardBody>
      </Card>
    </Fragment>
  )
};

export default Ports;
