import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  text: {
    color: '#000',
  },
  indicator: {
    backgroundColor: theme.palette.highlight.secondary,
  },
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
  podNode: {
    width: '100%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  c0: {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    backgroundColor: theme.palette.icons.e,
  },
  c1: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c2: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c3: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c4: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c5: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  ipbox: {
    display: 'flex',
    width: '768px',
    minWidth: '768px',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ipitem: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: '16px',
    height: '16px',
    border: '1px solid #C1C1C1',
    margin: '4px',
    borderRadius: '3px',
    '&.active': {
      backgroundColor: theme.palette.icons.e,
    },
  },
  infobox: {
    width: '228px',
    minWidth: '228px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px #eeeeee solid',
    padding: '20px',
    margin: '0 20px',
  },
  infoExample: {
    width: '100%',
    height: '45%',
    borderBottom: '1px #eeeeee solid',
  },
  activeIP: {
    width: '100%',
    paddingTop: '10px',
  },
  infoLine: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    whiteSpace: 'nowrap',
  },
});

export default makeStyles(styles);
