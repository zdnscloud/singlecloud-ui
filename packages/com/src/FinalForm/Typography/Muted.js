import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import typographyStyle from './typographyStyle';

function Muted({ ...props }) {
  const { classes, children, inverse, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.mutedText} ${
        inverse ? 'inverse' : ''
      }`}
    >
      {children}
    </div>
  );
}

Muted.propTypes = {
  classes: PropTypes.object.isRequired,
  inverse: PropTypes.bool,
};

export default withStyles(typographyStyle)(Muted);
