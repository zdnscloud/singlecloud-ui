import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';

import styles from './styles';
import * as actions from './actions';
import { makeSelectClusterID } from '../App/selectors';
import { makeSelectNamespaces, makeSelectCurrentNamespace } from './selectors';

const SelectNamespace = (props) => {
  const { classes, namespaces, namespaceID, changeNamespace, clusterID } = props;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="namespace_name-id">Namespace</InputLabel>
      <Select
        value={namespaceID}
        onChange={(evt) => {
          changeNamespace(evt.target.value, clusterID);
        }}
      >
        {namespaces.toList().map((c) => (
          <MenuItem key={c.get('id')} value={c.get('id')}>
            {c.get('name')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectNamespace.propTypes = {
  classes: PropTypes.object.isRequired,
  namespaces: PropTypes.object.isRequired,
  changeNamespace: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  namespaces: makeSelectNamespaces(),
  namespaceID: makeSelectCurrentNamespace(),
  clusterID: makeSelectClusterID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(SelectNamespace);
