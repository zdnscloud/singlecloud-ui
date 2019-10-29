import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  tableBtn: {
    marginRight: 10,
  },
});

export default makeStyles(styles);
