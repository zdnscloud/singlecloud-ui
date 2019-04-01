const styles = (theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: 'flex',
    justifyContent: 'space-between',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '@media (min-width: 960px)': {
      width: 'calc(100% - 260px)',
      left: '260px',
    },
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
  menuButton: {
    marginLeft: 12,
    color: '#386fba',
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
});

export default styles;
