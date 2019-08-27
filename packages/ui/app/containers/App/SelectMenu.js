import React, { useEffect, useState, memo, useRef } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';

import { makeSelectClusters } from 'ducks/clusters/selectors';
import { makeSelectNamespaces,makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectClusterID,
  makeSelectNamespaceID
} from 'ducks/app/selectors';
import * as actions from 'ducks/app/actions';
import { changeNamespace,loadNamespaces } from 'ducks/namespaces/actions';

import messages from './messages';
import SelectIcon from 'components/Icons/Select';
import ChevronRight from 'components/Icons/ChevronRight';
import useStyles from './dashboardStyles';

const StyledMenu = withStyles({
  paper: {
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)'
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
    color:'#6A8090',
    '&:focus': {
      backgroundColor: '#fff',
      ' & .MuiListItemText-primary': {
        color: '#32C5FF',
      },
    },
    '&:hover': {
      backgroundColor: '#fff',
      ' & .MuiListItemText-primary': {
        color: '#000',
      },
    },
  },
}))(MenuItem);

const SelectMenu = ({
  clusters,
  changeCluster,
  namespaces,
  changeNamespace,
  clusterID,
  loadNamespaces,
  namespaceID,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectCluster, setSelectCluster] = React.useState(null);
  const [nsAnchorEl, setNsAnchorEl] = React.useState(null);
  const [selectNamespace, setSelectNamespace] = React.useState(null);
  const url = clusters.getIn([selectCluster, 'links', 'namespaces']);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setNsAnchorEl(null)
  }
  
  const openNamespanceMenu = (e,c) => {
    setSelectCluster(c);
    setNsAnchorEl(e.currentTarget);
  }

  useEffect(() => {
    if (url && clusterID) {
      loadNamespaces(url, clusterID);
    };
  }, [url, clusterID]);

  useEffect(() => {
   if (namespaceID) {
    setSelectNamespace(namespaceID)
   }
  }, [namespaceID]);

  useEffect(() => {
    changeCluster(selectCluster);
   }, [selectCluster]);

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
        {clusterID ? (
          <>
            {clusterID}
            {clusterID ? <ChevronRight
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
        style={{ zIndex: 4 }}
      >
        <StyledMenuItem 
          onClick={() => {
            setSelectCluster('');
            handleClose();
            changeCluster('')
          }}
          className={classes.menuItem}
          ref={menuRef}
        >
          <ListItemText>
            <FormattedMessage {...messages.global} />
          </ListItemText>
        </StyledMenuItem>
        {clusters.toList().map((c, i) => (
          <StyledMenuItem 
            key={i}
            onClick={(e) => openNamespanceMenu(e,c.get('id'))}
            className={classes.menuItem}
            onMouseEnter={(e) => openNamespanceMenu(e,c.get('id'))}
          >
            <ListItemText
              primary={c.get('id')}
            />
          </StyledMenuItem>
        ))}
        {selectCluster ? (
         <Popper
          open={Boolean(nsAnchorEl)}
          anchorEl={menuRef.current}
          placement="right-start"
          className={classes.secondMenu}
          onMouseLeave={()=>{
            setNsAnchorEl(null)
          }}
        >
          {namespaces.toList().map((c, i) => (
            <StyledMenuItem 
              key={i}
              onClick={() => {
                setSelectNamespace(c.get('id'));
                changeNamespace(c.get('id'),clusterID);
                handleClose();
              }}
              className={classes.menuItem}
            >
              <ListItemText
                primary={c.get('id')}
              />
            </StyledMenuItem>
          ))}
        </Popper>
        ) : null}
      </StyledMenu>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  namespaces: makeSelectNamespaces(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      changeNamespace,
      loadNamespaces
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(SelectMenu);
