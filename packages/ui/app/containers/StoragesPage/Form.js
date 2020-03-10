import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';

import messages from './messages';
import Hosts from './form/Hosts';
import Initiators from './form/Initiators';

const StorageForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  profile,
  blockDevices,
  nodes,
  initialValues,
  formValues,
  edit,
}) => (
  <form className={classes.form} onSubmit={handleSubmit}>
    <GridContainer className={classes.grid}>
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formStorage} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {error ? (
                <GridItem xs={12} sm={12} md={12}>
                  <Danger>{getByKey(error, ['response', 'message'])}</Danger>
                </GridItem>
              ) : null}
              <GridItem xs={12} sm={12} md={12} >
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    {edit ? (
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formStorageName} />
                        }
                        value={initialValues.get('name')}
                        fullWidth
                      />
                    ) : (
                      <InputField
                        label={
                          <FormattedMessage {...messages.formStorageName} />
                        }
                        name="name"
                        fullWidth
                      />
                    )}
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    {edit ? (
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formStorageType} />
                        }
                        value={initialValues.get('type')}
                        fullWidth
                      />
                    ) : (
                      <SelectField
                        label={
                          <FormattedMessage {...messages.formStorageType} />
                        }
                        name="type"
                        fullWidth
                        options={['lvm', 'cephfs', 'iscsi', 'nfs']}
                      />
                    )}
                  </GridItem>
                </GridContainer>
              </GridItem>
              {['iscsi'].includes(formValues.get('type')) ? (
                <>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          label={
                            <FormattedMessage {...messages.formTarget} />
                          }
                          name="parameter.target"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          label={
                            <FormattedMessage {...messages.formPort} />
                          }
                          name="parameter.port"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          label={
                            <FormattedMessage {...messages.formIqn} />
                          }
                          name="parameter.iqn"
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <SwitchField
                          label={
                            <FormattedMessage {...messages.formChap} />
                          }
                          name="parameter.chap"
                          fullWidth
                        />
                      </GridItem>
                      {formValues.getIn(['parameter', 'chap']) === true ? (
                        <>
                          <GridItem xs={3} sm={3} md={3}>
                            <InputField
                              label={
                                <FormattedMessage {...messages.formUsername} />
                              }
                              name="parameter.username"
                              fullWidth
                            />
                          </GridItem>
                          <GridItem xs={3} sm={3} md={3}>
                            <InputField
                              label={
                                <FormattedMessage {...messages.formPassword} />
                              }
                              name="parameter.password"
                              fullWidth
                            />
                          </GridItem>
                        </>
                      ) : null}
                    </GridContainer>
                  </GridItem>
                </>
              ) : null}
              {['nfs'].includes(formValues.get('type')) ? (
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3} >
                      <InputField
                        label={
                          <FormattedMessage {...messages.formServer} />
                        }
                        name="parameter.server"
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3} >
                      <InputField
                        label={
                          <FormattedMessage {...messages.formPath} />
                        }
                        name="parameter.path"
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              ) : null}
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      {['lvm', 'cephfs'].includes(formValues.get('type')) ? (
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.cardMarginTop}>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.formHostnames} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                  <Field
                    name="parameter.hosts"
                    classes={classes}
                    blockDevices={blockDevices}
                    component={Hosts}
                    values={formValues.getIn(['parameter', 'hosts'])}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      ) : null}
      {['iscsi'].includes(formValues.get('type')) ? (
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.cardMarginTop}>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.formInitiators} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                  <Field
                    name="parameter.initiators"
                    classes={classes}
                    nodes={nodes}
                    component={Initiators}
                    values={formValues.getIn(['parameter', 'initiators'])}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      ) : null}
    </GridContainer>
  </form>
);

export default StorageForm;
