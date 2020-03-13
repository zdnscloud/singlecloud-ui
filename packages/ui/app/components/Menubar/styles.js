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
    flexGrow: 1,
    height:65,
    paddingLeft: 18,
    width: theme.leftShrinkWidth,
  },
  menuIcon:{
    marginTop:15,
    width:20,
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
    height:65,
    verticalAlign:'text-top',
  },
  content:{
    display: 'inline-block',
    background: '#112338',
    width: ({ showMenuText }) =>
      showMenuText ? theme.leftMenuWidth :theme.leftShrinkWidth,
    ...theme.palette.transition,  
    height:65,
  },
});

export default styles;
