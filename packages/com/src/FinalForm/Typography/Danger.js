import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import typographyStyle from './typographyStyle';

function Danger({ ...props }) {
  const { classes, inverse, children, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.dangerText} ${
        inverse ? 'inverse' : ''
      }`}
    >
      {children}
    </div>
  );
}

Danger.propTypes = {
  classes: PropTypes.object.isRequired,
  inverse: PropTypes.bool,
};

export default withStyles(typographyStyle)(Danger);
