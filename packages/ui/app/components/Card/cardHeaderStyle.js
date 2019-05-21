import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  whiteColor,
  customBlueCardHeader,
} from 'assets/jss/material-dashboard-react';
import hexToRgb from '@gsmlg/utils/hexToRgb';

const blackColor = '#000';
const cyanColor = '#6CD6B1';
const azureColor = '#40B7E8';

const cardHeaderStyle = (theme) => ({
  cardHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
    '&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$customBlueCardHeader,&$cyanCardHeader,&$azureCardHeader': {
      margin: '0 15px',
      padding: '0',
      position: 'relative',
      color: whiteColor,
    },
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
    },
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$customBlueCardHeader,&$cyanCardHeader,&$azureCardHeader': {
      '&:not($cardHeaderIcon)': {
        borderRadius: '3px',
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
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$customBlueCardHeader,&cyanCardHeader': {
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
  warningCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...warningCardHeader,
    },
  },
  successCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...successCardHeader,
    },
  },
  dangerCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...dangerCardHeader,
    },
  },
  infoCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...infoCardHeader,
    },
  },
  primaryCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...primaryCardHeader,
    },
  },
  secondaryCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
      boxShadow: `0 4px 20px 0 rgba(${hexToRgb(
        blackColor
      )}, 0.14), 0 7px 10px -5px rgba(${hexToRgb(theme.palette.secondary.main)}, 0.4)`,
    },
  },
  customBlueCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...customBlueCardHeader,
    },
  },
  roseCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      ...roseCardHeader,
    },
  },
  cyanCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, ${cyanColor}, ${cyanColor})`,
      boxShadow: `0 4px 20px 0 rgba(${hexToRgb(
        blackColor
      )}, 0.14), 0 7px 10px -5px rgba(${hexToRgb(cyanColor)}, 0.4)`,
    },
  },
  azureCardHeader: {
    color: whiteColor,
    '&:not($cardHeaderIcon)': {
      background: `linear-gradient(60deg, ${azureColor}, ${azureColor})`,
      boxShadow: `0 4px 20px 0 rgba(${hexToRgb(
        blackColor
      )}, 0.14), 0 7px 10px -5px rgba(${hexToRgb(azureColor)}, 0.4)`,
    },
  },
});

export default cardHeaderStyle;
