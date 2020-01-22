const styles = (theme) => ({
  dialogCard: {
    margin: 0,
  },
  dialogHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h4': {
      marginTop: 0,
      marginBottom: 3,
      width: 'auto',
      borderBottom: 'none',
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  dialogCardBody: {
    display: 'flex',
    alignItems: 'center',
  },
  dialogCardBodyPaper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  dialogCardFooter: {
    justifyContent: 'flex-start',
    display: 'initial',
    '& button': {
      marginRight: '1rem',
    },
  },
  logBtn: { marginRight: 10 },
});

export default styles;
