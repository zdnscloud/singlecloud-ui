import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  node: {
    display: 'flex',
  },
  nodeChart: {
    width: '50%',
  },
  nodeInfo: {
    width: '50%',
  },
  nodeInfoLine: {
    whiteSpace: 'nowrap',
  },
  nodeInfoLineLabel: {
    float: 'left',
    width: '50%',
  },
  nodeInfoLineValue: {
    float: 'left',
    width: '50%',
  },
});

export default makeStyles(styles);
