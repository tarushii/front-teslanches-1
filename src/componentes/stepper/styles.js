import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  // active: {
  //   color: '#D13201',
  //   background: '#D13201',
  // },
  // completed: {
  //   color: '#006335',
  //   background: '#0D8A4F',
  // },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
// TODO - preciso alterar cor do stepper
