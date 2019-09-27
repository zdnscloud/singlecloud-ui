import { makeStyles } from '@material-ui/styles';
import dialogStyles from 'jss/dialog';

export const styles = (theme) => ({
  ...dialogStyles(theme),
  dialogCardBody: {
    display: 'flex',
    height: 'calc(100vh - 225px)',
  },
});

export default makeStyles(styles);
