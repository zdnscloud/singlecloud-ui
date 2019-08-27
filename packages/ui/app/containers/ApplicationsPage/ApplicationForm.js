import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { FieldArray } from 'redux-form/immutable';
import { fromJS } from 'immutable';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import SelectField from 'components/Field/SelectField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import messages from './messages';
import DynamicForm from './form/dynamicForm';

class ApplicationForm extends PureComponent {

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      initialValues,
      clusters,
      namespaces,
      chart,
      formValues
    } = this.props;

    const clusterID = formValues && formValues.get('clusterID');
    const clustersOptions = clusters.toList().map((sc) => ({
      label: sc.get('name'),
      value: sc.get('name'),
    }));
    const namespacesOptions = namespaces.get(clusterID) ? (namespaces.get(clusterID).toList().map((sc) => ({
      label: sc.get('name'),
      value: sc.get('name'),
    }))) : []
    const versionsOptions = chart.get('versions') ? (chart.get('versions').toList().map((sc) => ({
      label: sc.get('version'),
      value: sc.get('version'),
    }))) : []
    const chartVersion = formValues && formValues.get('chartVersion');
    const config = chartVersion ? (chart.get('versions').filter((v) => v.version !== chartVersion).getIn([0,'config'])) : []
  
    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer className={classes.contentGrid}>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.createApplicationDesc} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={1} sm={1} md={1}>
                  <img alt="application logo"  src={chart.get('icon')} className={classes.appLogo} />
                </GridItem>
                <GridItem xs={11} sm={11} md={11}>
                  <p className={classes.title}>{chart.get('id')}</p>
                  <p className={classes.description}>{chart.get('description')}</p>
                </GridItem>
              </GridContainer>
            </CardBody>
         </Card>

         <Card>
            <CardHeader>
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.detailedDesc} />
              </h4>
            </CardHeader>
            <CardBody>
              <p className={classes.detailedDesc}>detailedDesc</p>
            </CardBody>
         </Card>

         <Card>
            <CardHeader>
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.configurationOptions} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={<FormattedMessage {...messages.formClusterName} />}
                    name="clusterID"
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
                    name="namespaceID"
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
                      label={<FormattedMessage {...messages.formName} />}
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
                    <SelectField
                      label={<FormattedMessage {...messages.formChartVersion} />}
                      name="chartVersion"
                      formControlProps={{
                        style: {
                          width: '100%',
                        },
                      }}
                      options={versionsOptions}
                    />
                  </GridItem>
              </GridContainer>
             
            </CardBody>
         </Card>
          {chartVersion ? <Card>
              <CardHeader>
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.dynamicOptions} />
                </h4>
              </CardHeader>
              <CardBody>
               <FieldArray
                  name="config"
                  classes={classes}
                  component={DynamicForm}
                  config={config}
                  formValues={formValues}
                />
              </CardBody>
            </Card>
         : null} 
        </GridContainer>
      </form>
    );
  }
}

export default ApplicationForm;
