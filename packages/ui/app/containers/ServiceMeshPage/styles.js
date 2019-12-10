import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  title: {
    borderBottom: 'none !important',
    paddingBottom: '0 !important',
  },
  itemWrap: {
    // margin: '0 auto',
    width: '20%',
  },
  red: {
    backgroundColor: '#F94141',
  },
  green: {
    backgroundColor: '#5AD8A6',
  },
  orange: {
    backgroundColor: '#FF9D4D',
  },
  point: {
    width: 8,
    height: 8,
    borderRaduis: 4,
  },
  gray: {
    backgroundColor: '#F5F5F5',
  },
});

export default makeStyles(styles);
