/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import FileReaderField from 'components/Field/FileReaderField';
import Button from 'components/CustomButtons/Button';
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
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.formCreate} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formClusterName} />}
                      name="name"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={
                        <FormattedMessage {...messages.formClusterSuffix} />
                      }
                      name="clusterDomain"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={
                        <FormattedMessage {...messages.formSinglecloudUrl} />
                      }
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="singlecloudAddress"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formSSHUser} />}
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="sshUser"
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <FileReaderField
                      label={<FormattedMessage {...messages.formSSHKey} />}
                      name="sshKey"
                      buttonProps={{
                        color: 'default',
                        variant: 'text',
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <SwitchField
                      name="enableAdvancedOptions"
                      label={
                        <FormattedMessage {...messages.formAdvancedOptions} />
                      }
                    />
                  </GridItem>
                </GridContainer>
                {formValues && formValues.get('enableAdvancedOptions') ? (
                  <FormSection name="advancedOptions">
                    <GridContainer>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={<FormattedMessage {...messages.formSSHPort} />}
                          fullWidth
                          name="sshPort"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={
                            <FormattedMessage {...messages.formServiceIP} />
                          }
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="serviceCidr"
                        />
                      </GridItem>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={<FormattedMessage {...messages.formPodIP} />}
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="clusterCidr"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={6}
                        sm={6}
                        md={6}
                        className={classes.formLine}
                      >
                        <RadioField
                          name="network.plugin"
                          label={
                            <FormattedMessage {...messages.formClustersNet} />
                          }
                          classes={{
                            formControl: classes.radioControl,
                            formLabel: classes.radioLabel,
                            group: classes.radioGroup,
                          }}
                          options={[
                            { label: 'flannel', value: 'flannel' },
                            { label: 'calico', value: 'calico' },
                          ]}
                          formControlComponent="div"
                          formLabelComponent="div"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={
                            <FormattedMessage {...messages.formClustersDNSIP} />
                          }
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="clusterDNSServiceIP"
                        />
                      </GridItem>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={
                            <FormattedMessage {...messages.formForwardDNSFirst} />
                          }
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="clusterUpstreamDNS[0]"
                        />
                      </GridItem>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={
                            <FormattedMessage {...messages.formForwardDNSSecond} />
                          }
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="clusterUpstreamDNS[1]"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <label>
                          <FormattedMessage
                            {...messages.formPrivateWarehouses}
                          />
                        </label>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={<FormattedMessage {...messages.formUrl} />}
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="privateRegistries[0].url"
                        />
                      </GridItem>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={
                            <FormattedMessage {...messages.formCACertificate} />
                          }
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="privateRegistries[0].cacert"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={<FormattedMessage {...messages.formUser} />}
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="privateRegistries[0].user"
                        />
                      </GridItem>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        className={classes.formLine}
                      >
                        <InputField
                          label={<FormattedMessage {...messages.formPwd} />}
                          fullWidth
                          inputProps={{ type: 'text', autoComplete: 'off' }}
                          name="privateRegistries[0].password"
                        />
                      </GridItem>
                    </GridContainer>
                  </FormSection>
                ) : null}
              </GridItem>
            </CardBody>
          </Card>
          <Card style={{ margin: 0, marginTop: 20 }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.formNode} />
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
