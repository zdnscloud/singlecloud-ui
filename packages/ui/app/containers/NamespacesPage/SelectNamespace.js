import React, { PureComponent, Fragment } from 'react';
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

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as actions from 'ducks/namespaces/actions';
import {
  makeSelectNamespaces,
  makeSelectCurrentNamespaceID,
} from 'ducks/namespaces/selectors';

import messages from './messages';
import styles from '../App/selectClusterStyles';

class SelectNamespace extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    namespaces: PropTypes.object.isRequired,
    changeNamespace: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clusterID !== this.props.clusterID) {
      this.load();
    }
  }

  load() {
    const { cluster, clusterID, loadNamespaces } = this.props;
    const url = cluster.getIn(['links', 'namespaces']);
    if (url) {
      loadNamespaces(url, clusterID);
    }
  }

  render() {
    const {
      classes,
      namespaces,
      namespaceID,
      changeNamespace,
      clusterID,
    } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          classes={{
            root: classes.selectRoot,
            icon: classes.selectIcon,
          }}
          value={namespaceID}
          disableUnderline
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
  }
}

const mapStateToProps = createStructuredSelector({
  namespaces: makeSelectNamespaces(),
  namespaceID: makeSelectCurrentNamespaceID(),
  clusterID: makeSelectClusterID(),
  cluster: makeSelectCurrentCluster(),
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
