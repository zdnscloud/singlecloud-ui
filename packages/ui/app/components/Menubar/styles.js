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
    paddingLeft: 13,
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
    display: 'flex',
    width: 60,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 30,
  },
  logoName: {
    fontSize: 18,
    marginLeft: 10,
  },
  logoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.leftShrinkWidth,
    marginLeft: 28,
    marginRight: 32,
  },
});

export default styles;
