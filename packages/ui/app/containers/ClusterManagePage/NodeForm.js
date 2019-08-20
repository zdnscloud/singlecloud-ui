/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import NodeMainTemplate from './form/NodeMainTemplate';
import NodeWorkTemplate from './form/NodeWorkTemplate';
import InputField from 'components/Field/InputField';
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
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray
              name="nodes.main"
              classes={classes}
              component={NodeMainTemplate}
              theme={theme}
              formValues={formValues}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray
              name="nodes.work"
              classes={classes}
              component={NodeWorkTemplate}
              theme={theme}
              formValues={formValues}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default ClusterForm;
