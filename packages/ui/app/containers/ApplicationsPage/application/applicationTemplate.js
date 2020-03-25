import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/CustomButtons/Button';
import DeleteIcon from 'components/Icons/Delete';
import Confirm from 'components/Confirm/Confirm';

import messages from '../messages';
import useStyles from '../styles';

const ApplicationTemplate = ({
  clusterID,
  namespaceID,
  item,
  removeApplication,
}) => {
  const classes = useStyles();
  const handleConfirm = () => {
    removeApplication(item.get('id'), {
      url: item.getIn(['links', 'remove']),
      clusterID,
      namespaceID,
    });
  };

  const renderName = () => {
    switch (true) {
      case  item.get('status') === 'succeed' && item.get('deletionTimestamp') === null:
        return( <Button
          link 
          to={`/clusters/${clusterID}/namespaces/${namespaceID}/applications/${item.get(
            'id'
          )}/show`}
          component={Link}
          className={classes.appDetailBtn}
          title={item.get('name')}
        >
          {item.get('name')}
        </Button>)
      case item.get('deletionTimestamp') !== null:
        return( <p className={classes.strikeoutAppName} title={item.get('name')}>
          {item.get('name')}
        </p>)
      default:
        return( <p className={classes.appName} title={item.get('name')}>
          {item.get('name')}
        </p>)
    }
  };

  return (
    <Fragment>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        {item.size > 0 ? (
          <div className={classes.appWrap}>
            <img
              alt="icon"
              src={item.get('chartIcon')}
              className={classes.listAppLogo}
            />
            <div className={classes.appContent}>
              {item.get('injectServiceMesh') === true ? (
                <Fragment>
                  <div className={classes.meshWrap}></div>
                  <div className={classes.meshText}>mesh</div>
                </Fragment>
              ) : null}
              <div>
                <div
                  className={classes.status}
                  title={item.get('status')}
                  style={
                    item.get('status') === 'delete' ||
                    item.get('status') === 'failed'
                      ? { background: '#E02020' }
                      : { background: '#6DD400' }
                  }
                ></div>
                {renderName()}
              </div>
              <div className={classes.count}>
                {item.get('readyWorkloadCount')
                  ? item.get('readyWorkloadCount')
                  : '--'}{' '}
                / {item.get('workloadCount') ? item.get('workloadCount') : '--'}
                <Confirm
                  handleConfirm={handleConfirm}
                  dialogContentText={messages.removeAppText}
                  component={<DeleteIcon className={ item.get('deletionTimestamp') ? classes.disabledDeleteIcon :classes.deleteIcon}  />}
                  disabled={item.get('deletionTimestamp')}
                />
              </div>
            </div>
          </div>
        ) : null}
      </GridItem>
    </Fragment>
  );
};

export default ApplicationTemplate;
