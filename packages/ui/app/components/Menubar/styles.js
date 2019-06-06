const styles = (theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: 'flex',
    justifyContent: 'space-between',
    '@media (min-width: 960px)': {
      width: 'calc(100% - 0px)',
      left: '0px',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '65px',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    display: 'flex',
    width: 60,
    height: 24,
    position: 'relative',
    zIndex: '4',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRight: '#204159 1px solid',
  },
  logo: {
    display: 'flex',
    width: '150px',
    height: 65,
    position: 'relative',
    zIndex: '4',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    position: 'absolute',
    verticalAlign: 'middle',
    border: '0',
  },
});

export default styles;
