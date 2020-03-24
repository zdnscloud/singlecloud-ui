const typographyStyle = (theme) => ({
  defaultFontStyle: {
    ...theme.palette.defaultFont,
    fontSize: 14,
  },
  defaultHeaderMargins: {
    marginTop: 20,
    marginBottom: 10,
  },
  quote: {
    padding: '10px 20px',
    margin: '0 0 20px',
    fontSize: '17.5px',
    borderLeft: '5px solid #eee',
  },
  quoteText: {
    margin: '0 0 10px',
    fontStyle: 'italic',
  },
  quoteAuthor: {
    display: 'block',
    fontSize: '80%',
    lineHeight: '1.42857143',
    color: '#777',
  },
  mutedText: {
    color: '#777',
  },
  primaryText: {
    color: theme.palette.primary.main,
    '&.inverse': {
      color: theme.palette.text.c,
      backgroundColor: theme.palette.primary.main,
    },
  },
  infoText: {
    color: theme.palette.text.info,
    '&.inverse': {
      color: theme.palette.text.c,
      backgroundColor: theme.palette.text.info,
    },
  },
  successText: {
    color: theme.palette.text.success,
    '&.inverse': {
      color: theme.palette.text.c,
      backgroundColor: theme.palette.text.success,
    },
  },
  warningText: {
    color: theme.palette.text.warning,
    '&.inverse': {
      color: theme.palette.text.c,
      backgroundColor: theme.palette.text.warning,
    },
  },
  dangerText: {
    color: theme.palette.text.danger,
    '&.inverse': {
      color: theme.palette.text.c,
      backgroundColor: theme.palette.text.danger,
    },
  },
  smallText: {
    fontSize: '65%',
    fontWeight: '400',
    lineHeight: '1',
    color: '#777',
  },
});

export default typographyStyle;
