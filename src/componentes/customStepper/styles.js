import { makeStyles } from '@material-ui/core/styles';

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
    color: '#111',
    width: 32,
    height: 32,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#D1320180',
    zIndex: 1,
    color: '#D13201',
    width: 32,
    height: 32,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: '#0D8A4F80',
    zIndex: 1,
    color: '#0D8A4F',
    width: 32,
    height: 32,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export { useStyles, useColorlibStepIconStyles };
