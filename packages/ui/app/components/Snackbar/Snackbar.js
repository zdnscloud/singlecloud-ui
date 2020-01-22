import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Snack from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';

import useStyles from './styles';

export default function Snackbar(props) {
  const classes = useStyles();
  const { message, color, close, icon, place, open } = props;
  let action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <CloseIcon className={classes.close} />
      </IconButton>,
    ];
  }
  let horizontal = null;
  switch (place[1]) {
    case 'l':
      horizontal = 'left';
      break;
    case 'c':
      horizontal = 'center';
      break;
    default:
      horizontal = 'right';
      break;
  }

  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal,
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: `${classes.root} ${classes[color]}`,
          message: classes.message,
        },
      }}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
  close: PropTypes.bool,
  icon: PropTypes.object,
  place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
  open: PropTypes.bool,
  closeNotification: PropTypes.func,
};
