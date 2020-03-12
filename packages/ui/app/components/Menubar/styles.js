const styles = (theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appBar: {
    position: 'inherit',
    boxShadow: 'none',
    height: theme.appBarHeight,
    width: '100%',
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    display: 'inline-block',
    width: theme.leftShrinkWidth,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height:65,
    background: '#112338',
    paddingLeft: 18,
  },
  menuIcon:{
    transform: ({ showMenuText }) =>
      showMenuText ?'rotate(0deg)':'rotate(180deg)',
    color:'#fff',
    marginTop:10,
  },
  logoIcon: {
    width: 30,
  },
  logoName: {
    fontSize: 18,
    marginLeft: 10,
    verticalAlign:'super',
  },
  logoIconWrapper: {
    display: 'inline-block',
    width: 115,
    paddingLeft: 14,
    height:65,
    paddingTop:20,
    background: ({ showMenuText }) =>
      showMenuText ? '#112338' :'#fff',
    ...theme.palette.transition,  
  },
});

export default styles;
