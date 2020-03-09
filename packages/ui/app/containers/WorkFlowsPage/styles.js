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
    '& svg , & img':{
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
        fontSize:12,
      },
    },
  },
  taskStatus:{
    display:'flex',
  },
  statusContent:{
    position: 'relative',
  },
  statusWrap:{
    flex:1,
    position: 'relative',
    marginBottom:20,
    display:'inline-block',
    marginRight:14,
    '& p':{
      minWidth:150,
      display:'inline-block',
      padding:"5px 20px",
      borderRadius:2,
      margin:0,
    },
    '& .MuiFab-root':{
      boxShadow:'none',
    },
  },
  fabProgress:{
    color: '#40A9FF',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  hookIcon:{
    width:23,
    height:17,
    marginTop:6,
  },
  hourglassIcon:{
    marginLeft:4,
  },
  statusArrow:{
    width:94,
    display:'inline-block',
    '& .MuiSvgIcon-root':{
      width:'100%',
    },
    verticalAlign:"text-top",
    marginRight:40,
  },
  red:{
    color:'#FF7875',
  },
  gray:{
    color:'#F7F7F7',
  },
  green:{
    color:'#A0D911',
  },
  blue:{
    color:'#40A9FF',
  },
  redBtn:{
    color:'#fff',
    background:'#FF7875',
  },
  greenBtn:{
    color:'#fff',
    background:'#A0D911',
  },
  blueBtn:{
    color:'#fff',
    background:'#40A9FF',
  },
  grayBtn:{
    color:'#B4B4B4',
    background:'#F7F7F7',
  },
});

export default makeStyles(styles);
