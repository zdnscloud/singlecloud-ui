import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  formPlusIcon: {
    position: 'absolute',
    left: '25%',
    top: -33,
  },
  formTable: {
    marginTop: 30,
  },
  h4: {
    margin: 0,
  },
});

export default makeStyles(styles);
