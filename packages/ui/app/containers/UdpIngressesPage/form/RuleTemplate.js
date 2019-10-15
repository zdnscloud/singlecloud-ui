import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import useStyles from '../styles';
import messages from '../messages';

const RuleTemplate = ({
  fields,
  services,
  formValues,
  meta: { error, submitFailed },
}) => {
  const classes = useStyles();
  const serviceName = formValues && formValues.get('serviceName');
  const exposedPorts =
    services && services.getIn([serviceName, 'exposedPorts']);

  return (
    <Fragment>
      <Button
        color="secondary"
        onClick={(evt) =>
          exposedPorts
            .filter((p) => p.get('protocol') === 'udp')
            .forEach((p) => {
              if (fields.length < 1) {
                fields.push(
                  fromJS({
                    serviceName,
                    serviceProtocol: 'udp',
                    servicePort: p.get('port'),
                    protocol: 'UDP',
                  })
                );
              }
            })
        }
        className={classes.formPlusIcon}
      >
        <PlusIcon />
      </Button>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      <Table className={classes.formTable}>
        <TableHead>
          <TableRow>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formPort} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formProtocol} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formServiceName} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formServicePort} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formServiceProtocol} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formActions} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((f, i) => (
            <TableRow key={i}>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.port`}
                  fullWidth
                  inputProps={{ type: 'number', autoComplete: 'off' }}
                  normalize={(val) => (val ? Number(val) : val)}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.protocol`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.serviceName`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.servicePort`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.serviceProtocol`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                >
                  <MinusIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default RuleTemplate;
