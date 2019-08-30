/**
 *
 * Show Service
 *
 */
import React, { Fragment, useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import messages from './messages';
import useStyles from './styles';

export const Service = ({ service }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3}>
          <ReadOnlyInput
            label={<FormattedMessage {...messages.formName} />}
            value={service.get('name')}
            fullWidth
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3}>
          <ReadOnlyInput
            label={<FormattedMessage {...messages.formServiceType} />}
            value={service.get('serviceType')}
            fullWidth
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
          <FormattedMessage {...messages.formExposedPorts} />
        </GridItem>
      </GridContainer>
      {service.get('exposedPorts').map((exposedPort, i) => (
        <GridContainer key={i}>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formExposedPortName} />}
              fullWidth
              value={exposedPort.get('name')}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={
                <FormattedMessage {...messages.formExposedPortTarget} />
              }
              fullWidth
              value={exposedPort.get('targetPort')}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={
                <FormattedMessage {...messages.formExposedPortProtocol} />
              }
              fullWidth
              value={exposedPort.get('protocol')}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              label={<FormattedMessage {...messages.formExposedPort} />}
              value={exposedPort.get('port')}
              fullWidth
            />
          </GridItem>
        </GridContainer>
      ))}
    </Fragment>
  );
};

export default Service;
