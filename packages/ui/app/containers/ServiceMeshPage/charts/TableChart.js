import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import messages from '../messages';
import useStyles from '../styles';
import Item from '../template/Item';

const TableChart = ({ data }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Item />
    </Fragment>
  );
};

export default TableChart;
