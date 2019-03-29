import React, { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

class ContainerForm extends React.PureComponent {
  componentDidMount() {
    this.setState({
      labelWidth: findDOMNode(this.InputLabelRef).offsetWidth, // eslint-disable-line
    });
  }

  render() {
    const { classes, configMaps, index, item, updateForm } = this.props;

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.separateLine}>
              <Button
                variant="contained"
                color="secondary"
                className={classNames(classes.margin, classes.button, classes.removeBtn)}
                onClick={(evt) => {
                  updateForm(['containers', index], null);
                }}

              >
                remove this
              </Button>
              <Grid item xs={12}>
                <TextField
                  className={classNames(classes.margin, classes.textField)}
                  variant="standard"
                  label="command"
                  value={item.get('command')}
                  onChange={(evt) =>
                    updateForm(
                      ['containers', index, 'command'],
                      evt.target.value
                    )
                  }
                />
                <TextField
                  className={classNames(classes.margin, classes.textField)}
                  variant="standard"
                  label="args"
                  value={item.get('args')}
                  onChange={(evt) =>
                    updateForm(['containers', index, 'args'], evt.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    ref={(ref) => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="config_name-simple"
                  >
                    ConfigMap Name
                  </InputLabel>
                  <Select
                    value={item.get('config_name')}
                    onChange={(evt) =>
                      updateForm(
                        ['containers', index, 'config_name'],
                        evt.target.value
                      )
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {configMaps.map((conf) => (
                      <MenuItem key={conf.get('id')} value={conf.get('id')}>
                        {conf.get('name')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  className={classNames(classes.margin, classes.textField)}
                  variant="standard"
                  label="mount_path"
                  value={item.get('mount_path')}
                  onChange={(evt) =>
                    updateForm(['containers', index, 'mount_path'], evt.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                {item.get('exposedPorts').map((port, idx) => (
                  <Grid xs={10} className={classes.separateLineWrap} key={idx}>
                    <TextField
                      className={classNames(classes.margin, classes.textField)}
                      variant="standard"
                      label="Name"
                      value={port.get('name')}
                      onChange={(evt) => {
                        updateForm(
                          ['containers', index, 'exposedPorts', idx, 'name'],
                          evt.target.value
                        );
                      }}
                    />
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor={`exposed-port-protocol-${idx}`}>
                        Protocol
                      </InputLabel>
                      <Select
                        value={port.get('protocol')}
                        onChange={(evt) =>
                          updateForm(
                            [
                              'containers',
                              index,
                              'exposedPorts',
                              idx,
                              'protocol',
                            ],
                            evt.target.value
                          )
                        }
                        inputProps={{
                          id: `exposed-port-protocol-${idx}`,
                        }}
                      >
                        <MenuItem value="tcp">TCP</MenuItem>
                        <MenuItem value="udp">UDP</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      className={classNames(classes.margin, classes.textField)}
                      variant="standard"
                      type="number"
                      label="Port"
                      value={port.get('port')}
                      onChange={(evt) =>
                        updateForm(
                          ['containers', index, 'exposedPorts', idx, 'port'],
                          Number(evt.target.value)
                        )
                      }
                    />
                    <Fab
                      aria-label="Delete"
                      style={{ marginRight: '5%' }}
                      onClick={(evt) => {
                        updateForm(
                          ['containers', index, 'exposedPorts', idx],
                          null
                        );
                      }}
                    >
                      <DeleteIcon />
                    </Fab>
                  </Grid>
                ))}
                <Grid item xs={10}>
                  <Button
                    variant="contained"
                    color="gray"
                    className={classNames(classes.margin, classes.button)}
                    onClick={() => {
                      const { size } = item.get('exposedPorts');
                      updateForm(
                        ['containers', index, 'exposedPorts', size, 'protocol'],
                        'tcp'
                      );
                    }}
                  >
                    ADD exposed PORT
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default ContainerForm;
