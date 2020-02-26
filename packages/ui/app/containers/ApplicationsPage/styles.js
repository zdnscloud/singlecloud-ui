import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  card: {
    padding: '20px',
    margin: 0,
  },
  detailedDesc: {
    margin: 0,
  },
  logo: {
    width: 'auto',
    height: 'auto',
  },
  title: {
    fontSize: 14,
    margin: 0,
    color: '#000',
    flexGrow: 1,
  },
  description: {
    color: '#838383',
    fontSize: 14,
  },
  appWrap: {
    border: '1px solid #DFE0DF',
    padding: 10,
    marginBottom: 25,
    display: 'flex',
  },
  appName: {
    margin: 0,
    fontSize: 14,
    width: 'calc(100% - 20px)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'middle',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  strikeoutAppName:{
    margin: 0,
    fontSize: 14,
    width: 'calc(100% - 20px)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'middle',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    color:'#D9D9D9',
    textDecoration:'line-through',
  },
  appLogo: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  listAppLogo: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  appContent: {
    flex: 1,
    position: 'relative',
    width: 'calc(100% - 100px)',
  },
  count: {
    position: 'relative',
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: 4,
    top: 1,
    cursor: 'pointer',
  },
  disabledDeleteIcon: {
    position: 'absolute',
    right: 4,
    top: 1,
  },
  appDetailBtn: {
    padding: 0,
    minWidth: 0,
    width: 'calc(100% - 20px)',
    textAlign: 'left !important',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    '& .MuiButton-label': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      verticalAlign: 'middle',
    },
  },
  tag: {
    width: '100%',
    background: 'rgba(27,156,206,0.15)',
    borderRadius: 2,
    textAlign: 'center',
    marginBottom: 0,
    padding: '15px 0',
  },
  tagWrap: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  singleField: {
    margin: '6px 0',
  },
  radioControl: {
    flexDirection: 'row',
    margin: '4px 0',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: '3.5 !important',
  },
  radioGroup: {
    flexDirection: 'row !important',
    marginLeft: '2rem',
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
    flexDirection: 'row',
    marginLeft: '0.8rem',
  },
  cancleBtn: {
    marginLeft: '10px',
  },
  status: {
    width: 6,
    height: 6,
    borderRadius: 3,
    display: 'inline-block',
    marginRight: 8,
  },
  unnormal:{
    color:'#F94141',
  },
  meshWrap: {
    position: 'absolute',
    right: '-11px',
    top: '-10px',
    width: 0,
    height: 0,
    borderTop: '38px solid #5B8FF9',
    borderLeft: '48px solid transparent',
  },
  meshText: {
    position: 'absolute',
    right: '-12px',
    top: '-4px',
    color: '#fff',
    transform: 'rotate(45deg)',
    fontSize: 10,
  },
});

export default makeStyles(styles);
