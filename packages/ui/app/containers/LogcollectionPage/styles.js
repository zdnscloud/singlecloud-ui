import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';
import dialogStyles from 'jss/dialog';

export const styles = (theme) => ({
  ...pageStyles(theme),
  ...dialogStyles(theme),
  logBtn: { marginRight: 10 },
});

export default makeStyles(styles);
