import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form/immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import Ports from './Ports';
import Volumes from './Volumes';
import Envs from './Envs';
import messages from '../messages';
import useStyles from '../styles';

const Containers = ({
  fields,
  meta: { error, submitFailed },
  configMaps,
  secrets,
  formValues,
}) => {
  const classes = useStyles();
  const configMapsOptions = configMaps
    .toList()
    .map((m) => ({
      label: m.get('name'),
      value: m.get('id'),
    }))
    .unshift({
      label: <FormattedMessage {...messages.formNone} />,
      value: '',
    });
  const secretsOptions = secrets
    .toList()
    .map((s) => ({
      label: s.get('name'),
      value: s.get('id'),
    }))
    .unshift({
      label: <FormattedMessage {...messages.formNone} />,
      value: '',
    });

  return (
    <Card>
      <CardHeader>
        <h4>
          <FormattedMessage {...messages.formContainers} />
        </h4>
      </CardHeader>
      <CardBody>
        <List component="ul" className={classes.noPaddingList}>
          <ListItem>
            <ListItemText>
              <Button
                className={classes.addNodeBtn}
                variant="contained" color="primary"
                onClick={(evt) => fields.push(fromJS({}))}
              >
                <AddIcon className={classes.plusIcon} />
                <FormattedMessage {...messages.formAddContainer} />
              </Button>
            </ListItemText>
          </ListItem>
          {submitFailed && error && (
            <ListItem>
              <Danger>{error}</Danger>
            </ListItem>
          )}
          {fields.map((f, i) => (
            <ListItem key={i}>
              <Card key={i} border>
                <CardBody>
                  <ListItemText>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.name`}
                          label={
                            <FormattedMessage {...messages.formContainerName} />
                          }
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.image`}
                          label={<FormattedMessage {...messages.formImage} />}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.command`}
                          label={<FormattedMessage {...messages.formCommand} />}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.args`}
                          label={<FormattedMessage {...messages.formArgs} />}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={6} sm={6} md={6}>
                        <FieldArray name={`${f}.env`} component={Envs}  classes={classes} />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                        <FieldArray
                          name={`${f}.volumes`}
                          component={Volumes}
                          containerIndex={i}
                          configMapsOptions={configMapsOptions}
                          secretsOptions={secretsOptions}
                          formValues={formValues}
                          classes={classes}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                        <FieldArray
                          name={`${f}.exposedPorts`}
                          component={Ports}
                          classes={classes}
                        />
                      </GridItem>
                    </GridContainer>
                  </ListItemText>
                </CardBody>
              </Card>
              {fields.length > 1 ? (
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                >
                  <MinusIcon />
                </IconButton>
              ) : null}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

export default Containers;
