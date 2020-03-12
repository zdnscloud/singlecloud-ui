import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';

export const Envs = ({
  fields,
  classes,
  meta: { error, submitFailed },
  role,
}) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        {role === 'update' ? (
          <p ><FormattedMessage {...messages.formEnvBtn} /></p>
        ) : (
          <Button
            className={classes.addNodeBtn}
            variant="contained" color="primary"
            onClick={(evt) =>
              fields.push(fromJS({}))
            }
            style={{ marginBottom: fields && fields.length > 0 ? 25 : 0 }}
          >
            <span className={classes.plusIcon}>+</span>
            <FormattedMessage {...messages.formEnvBtn} />
          </Button>
        )}
       
      </GridItem>
    </GridContainer>
    <Card  className={classes.addList} border={fields && fields.length > 0 ? 'border':null } >
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i}>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.name`}
                fullWidth
                label={<FormattedMessage {...messages.formEnvName} />}
              />
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.value`}
                fullWidth
                label={<FormattedMessage {...messages.formEnvValue} />}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              {role === 'update' ? null : <IconButton
                variant="contained"
                onClick={(evt) => fields.remove(i)}
                className={classes.minusIcon}
              >
                <MinusIcon />
              </IconButton>}
            </GridItem>
          </GridContainer>
        ))}
      </CardBody>
    </Card>
     
  </Fragment>
);

export default Envs;
