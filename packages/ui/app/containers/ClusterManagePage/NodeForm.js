/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import NodeTemplate from './form/NodeTemplate';
import messages from './messages';

class ClusterForm extends PureComponent {
  state = {};

  render() {
    const { handleSubmit, error, classes, formValues, theme } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer className={classes.grid}>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <Card style={{ margin: 0, marginTop: 20 }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.createNode} />
              </h4>
            </CardHeader>
            <CardBody>
              <FieldArray
                name="nodes"
                classes={classes}
                component={NodeTemplate}
                theme={theme}
                formValues={formValues}
              />
            </CardBody>
          </Card>
        </GridContainer>
      </form>
    );
  }
}

export default ClusterForm;
