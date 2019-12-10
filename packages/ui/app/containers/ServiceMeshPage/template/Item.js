import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import LinearProgress from '@material-ui/core/LinearProgress';

import messages from '../messages';
import useStyles from '../styles';
import TemplateTable from './Table';

const Item = ({}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <GridItem className={classes.itemWrap}>
        <Card>
          <CardHeader>
            <h4 className={classes.title}>
              <FormattedMessage {...messages.WorkloadCardTitle} /> /
            </h4>
          </CardHeader>
          <CardBody>
            <LinearProgress
              variant="determinate"
              value={(5 / 10) * 100}
              classes={{
                barColorPrimary: classes.green,
                colorPrimary: classes.gray,
              }}
            />
            <TemplateTable />
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

export default Item;
