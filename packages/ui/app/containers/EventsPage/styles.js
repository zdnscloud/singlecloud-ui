import pageStyles from 'jss/page';

const styles = (theme) => ({
  ...pageStyles(theme),
  wrapper: {
    flex: 1,
  },
  list: {
    paddingTop: 0,
    background: theme.palette.light.main,
  },
  firstItem: {
    padding: 0,
    height: 36,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  item: {},
  itemAvatar: {
    minWidth: 36,
  },
  itemText: {
    paddingRight: 0,
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    textOverflow: 'ellipsis',
  },
  itemText1: {
    display: 'flex',
    flexDirection: 'row',
    width: '223px',
    height: '24px',
  },
  itemText2: {
    display: 'flex',
    flexDirection: 'row',
    width: '223px',
    height: '24px',
  },
  itemName: {
    color: '#40B7E8',
    width: '165px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 14,
  },
  itemReason: {
    color: '#4A4A4A ',
    alignSelf: 'flex-end',
    width: '58px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 12,
  },
  itemMessage: {
    color: '#4A4A4A',
    width: '165px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 14,
  },
  itemTime: {
    color: '#9B9B9B',
    alignSelf: 'flex-end',
    width: '58px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 12,
  },
});

export default styles;
