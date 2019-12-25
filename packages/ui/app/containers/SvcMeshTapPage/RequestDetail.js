import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// https://godoc.org/google.golang.org/grpc/codes#Code
const grpcStatusCodes = {
  0: 'OK',
  1: 'Canceled',
  2: 'Unknown',
  3: 'InvalidArgument',
  4: 'DeadlineExceeded',
  5: 'NotFound',
  6: 'AlreadyExists',
  7: 'PermissionDenied',
  8: 'ResourceExhausted',
  9: 'FailedPrecondition',
  10: 'Aborted',
  11: 'OutOfRange',
  12: 'Unimplemented',
  13: 'Internal',
  14: 'Unavailable',
  15: 'DataLoss',
  16: 'Unauthenticated',
};

const formatTapLatency = (d) => {
  const nanos = d.get('nanos');
  return `${(nanos / 10e6).toFixed(2)}ms`;
};

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
});

const itemDisplay = (title, value) => (
  <ListItem disableGutters>
    <ListItemText primary={title} secondary={value} />
  </ListItem>
);

const headersStyles = {
  headerName: {
    fontSize: '12px',
    marginTop: '5px',
  },
};

const HeadersContentBase = ({ headers, classes }) => (
  <React.Fragment>
    {headers.map((header) => (
      <React.Fragment key={`${header.get('name')}_${header.get('value')}`}>
        <Typography
          className={classes.headerName}
          variant="inherit"
          color="textPrimary"
        >
          {header.get('name')}
        </Typography>
        <Typography variant="inherit" color="textSecondary">
          {header.get('value')}
        </Typography>
      </React.Fragment>
    ))}
  </React.Fragment>
);

const HeadersContentDisplay = withStyles(headersStyles)(HeadersContentBase);

export const headersDisplay = (title, value) => {
  if (!value) {
    return null;
  }

  return (
    <ListItem disableGutters>
      <ListItemText
        primary={title}
        secondary={value ? <HeadersContentDisplay headers={value} /> : '-'}
      />
    </ListItem>
  );
};

const requestInitSection = (d) => (
  <React.Fragment>
    <Typography variant="subtitle2">Request Init</Typography>
    <br />
    <List dense>
      {itemDisplay('Authority', d.get('authority'))}
      {itemDisplay('Path', d.get('path'))}
      {itemDisplay('Scheme', d.get('scheme'))}
      {itemDisplay('Method', d.get('method'))}
      {headersDisplay('Headers', d.get('headers'))}
    </List>
  </React.Fragment>
);

const responseInitSection = (d) =>
  d.size === 0 ? null : (
    <React.Fragment>
      <Typography variant="subtitle2">Response Init</Typography>
      <br />
      <List dense>
        {itemDisplay('HTTP Status', d.get('httpStatus'))}
        {itemDisplay('Latency', formatTapLatency(d.get('sinceRequestInit')))}
        {headersDisplay('Headers', d.get('headers'))}
      </List>
    </React.Fragment>
  );

const responseEndSection = (d) =>
  d.size === 0 ? null : (
    <React.Fragment>
      <Typography variant="subtitle2">Response End</Typography>
      <br />

      <List dense>
        {itemDisplay(
          'GRPC Status',
          d.get('eos') ? 'N/A' : grpcStatusCodes[d.get('eos')]
        )}
        {itemDisplay('Latency', formatTapLatency(d.get('sinceResponseInit')))}
        {itemDisplay('Response Length (B)', d.get('responseBytes'))}
      </List>
    </React.Fragment>
  );

const RequestDetail = ({ data }) => {
  if (!data) return <span />;

  const requestInit = data.getIn(['event', 'requestInit']);
  const responseInit = data.getIn(['event', 'responseInit']);
  const responseEnd = data.getIn(['event', 'responseEnd']);

  return (
    <Grid container spacing={2} className="">
      <Grid item xs={4}>
        <Card>
          <CardContent>{requestInitSection(requestInit)}</CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>{responseInitSection(responseInit)}</CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>{responseEndSection(responseEnd)}</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(RequestDetail);
