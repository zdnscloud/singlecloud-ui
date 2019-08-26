import hexToRgb from '@gsmlg/utils/hexToRgb';

const cardHeaderStyle = (theme) => ({
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
    '&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$primaryCardHeader,&$cyanInverseCardHeader,&$azureCardHeader': {
      margin: '0',
      padding: '0',
      position: 'relative',
      color: theme.palette.text.c,
    },
    '&$cyanInverseCardHeader': {
      margin: '0',
      padding: '0',
      position: 'relative',
      color: theme.palette.icons.d,
    },
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
    },
    '&$primaryCardHeader,&$azureCardHeader,&$cyanInverseCardHeader': {
      '&:not($cardHeaderIcon)': {
        borderRadius: '3px 3px 0 0',
        marginTop: '-20px',
        padding: '15px',
      },
    },
    '&$cardHeaderStats svg': {
      fontSize: '36px',
      lineHeight: '56px',
      textAlign: 'center',
      width: '36px',
      height: '36px',
      margin: '10px 10px 4px',
    },
    '&$cardHeaderStats i,&$cardHeaderStats .material-icons': {
      fontSize: '36px',
      lineHeight: '56px',
      width: '56px',
      height: '56px',
      textAlign: 'center',
      overflow: 'unset',
      marginBottom: '1px',
    },
    '&$cardHeaderStats$cardHeaderIcon': {
      textAlign: 'right',
    },
  },
  cardHeaderPlain: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
  },
  cardHeaderStats: {
    '& $cardHeaderIcon': {
      textAlign: 'right',
    },
    '& h1,& h2,& h3,& h4,& h5,& h6': {
      margin: '0 !important',
    },
  },
  cardHeaderIcon: {
    '&$primaryCardHeader': {
      background: 'transparent',
      boxShadow: 'none',
    },
    '& i,& .material-icons': {
      width: '33px',
      height: '33px',
      textAlign: 'center',
      lineHeight: '33px',
    },
    '& svg': {
      width: '24px',
      height: '24px',
      textAlign: 'center',
      lineHeight: '33px',
      margin: '5px 4px 0px',
    },
  },
  primaryCardHeader: {
    color: theme.palette.text.c,
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
    },
  },
  secondaryCardHeader: {
    color: theme.palette.text.c,
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
    },
  },
  azureCardHeader: {
    color: theme.palette.text.c,
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, transparent, transparent)`,
    },
  },
  cyanInverseCardHeader: {
    color: theme.palette.icons.d,
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, ${theme.palette.text.c}, ${theme.palette.text.c})`,
    },
  },
});

export default cardHeaderStyle;
