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

  return (
    <Fragment>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <div className={classes.appWrap}>
          <img
            alt="icon"
            src={item && item.get('chartIcon')}
            className={classes.appLogo}
          />
          <div className={classes.appContent}>
            {item && item.get('status') === 'failed' ? (
              <p className={classes.aapName}>{item && item.get('name')}</p>
            ) : (
              <Button
                link
                to={`/clusters/${clusterID}/namespaces/${namespaceID}/applications/${item &&
                  item.get('id')}/show`}
                component={Link}
                className={classes.appDetailBtn}
              >
                <p className={classes.aapName}>{item && item.get('name')}</p>
              </Button>
            )}
            <Confirm
              handleConfirm={handleConfirm}
              dialogContentText={messages.removeAppText}
              component={
                <IconButton className={classes.appDeleteBtn}>
                  <DeleteIcon className={classes.deleteIcon} />
                </IconButton>
              }
            />
          </div>
        </div>
      </GridItem>
    </Fragment>
  );
};

export default ApplicationTemplate;
