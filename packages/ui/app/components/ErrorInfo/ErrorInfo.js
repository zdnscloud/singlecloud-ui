import React,{ Fragment }  from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from 'components/Grid/GridItem';
import customErrorStyle from './styles';
import WarningIcon from 'components/Icons/ErrorWarning';
import { FormattedMessage} from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import messages from './messages';
import closeIcon from 'images/close.png';

function ErrorInfo({ ...props }) {
  const {
    classes,
    errorText,
    close
  } = props;
  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <div className={classes.errorWrap}>
            <WarningIcon className={classes.warningIcon} /> 
            <IconButton  className={classes.closeIcon} onClick={close}>
              <img alt="close" src={closeIcon} />
            </IconButton>
            <p className={classes.errorTitle}> <FormattedMessage {...messages.warningTitle} /></p>
            <p className={classes.errorText}>{errorText}</p>
          </div>
      </GridItem>
    </Fragment>
  );
}

ErrorInfo.defaultProps = {
  meta: {},
};

ErrorInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  errorText: PropTypes.string,
  close: PropTypes.func
};

export default withStyles(customErrorStyle)(ErrorInfo);
