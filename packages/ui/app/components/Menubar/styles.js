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
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  menuButton: {
    marginLeft: 12,
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
  },
  toolbarRight: {
    display: 'flex',
  },
  menuButton: {
    display: 'flex',
    width: '60px',
    position: 'relative',
    padding: '15px 15px',
    zIndex: '4',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: `rgba(10,10,10, 0.3)`,
    },
  },
  logo: {
    display: 'flex',
    width: '260px',
    position: 'relative',
    padding: '15px 15px',
    zIndex: '4',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',

      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: `rgba(10,10,10, 0.3)`,
    },
  },
  img: {
    position: 'absolute',
    verticalAlign: 'middle',
    border: '0',
  },
});

export default styles;
