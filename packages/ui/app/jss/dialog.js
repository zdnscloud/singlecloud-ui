const styles = (theme) => ({
  dialogCard: {
    margin: 0,
  },
  dialogHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px #DFE0DF solid',
    justifyContent: 'space-between',
    '& h4': {
      marginBottom: 0,
      paddingTop: 8,
      borderBottom:'none',
      paddingBottom: 8,
    },
  },
  dialogCardBody: {
    display: 'flex',
    alignItems: 'center',
    marginBottom:5,
    maginTop:5,
  },
  dialogCardBodyPaper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  dialogCardFooter: {
    justifyContent: 'flex-start',
    display: 'initial',
    textAlign:'right',
    '& button': {
      marginBottom: 10,
    },
  },
});

export default styles;
