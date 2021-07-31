import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: green[300],
    '&$checked': {
      transform: 'translateX(12px)',
      color: green[500],
      '&$checked + $track': {
        opacity: 1,
        backgroundColor: green[200],
        borderColor: green[300],
      },
    },
  },
  thumb: {
    width: 13,
    height: 13,
    boxShadow: 'none',
    color: green[900],
  },
  track: {
    border: `1px solid ${green[700]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function CustomizedSwitches(props) {
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup className="pb03rem">
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <AntSwitch checked={state.checked} onChange={handleChange} name="checked" />
          </Grid>
          <Grid item>{props.label}</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
