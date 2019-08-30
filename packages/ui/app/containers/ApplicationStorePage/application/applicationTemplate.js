import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem';
import Button from '@material-ui/core/Button';
import RightArrowIcon from 'components/Icons/RightArrow';
import messages from '../messages';

const ApplicationTemplate = ({ classes, item, clusterID, namespaceID }) => (
  <GridItem xs={3} sm={3} md={3}>
    <div className={classes.appWrap}>
      <img alt="icon" src={item.get('icon')} className={classes.appLogo} />
      <div className={classes.line}></div>
      <p className={classes.aapName}>{item.get('name')}</p>
      <p className={classes.appDiscribe}>{item.get('description')}</p>
      <Button
        to={`/clusters/${clusterID}/namespaces/${namespaceID}/charts/${item.get(
          'id'
        )}/show`}
        component={Link}
        className={classes.appDetailBtn}
      >
        <FormattedMessage {...messages.viewDetailButton} />
        <RightArrowIcon className={classes.rightArrowIcon} />
      </Button>
    </div>
  </GridItem>
);

export default ApplicationTemplate;
