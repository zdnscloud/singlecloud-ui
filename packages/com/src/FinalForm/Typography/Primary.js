import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import typographyStyle from './typographyStyle';

function Primary({ ...props }) {
  const { classes, children, inverse, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.primaryText} ${
        inverse ? 'inverse' : ''
      }`}
    >
      {children}
    </div>
  );
}

Primary.propTypes = {
  classes: PropTypes.object.isRequired,
  inverse: PropTypes.bool,
};

export default withStyles(typographyStyle)(Primary);
