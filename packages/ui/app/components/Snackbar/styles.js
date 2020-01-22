import { makeStyles } from '@material-ui/core/styles';
import hexToRgb from '@gsmlg/utils/hexToRgb';

const snackbarStyle = (theme) => ({
  root: {
    ...theme.palette.defaultFont,
    flexWrap: 'unset',
    position: 'relative',
    padding: '20px 15px',
    lineHeight: '20px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: theme.palette.text.c,
    color: theme.palette.text.b,
    borderRadius: '3px',
    minWidth: 'unset',
    maxWidth: 'unset',
    boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
      theme.palette.text.c
    )}, 0.28), 0 4px 20px 0px rgba(${hexToRgb(
      theme.palette.text.a
    )}, 0.12), 0 7px 8px -5px rgba(${hexToRgb(theme.palette.text.c)}, 0.2)`,
  },
  top20: {
    top: '20px',
  },
  top40: {
    top: '40px',
  },
  info: {
    backgroundColor: theme.palette.text.info,
    color: theme.palette.text.c,
  },
  success: {
    backgroundColor: theme.palette.text.success,
    color: theme.palette.text.c,
  },
  warning: {
    backgroundColor: theme.palette.text.warning,
    color: theme.palette.text.c,
  },
  danger: {
    backgroundColor: theme.palette.text.danger,
    color: theme.palette.text.c,
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.c,
  },
  message: {
    padding: '0',
    display: 'block',
    maxWidth: '89%',
  },
  close: {
    width: '11px',
    height: '11px',
  },
  iconButton: {
    width: '24px',
    height: '24px',
    padding: '0px',
  },
  icon: {
    display: 'block',
    left: '15px',
    position: 'absolute',
    top: '50%',
    marginTop: '-15px',
    width: '30px',
    height: '30px',
  },
  infoIcon: {
    color: theme.palette.text.info,
  },
  successIcon: {
    color: theme.palette.text.success,
  },
  warningIcon: {
    color: theme.palette.text.warning,
  },
  dangerIcon: {
    color: theme.palette.text.danger,
  },
  primaryIcon: {
    color: theme.palette.primary.main,
  },
  iconMessage: {
    paddingLeft: '50px',
    display: 'block',
  },
  actionRTL: {
    marginLeft: '-8px',
    marginRight: 'auto',
  },
});

export default makeStyles(snackbarStyle);
