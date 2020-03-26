import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';
const Targets = ({
  fields,
  classes,
  meta: { error, submitFailed },
}) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <Button
          className={classNames(classes.addNodeBtn,classes.addBtn)}
          variant="contained" color="primary"
          onClick={(evt) => fields.push(fromJS(''))}
        >
          <AddIcon className={classes.plusIcon} />
          <FormattedMessage {...messages.formAddTarget} />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    <Card>
      <CardBody className={classes.addList}> 
        {fields.map((f, i) => (
          <GridContainer key={i}>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.formTarget} />}
                name={`${f}`}
                fullWidth
                inputProps={{ type: 'text', autoComplete: 'off' }}
              />
            </GridItem>
            {fields && fields.length > 1 ? <GridItem
              xs={3}
              sm={3}
              md={3}
              className={classes.formLine}
              style={{ paddingTop: 12 }}
            >
              <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
                <MinusIcon />
              </IconButton>
            </GridItem> : null}
         
          </GridContainer>
        ))}
      </CardBody>
    </Card>
   
  </Fragment>
);

export default Targets;
