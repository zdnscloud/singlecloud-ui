import React, { useEffect, useState, memo } from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  
  console.log('namespaceID',namespaceID,'selectNamespace',selectNamespace,'clusterID',clusterID,'selectCluster',selectCluster)

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
      </StyledMenu>
      {selectCluster ? (
          <StyledMenu
            anchorEl={nsAnchorEl}
            keepMounted
            open={Boolean(nsAnchorEl)}
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
          </StyledMenu>
        ) : null}
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
