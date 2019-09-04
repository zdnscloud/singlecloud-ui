import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

// core components

import iconButtonStyle from './iconButtonStyle';

function RegularIconButton({ ...props }) {
  const {
    classes,
    children,
    disabled,
    block,
    size,
    className,
    ...rest
  } = props;
  const iconBtnClasses = classNames({
    [classes.iconButton]: true,
    [classes.disabled]: disabled,
    [classes.block]: block,
    [classes[size]]: size,
    [className]: className,
  });
  return (
    <IconButton {...rest} className={iconBtnClasses} disableRipple>
      {children}
    </IconButton>
  );
}

RegularIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  disabled: PropTypes.bool,
  block: PropTypes.bool,
};

export default withStyles(iconButtonStyle)(RegularIconButton);
