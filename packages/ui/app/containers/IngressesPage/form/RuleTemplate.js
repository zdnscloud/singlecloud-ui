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
  const serviceProtocol =  services && services.getIn([serviceName,'exposedPorts','0','protocol']);
  const port = services && services.getIn([serviceName,'exposedPorts','0','port']);
  const protocol = () => {
    switch (serviceProtocol) {
      case 'tcp':
        return 'HTTP';
        break;
      case 'udp':
        return 'UDP';
        break;
      default:
        return 'aa';
        break;
    }
  }

  return (
    <Fragment>
      <Button 
        color="secondary" 
        onClick={(evt) => fields.push(fromJS(
          {
            'serviceName':serviceName,
            'serviceProtocol':serviceProtocol,
            'port': port,
            'protocol': protocol()
          }
        ))}
        className={classes.plusIcon}
        >
        <PlusIcon />
      </Button>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formHost} />
             </TableCell>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formPath} />
             </TableCell>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formPort} />
             </TableCell>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formProtocol} />
             </TableCell>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formServiceName} />
             </TableCell>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formServicePort} />
             </TableCell>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formServiceProtocol} />
             </TableCell>
             <TableCell className={`${classes.tableCell} ${classes.tableHeadCell}`}>
                 <FormattedMessage {...messages.formActions} />
             </TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
            {fields.map((f, i) => (
              <TableRow key={i}>
                <TableCell className={classes.tableCell}>
                  <InputField
                    name={`${f}.host`}
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <InputField
                    name={`${f}.path`}
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <InputField
                    name={`${f}.servicePort`}
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
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
                  {/* <ReadOnlyInput
                    value={`${f}.serviceName`}
                    fullWidth
                  /> */}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <InputField
                      name={`${f}.port`}
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
                  <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
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
