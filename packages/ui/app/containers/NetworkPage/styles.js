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
    flex: '0 0 45%',
    borderBottom: '1px #eeeeee solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  activeIP: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
  },
  infoLine: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 0',
    whiteSpace: 'nowrap',
  },
  infoLineTitle: {
    flex: '0 0 70px',
  },
  infoLineContent: {
    flex: '1 1 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default makeStyles(styles);
