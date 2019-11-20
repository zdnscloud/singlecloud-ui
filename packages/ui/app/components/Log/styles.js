import { makeStyles } from '@material-ui/styles';

export const styles = (theme) => ({
  logsWrapper: {
    width: '70vw',
    backgroundColor: 'black',
    color: 'white',
    overflow: 'auto',
  },
  logs: {
    backgroundColor: 'black',
    color: 'white',
    width: 'fit-content',
  },
  logTime: {
    color: 'green',
    marginLeft: '1em',
  },
  log: {
    backgroundColor: 'black',
    color: 'white',
    marginLeft: '1em',
  },
});

export default makeStyles(styles);
