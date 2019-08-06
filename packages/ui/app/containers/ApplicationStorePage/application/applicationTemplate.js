import React, { PureComponent ,Fragment} from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { Link } from 'react-router-dom';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Button from '@material-ui/core/Button';
import messages from '../messages';

class ApplicationTemplate extends PureComponent {
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
      formRole,
      role,
    } = this.props;
    // eslint-disable-next-line no-console
    return (
      <Fragment>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <div className={classes.appWrap}>
                  <img alt="icon"  src='' className={classes.appLogo} />
                  <div className={classes.line}></div>
                  <p className={classes.aapName}>name</p>
                  <p className={classes.appDiscribe}>discribe</p>
                  <Button
                      to="/applicationStore/create"
                      component={Link}
                      className={classes.appDetailBtn}
                    >
                      <FormattedMessage {...messages.viewDetailButton} />
                  </Button>
              </div>
          </GridItem>
      </Fragment> 
    );
  }
}

export default ApplicationTemplate;
