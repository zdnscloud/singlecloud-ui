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
import ChexboxesField from 'components/Field/ChexboxesField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';

const NodeWorkTemplate = ({
  fields,
  classes,
  meta: { error, submitFailed },
}) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <Button
          color="secondary"
          onClick={(evt) =>
            fields.push(fromJS({ name: '', addrsss: '', roles: [] }))
          }
        >
          <FormattedMessage {...messages.formAddWorkNode} />
          <PlusIcon />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
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
          style={{ paddingTop: 18 }}
        >
          <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
            <MinusIcon />
          </IconButton>
        </GridItem>
        <GridContainer key={i}>
          <GridItem xs={6} sm={6} md={6} className={classes.formLine}>
            <ChexboxesField
              name={`${f}.roles`}
              label=""
              classes={{
                formControl: classes.chexboxesControl,
                formLabel: classes.chexboxesLabel,
                group: classes.chexboxesGroup,
              }}
              options={[
                {
                  label: <FormattedMessage {...messages.formETCDNode} />,
                  value: 'etcd',
                },
                {
                  label: <FormattedMessage {...messages.formBoundaryNode} />,
                  value: 'edge',
                },
              ]}
              formControlComponent="div"
              formLabelComponent="div"
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
    ))}
  </Fragment>
);

export default NodeWorkTemplate;
