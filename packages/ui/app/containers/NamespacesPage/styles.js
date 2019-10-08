import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  radioControl: {
    flexDirection: 'row',
    marginTop: '10px',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: 3.5,
  },
  radioGroup: {
    flexDirection: 'row',
    marginLeft: '1.5rem',
  },
  chexboxesControl: {
    flexDirection: 'row',
  },
  chexboxesLabel: {
    flexDirection: 'row',
    lineHeight: 3,
  },
  chexboxesGroup: {
    width: 600,
    flexDirection: 'row',
    marginLeft: '0.8rem',
  },
  cancleBtn: {
    marginLeft: '10px',
  },
  linkIcon: {
    width: 18,
    color: theme.palette.highlight.main,
  },
});

export default makeStyles(styles);
