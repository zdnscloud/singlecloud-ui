import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';
import dialogStyles from 'jss/dialog';

export const styles = (theme) => ({
  ...pageStyles(theme),
  ...dialogStyles(theme),
  radioControl: {
    marginTop: 10,
    flexDirection: 'row',
  },
});

export default makeStyles(styles);
