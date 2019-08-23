const styles = (theme) => ({
  dialogCard: {
    margin: 0,
  },
  dialogHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    '& button': {
      marginRight: '1rem',
    },
  },
});

export default styles;
