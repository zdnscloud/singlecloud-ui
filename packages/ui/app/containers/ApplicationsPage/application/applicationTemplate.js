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
import Confirm from 'components/Confirm/Confirm'

class ApplicationTemplate extends PureComponent {
  state = {};

  render() {
    const {
      classes,
      item,
      removeApplication,
      clusterID,
      namespaceID
    } = this.props;

    const handleConfirm  = () => {
      removeApplication(item.get('id'),{url: item.getIn(['links', 'remove'])})
    }

    return (
      <Fragment>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <div className={classes.appWrap}>
                 <img alt="icon"  src={item.get('icon')} className={classes.appLogo} />
                <div className={classes.appContent}>
                  { item.get('status') === 'failed' ? 
                     <p className={classes.aapName}>{item.get('name')}</p>
                     :
                    <Button
                      to={`/clusters/${clusterID}/namespaces/${namespaceID}/applications/${item.get('id')}/show`}
                      component={Link}
                      className={classes.appDetailBtn}
                    >
                      <p className={classes.aapName}>{item.get('name')}</p>
                    </Button>
                  }
                  <Confirm 
                    handleConfirm={handleConfirm}
                    dialogContentText ={messages.removeAppText}
                    component ={(
                      <IconButton
                        className={classes.appDeleteBtn}
                      >
                        <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    )
                  }
                />
                </div>
              </div>
          </GridItem>
      </Fragment> 
    );
  }
}

export default ApplicationTemplate;
