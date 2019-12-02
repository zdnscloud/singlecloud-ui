import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  formPlusIcon: {
    position: 'absolute',
    left: '24%',
    top: -40,
  },
});

export default makeStyles(styles);
