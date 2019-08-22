import React, { PureComponent ,Fragment} from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem';
import Button from '@material-ui/core/Button';
import messages from '../messages';
import RightArrowIcon from 'components/Icons/RightArrow';

class ApplicationTemplate extends PureComponent {

  render() {
    const {
      classes,
      item
    } = this.props;
    return (
      <Fragment>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <div className={classes.appWrap}>
                  <img alt="icon"  src={item.get('icon')} className={classes.appLogo} />
                  <div className={classes.line}></div>
                  <p className={classes.aapName}>{item.get('name')}</p>
                  <p className={classes.appDiscribe}>{item.get('description')}</p>
                  <Button
                      to={`/applications/${item.get('id')}/create`}
                      component={Link}
                      className={classes.appDetailBtn}
                    >
                      <FormattedMessage {...messages.viewDetailButton} />
                      <RightArrowIcon className={classes.rightArrowIcon} />
                  </Button>
              </div>
          </GridItem>
      </Fragment> 
    );
  }
}

export default ApplicationTemplate;
