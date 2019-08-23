import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  switch:{
    marginLeft: 10,
  }
});

export default makeStyles(styles);
