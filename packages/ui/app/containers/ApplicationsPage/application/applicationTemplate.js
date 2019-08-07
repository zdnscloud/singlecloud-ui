import React, { PureComponent ,Fragment} from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from 'components/Icons/Delete'
import messages from '../messages';

class ApplicationTemplate extends PureComponent {
  state = {};

  render() {
    const {
      classes,
      item,
      removeApplication,
    } = this.props;
    // eslint-disable-next-line no-console
    return (
      <Fragment>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <div className={classes.appWrap}>
                  <GridContainer>
                    <GridItem xs={4} sm={4} md={4}>
                      <img alt="icon"  src='' className={classes.appLogo} />
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                      <Button
                        to="/applications/show"
                        component={Link}
                        className={classes.appDetailBtn}
                      >
                        <p className={classes.aapName}>name</p>
                      </Button>
                      <IconButton
                          className={classes.appDeleteBtn}
                        >
                          <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    </GridItem>
                  </GridContainer>
              </div>
          </GridItem>
      </Fragment> 
    );
  }
}

export default ApplicationTemplate;
