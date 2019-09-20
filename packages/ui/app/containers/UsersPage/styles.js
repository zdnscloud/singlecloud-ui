import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  formLine: {
    height: 80,
  },
  formAuthLine: {},
  nameControl: {
    width: 300,
  },
  passwordControl: {
    width: 300,
  },
});

export default makeStyles(styles);
