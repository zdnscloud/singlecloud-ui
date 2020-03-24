import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import typographyStyle from './typographyStyle';

function Info({ ...props }) {
  const { classes, children, inverse, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.infoText} ${
        inverse ? 'inverse' : ''
      }`}
    >
      {children}
    </div>
  );
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  inverse: PropTypes.bool,
};

export default withStyles(typographyStyle)(Info);
