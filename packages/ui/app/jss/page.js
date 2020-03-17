const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
  },
  title: {
    flexGrow: 1,
  },
  select: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    overflowX: 'hidden',
  },
  grid: {
    padding: theme.spacing(1.875),
  },
  contentGrid: {
    paddingLeft: theme.spacing(1.875),
    paddingRight: theme.spacing(1.875),
  },
  appContainer: {},
  advanceContainer: {},
  actionContainer: {
    textAlign: 'right',
  },
  h5: {
    marginBottom: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
  padding10: {
    padding: theme.spacing(1.25),
  },
  marginRight10: {
    marginRight: theme.spacing(1.25),
  },
  formControl: {
    margin: theme.spacing(1),
    flexBasis: 200,
    minWidth: 194,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addContainerWrap: {
    minHeight: '75px',
  },
  addContainerButton: {
    alignSelf: 'center',
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: 0,
      fontSize: '14px',
      marginTop: 0,
      marginBottom: 0,
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#000',
    marginTop: 0,
    minHeight: 'auto',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  separateLineWrap: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(0.625),
    background: '#eee',
  },
  separateLine: {
    marginTop: theme.spacing(1),
    boxShadow: '1px 0px 2px #ccc',
    border: '1px solid #ccc',
  },
  removeBtn: {
    float: 'right',
  },
  createBtnLink: {
    position: 'absolute',
    top: `${theme.spacing(1)}px`,
    right: `${theme.spacing(1.25)}px`,
  },
  radioControl: {
    flexDirection: 'row',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: 3,
  },
  radioGroup: {
    flexDirection: 'inherit !important',
    marginLeft: '2rem',
  },
  menuButton: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(4.5),
    position: 'absolute',
    right: 0,
    top: 6,
  },
  tableWrapper: {
    overflow: 'auto',
  },
  table: {
    '& .MuiTableCell-root':{
      border: 'none',
      padding:theme.spacing(1),
    },
    '& thead tr': {
      whiteSpace: 'nowrap',
    },
    '& thead tr, tbody tr:nth-child(2n)':{
      backgroundColor:'#F5F5F5',
    },
    '& tbody tr td:last-child .MuiButton-text': {
      borderRight:'1px solid #e9e9e9',
    },
    '& tbody tr td:last-child .MuiButton-text:first-child': {
      paddingLeft: 0,
    },
    '& tbody tr td:last-child .MuiButton-text:last-child': {
      borderRight:'none',
    },
  },
  infoCardHeader: {
    height: 106,
    '& :last-child': {
      '& div': {
        borderRight: 'none',
      },
    },
  },
  infoCardText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #E8E8E8',
    '& h3': {
      color: '#404040',
      fontSize: 24,
      fontWeight: 'normal',
      lineHeight: '32px',
    },
    '& p': {
      fontSize: 14,
      color: '#838383',
      margin: 0,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  },
  cardHeaderLine: {
    justifyContent: 'center',
    borderBottom: '1px #DFE0DF solid',
    padding: '0 !important',
    margin: '0 17px 17px 20px !important',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 0,
  },
  infoCardIcon: {
    display: 'flex',
    justifyContent: 'center',
    width: 120,
  },
  cardHeader: {
    marginLeft: `${theme.spacing(1.875)}px !important`,
    marginRight: `${theme.spacing(1.875)}px !important`,
  },
  cardBody: {
    padding:`0 ${theme.spacing(2.25)}px`,
  },
  cardTitle: {
    margin: 0,
    fontSize: 16,
  },
  cardTitleValue: {
    float: 'right',
    color: '#838383',
    fontSize: 14,
  },
  cancleBtn: {
    marginLeft: theme.spacing(1.25),
    backgroundColor:'#fff',
    border:'1px solid #D9D9D9',
  },
  customCardHeaderH4: {
    paddingBottom: '0 !important',
    paddingTop: '0 !important',
  },
  textareaControl: {
    width: '100%',
  },
  // svcMeshx
  graphContainer: {
    overflowX: 'auto',
    padding: `${theme.spacing(1.25)}px 0`,
  },
  graph: {
    maxWidth: '974px',
    minWidth: '974px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centerNode: {
    width: 244,
  },
  neighborNode: {
    width: 220,
  },
  linearProgressWrap: {
    marginBottom:`-${theme.spacing(2.5)}px`,
    position: 'relative',
    '& > div': {
      width: '75%',
    },
    '& > span': {
      position: 'absolute',
      top: -8,
      right: -12,
    },
  },
  tableCardHeader: {
    display: 'block !important',
  },
  gray: {
    backgroundColor: '#F5F5F5 !important',
  },
  red: {
    backgroundColor: '#F94141 !important',
  },
  green: {
    backgroundColor: '#5AD8A6 !important',
  },
  orange: {
    backgroundColor: '#FF9D4D !important',
  },
  point: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: theme.spacing(1.25),
  },
  h4: {
    margin: '0 !important',
    borderBottom: 'none !important',
  },
  buttonGroup:{
    backgroundColor:'#fff',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2.5)}px`,
  },
  cardMargin:{
    margin:0,
  },
  cardMarginTop:{
    marginTop:0,
  },
  plusIcon:{
    fontSize: 16,
    marginRight:5,
    lineHeight:1.5,
  },
  addNodeBtn:{
    marginBottom:theme.spacing(3.125),
  },
  addNodeBtnWrap: {
    marginTop:theme.spacing(2.5),
  },
  addList: {
    width: '880px',
  },
  minusIcon:{
    marginTop:theme.spacing(1.25),
  },
  strikeout:{
    color:'#D9D9D9',
    textDecoration:'line-through',
  },
  blank: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 200px)',
    flexDirection: 'column',
    '& .MuiSvgIcon-root': {
      width: 96,
      height: 100,
    },
  },
  blankText: {
    fontSize: 14,
    color: '#B4B4B4',
    marginTop: 20,
  },
  saveFaildText:{
    marginTop:0,
    marginLeft:theme.spacing(3.5),
    color:theme.palette.text.b,
  },
  noPaddingList:{
    '& .MuiList-padding , .MuiListItem-gutters':{
      padding:0,
    },
  },
});

export default styles;
