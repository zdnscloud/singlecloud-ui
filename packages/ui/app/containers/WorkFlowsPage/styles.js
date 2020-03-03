import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  serviceConfig:{
    marginRight:10,
    marginTop: 10,
    display: 'inline-block',
  },
  list:{
    '& .MuiListItemAvatar-root':{
      minWidth:36,
      '& .MuiSvgIcon-root':{
        verticalAlign:'-webkit-baseline-middle',
      },
    },
  },
  radioWrap:{
    paddingTop:10,
  },
  success:{
    background:'#52C41A',
    color:'#fff',
  },
  fails:{
    background:'#F5222D',
    color:'#fff',
  },
});

export default makeStyles(styles);
