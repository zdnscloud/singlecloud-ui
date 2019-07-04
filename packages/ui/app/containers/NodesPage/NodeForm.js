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
// import NodeTemplate from './form/NodeTemplate';
import InputField from 'components/Field/InputField';
import ChexboxesField from 'components/Field/ChexboxesField';
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
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <InputField
                    label={<FormattedMessage {...messages.formHostName} />}
                    name="name"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <InputField
                    label="IP"
                    name="address"
                    fullWidth
                    inputProps={{
                      type: 'text',
                      autoComplete: 'off',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                  <ChexboxesField
                    name="roles"
                    label=""
                    classes={{
                      formControl: classes.chexboxesControl,
                      formLabel: classes.chexboxesLabel,
                      group: classes.chexboxesGroup,
                    }}
                    options={[
                      {
                        label: <FormattedMessage {...messages.formMainNode} />,
                        value: 'controlplane',
                      },
                      {
                        label: <FormattedMessage {...messages.formETCDNode} />,
                        value: 'etcd',
                      },
                      {
                        label: <FormattedMessage {...messages.formWorkNode} />,
                        value: 'worker',
                      },
                      {
                        label: (
                          <FormattedMessage {...messages.formBoundaryNode} />
                        ),
                        value: 'edge',
                      },
                    ]}
                    formControlComponent="div"
                    formLabelComponent="div"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </form>
    );
  }
}

export default ClusterForm;
