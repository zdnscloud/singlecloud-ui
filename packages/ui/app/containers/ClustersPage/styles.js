import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';
import dialogStyles from 'jss/dialog';

export const styles = (theme) => ({
  ...pageStyles(theme),
  ...dialogStyles(theme),
  radioControl: {
    flexDirection: 'row',
    marginTop: '10px',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: 3.5,
  },
  radioGroup: {
    flexDirection: 'inherit !important',
    marginLeft: '1.5rem',
  },
  chexboxesControl: {
    flexDirection: 'row',
  },
  chexboxesLabel: {
    flexDirection: 'row',
    lineHeight: 3,
  },
  chexboxesGroup: {
    width: 600,
    flexDirection: 'row!important',
    marginLeft: '0.8rem',
  },
  formGrid: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  shellIcon: {
    marginRight: 5,
    width: 14,
    height: 14,
  },
  runningBtn: {
    background: 'rgba(56,158,13,0.2)',
    color: '#389E0D',
    marginRight: 10,
  },
  loadingBtn: {
    background: 'rgba(247,181,0,0.2)',
    color: '#F7B500',
    marginRight: 10,
  },
  failBtn: {
    background: 'rgba(224,32,32,0.2)',
    color: '#E02020',
    marginRight: 10,
  },
  unableBtn: {
    background: 'rgba(217,217,217,0.2)',
    color: '#D9D9D9',
    marginRight: 10,
  },
  handleBtn: {
    marginRight: 10,
    border: '1px solid rgba(217,217,217,1)',
  },
  btnGroup: {
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 5,
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
  logsWrapper: {
    width: '70vw',
    backgroundColor: 'black',
    color: 'white',
    overflow: 'auto',
  },
  nodesWrapper: {
    width: '70vw',
    overflowX: 'hidden',
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 255px)',
  },
  logCardBody: {
    height: 'calc(100vh - 225px)',
  },
  logCardBodyPaper: {
    display: 'flex',
    height: '100%',
  },
  zcloudVersion: {
    position: 'absolute',
    top: '22px',
    right: '18px',
  },
});

export default makeStyles(styles);
