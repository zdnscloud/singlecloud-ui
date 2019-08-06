import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import SelectField from 'components/Field/SelectField';

import messages from './messages';

class ApplicationForm extends PureComponent {
  state = {};

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      profile,
      initialValues,
      userHash,
      clusters,
      namespaces,
    } = this.props;
    const clustersOptions = clusters.toList().map((sc) => ({
      label: sc.get('name'),
      value: sc.get('name'),
    }));
    const namespacesOptions = namespaces.toList().map((sc) => ({
      label: sc.get('name'),
      value: sc.get('name'),
    }));
    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer className={classes.contentGrid}>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.createApplication} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={2} sm={2} md={2}>
                  <img alt="applicatio logo"  src='' className={classes.appLogo} />
                </GridItem>
                <GridItem xs={10} sm={10} md={10}>
                  <p className={classes.title}>jd</p>
                  <p className={classes.description}>a</p>
                </GridItem>
              </GridContainer>
            </CardBody>
         </Card>

         <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.detailedDesc} />
              </h4>
            </CardHeader>
            <CardBody>
              <p className={classes.detailedDesc}>detailedDesc</p>
            </CardBody>
         </Card>

         <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.configurationOptions} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={<FormattedMessage {...messages.formClusterName} />}
                    name="clusterName"
                    formControlProps={{
                      style: {
                        width: '100%',
                        marginBottom: 17,
                      },
                    }}
                    options={clustersOptions}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={<FormattedMessage {...messages.formNamespaceName} />}
                    name="clusterName"
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                    options={namespacesOptions}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <InputField
                      label={<FormattedMessage {...messages.formChartName} />}
                      name="chartName"
                      formControlProps={{
                        className: classes.nameControl,
                      }}
                      inputProps={{
                        type: 'text',
                        autoComplete: 'off',
                      }}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <SelectField
                      label={<FormattedMessage {...messages.formChartVersion} />}
                      name="chartVersion"
                      formControlProps={{
                        style: {
                          width: '100%',
                        },
                      }}
                      options={[
                        {
                          label: '0.0.1',
                          value: '0.0.1',
                        },
                      ]}
                    />
                  </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <InputField
                    label={<FormattedMessage {...messages.formDBUserName} />}
                    name="name"
                    formControlProps={{
                      className: classes.nameControl,
                    }}
                    inputProps={{
                      type: 'text',
                      autoComplete: 'off',
                    }}
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <InputField
                    label={<FormattedMessage {...messages.formDBPwd} />}
                    name="pwd"
                    formControlProps={{
                      className: classes.nameControl,
                    }}
                    inputProps={{
                      type: 'text',
                      autoComplete: 'off',
                    }}
                    fullWidth
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

export default ApplicationForm;
