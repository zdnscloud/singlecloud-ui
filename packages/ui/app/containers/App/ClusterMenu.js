import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import messages from './messages';
import SelectIcon from 'components/Icons/Select';
import ChevronRight from 'components/Icons/ChevronRight';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      ' & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  
  const {clusters, changeCluster,classes,namespaces,changeNamespace} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectCluster, setSelectCluster] = React.useState(null);
  const [nsAnchorEl, setNsAnchorEl] = React.useState(null);
  const [selectNamespace, setSelectNamespace] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
    setNsAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: '#fff' }}
        className={classes.selectBtn}
      >
        {selectCluster ? (
          <>
            {selectCluster}
            {selectCluster ? <ChevronRight
              style={{
                transform: 'scale(0.6)',
                color: '#9E9E9E',
                marginRight: 4
              }}
            /> :null} 
            {selectNamespace}
          </>
        ) :  <FormattedMessage {...messages.global} />}
        <SelectIcon className={classes.selectIcon} />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
      >
        <StyledMenuItem 
          onClick={() => {
            setSelectCluster('');
            handleClose();
            changeCluster('')
          }}
          className={classes.menuItem}
        >
          <ListItemText>
            <FormattedMessage {...messages.global} />
          </ListItemText>
        </StyledMenuItem>
        {clusters.toList().map((c, i) => (
          <StyledMenuItem 
            onClick={(e) => {
              setSelectCluster(c.get('id'));
              changeCluster(c.get('id'))
              setNsAnchorEl(e.currentTarget)
            }}
            className={classes.menuItem}
          >
            <ListItemText
              primary={c.get('id')}
            />
          </StyledMenuItem>
        ))}

        {selectCluster ? (
          <StyledMenu
            anchorEl={nsAnchorEl}
            keepMounted
            open={Boolean(nsAnchorEl)}
          >
            {namespaces.toList().map((c, i) => (
              <StyledMenuItem 
                onClick={() => {
                  setSelectNamespace(c.get('id'));
                  handleClose();
                  changeNamespace(c.get('id'))
                }}
                className={classes.menuItem}
              >
                <ListItemText
                  primary={c.get('id')}
                />
              </StyledMenuItem>
            ))}
          </StyledMenu>
        ) : null}
      </StyledMenu>
    </div>
  );
}
