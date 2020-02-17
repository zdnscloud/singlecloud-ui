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
import CheckboxesField from 'components/Field/CheckboxesField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';
const NodeMainTemplate = ({
  fields,
  classes,
  meta: { error, submitFailed },
}) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <Button
          className={classes.addNodeBtn}
          variant="contained" color="primary"
          onClick={(evt) =>
            fields.push(fromJS({ name: '', address: '', roles: [] }))
          }
        >
          <span className={classes.plusIcon}>+</span>
          <FormattedMessage {...messages.formAddMainNode} />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    <Card border>
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i + 1}>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.formHostName} />}
                name={`${f}.name`}
                fullWidth
                inputProps={{ type: 'text', autoComplete: 'off' }}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <InputField
                label="IP"
                name={`${f}.address`}
                fullWidth
                inputProps={{
                  type: 'text',
                  autoComplete: 'off',
                }}
              />
            </GridItem>
            <GridItem
              xs={3}
              sm={3}
              md={3}
              className={classes.formLine}
              style={{ paddingTop: 7 }}
            >
              <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
                <MinusIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        ))}
      </CardBody>
    </Card>
   
  </Fragment>
);

export default NodeMainTemplate;
