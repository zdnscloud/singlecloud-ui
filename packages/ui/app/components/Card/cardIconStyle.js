import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayColor,
} from 'assets/jss/material-dashboard-react';
import hexToRgb from '@gsmlg/utils/hexToRgb';

const blackColor = '#000';
const cyanColor = '#6CD6B1';

const cardIconStyle = {
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$cyanCardHeader': {
      borderRadius: '3px',
      backgroundColor: grayColor[0],
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  cyanCardHeader: {
    background: `linear-gradient(60deg, ${cyanColor}, ${cyanColor})`,
    boxShadow: `0 4px 20px 0 rgba(${hexToRgb(
      blackColor
    )}, 0.14), 0 7px 10px -5px rgba(${hexToRgb(cyanColor)}, 0.4)`,
  },
};

export default cardIconStyle;
