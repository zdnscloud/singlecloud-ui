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

export const VolumeTemplate = ({
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
            fields.push(fromJS({}))
          }
        >
          <span className={classes.plusIcon}>+</span>
          <FormattedMessage {...messages.formVolumeBtn} />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    <Card  className={classes.addList} border={fields&&fields.length>0 ? 'border':null } >
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i}>
            <GridItem xs={3} sm={3} md={3}>
              <InputField
                name={`${f}.type`}
                fullWidth
                label={<FormattedMessage {...messages.formVolumeType} />}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <InputField
                name={`${f}.name`}
                fullWidth
                label={<FormattedMessage {...messages.formVolumeName} />}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <InputField
                name={`${f}.mountPath`}
                fullWidth
                label={<FormattedMessage {...messages.formVolumeMountPath} />}
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
);

export default VolumeTemplate;
