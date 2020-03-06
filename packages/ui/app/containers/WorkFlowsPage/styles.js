import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';
import dialogStyles from 'jss/dialog';

export const styles = (theme) => ({
  ...pageStyles(theme),
  ...dialogStyles(theme),
  serviceConfig:{
    marginRight:10,
    marginTop: 10,
    display: 'inline-block',
  },
  list:{
    cursor:'pointer',
    '& .MuiListItemText-root':{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },
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
    boxShadow:'0px -1px 0px 0px rgba(0,0,0,0.09)',
  },
  fails:{
    background:'#F5222D',
    color:'#fff',
    boxShadow:'0px -1px 0px 0px rgba(0,0,0,0.09)',
  },
  taskContent:{
    display:'flex',
    border:'1px solid #DFE0DF',
    margin:'-25px 0 10px 0',
    '& .MuiListItemText-primary':{
      fontSize:14,
      verticalAlign:'super',
    },
    '& .MuiListItemAvatar-root':{
      minWidth:30,
    },
  },
  taskList:{
    flex:1,
    maxWidth:240,
    marginRight:20,
    padding:0,
    '& .MuiList-root':{
      padding:0,
    },
  },
  tasktabs:{
    flex:1,
    width: 'calc(100% - 240px)',
    overflow:'hidden',
  },
  titleWrap:{
    position:'relative',
    '& button':{
      position:'absolute',
      right:10,
      top:-3,
      background:'rgba(0,0,0,0.04)',
      color:'#4A4A4A',
    },
    '& svg':{
      transform: 'scale(1.2)',
      position:'absolute',
      left:3,
      top:1,
    },
    '& h4':{
      position:'relative',
      fontSize:18,
      lineHeight:1,
      fontWeight:500,
      paddingLeft:35,
      '& span':{
        marginLeft:24,
        color:'#52C41A',
        fontSize:12,
      },
    },
  },
  taskStatus:{
    display:'flex',
  },
  statusWrap:{
    flex:1,
    position: 'relative',
    marginBottom:20,
    display:'inline-block',
    marginRight:14,
    '& .MuiButton-root':{
      minWidth:150,
    },
    '& .MuiFab-root':{
      boxShadow:'none',
    },
  },
  buttonProgress:{
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  fabProgress:{
    color: 'green',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  logPaper:{
    // width: 'calc(100% - 240px)',
    // overflowX:'scroll',
    // '& div':{
    //   maxWidth:'calc(100% - 240px)',
    // },
  },
});

export default makeStyles(styles);
