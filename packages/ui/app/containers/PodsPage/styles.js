import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  dialogCard: {
    margin: 0,
  },
  dialogHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogCardBody: {
    height: 'calc(100vh - 225px)',
  },
  dialogCardBodyPaper: {
    display: 'flex',
    height: '100%',
  },
  separateLineWrap: {
    marginTop: '8px',
    marginRight: '5px',
    background: '#eee',
  },
  separateLine: {
    marginTop: '8px',
    boxShadow: '1px 0px 2px #ccc',
    border: '1px solid #ccc',
  },
  removeBtn: {
    float: 'right',
  },
  createBtnLink: {
    position: 'absolute',
    top: '3px',
    right: '10px',
  },
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
  },
  log: {
    backgroundColor: 'black',
    color: 'white',
    marginLeft: '2em',
  },
  tableWrapper: {
    overflow: 'auto',
  },
  button: {
    padding: '0 0 0 5px',
  },
});

export default makeStyles(styles);
