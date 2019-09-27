/**
 *
 * Inner Charts
 *
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import _ from 'lodash';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InnerServiceTree from 'components/tree/InnerServiceTree';

import { makeSelectInnerServices } from 'ducks/innerServices/selectors';

import useStyles from './styles';
import messages from './messages';

const separator = '$';

export const InnerCharts = ({ innerServices }) => {
  const classes = useStyles();
  const [width, setWidth] = useState(400);
  const ref = useCallback((el) => {
    if (el) {
      const { width: w } = el.getBoundingClientRect();
      setWidth(w - 40);
    }
  }, []);
  const is = innerServices.toJS() || [];

  return (
    <GridContainer style={{ display: 'block' }}>
      {is &&
        is.map &&
        is.map((s, i) => {
          const [type, idx, name] = s.name.split(separator);
          const { children } = s;
          const count = _.reduce(
            children,
            (n, c) => {
              const m = _.reduce(c.children, (nn, cc) => nn + 1, 0);
              return n + (m < 4 ? 4 : m);
            },
            0
          );

          return (
            <GridItem
              xs={12}
              sm={6}
              md={6}
              key={i}
              style={{ float: i % 2 === 0 ? 'left' : 'right' }}
            >
              <Card>
                <CardHeader color="default" icon>
                  <h3 className={classes.cardTitle}>
                    <b>
                      <FormattedMessage {...messages.innerServiceName} />
                    </b>
                    {'    '}
                    {name}
                  </h3>
                </CardHeader>
                <CardBody ref={i === 0 ? ref : null}>
                  <InnerServiceTree
                    width={width}
                    height={75 * count > 300 ? 75 * count : 300}
                    data={s}
                  />
                </CardBody>
                <CardFooter />
              </Card>
            </GridItem>
          );
        })}
    </GridContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  innerServices: makeSelectInnerServices(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(InnerCharts);
