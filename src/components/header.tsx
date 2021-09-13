import React from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import logo from '../assets/images/logo.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { useStore } from '../hooks/useStore';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    padding: '10px',
    maxWidth: 250,
    marginLeft: 50,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  vl: {
    borderLeft: ' 2px solid #CCCCCC',
    height: '20px',
    marginRight: '10px',
  },
  signOut: {
    marginRight: '20px',
  },
}));

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const store = useStore();
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    store.commonStore.isAuthenticated
  );
  const history = useHistory();
  return isAuthenticated ? (
    <UserHeader
      store={store}
      history={history}
      setIsAuthenticated={setIsAuthenticated}
    />
  ) : (
    <PrivateHeader />
  );
};

function PrivateHeader(props: any) {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: false,
      })}
    >
      <Toolbar>
        <img src={logo} alt="logo" className={classes.logo} />
        <Typography className={classes.title}></Typography>
      </Toolbar>
    </AppBar>
  );
}

function UserHeader(props: any) {
  const classes = useStyles();
  const { store, history, setIsAuthenticated } = props;
  const signOutHandler = async () => {
    await store.authStore.logout();
    setIsAuthenticated(store.commonStore.isAuthenticated);
    history.push('/login');
  };
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: false,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerToggle}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        <a href={'/app'}>
          <img src={logo} alt="logo" className={classes.logo} />{' '}
        </a>
        <Typography className={classes.title}></Typography>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.signOut}
              onClick={signOutHandler}
              startIcon={<ExitToAppIcon />}
            >
              Sign Out
            </Button>
          </Grid>
        </Typography>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <Switch
                checked={!props.darkMode}
                onChange={props.toggleDarkMode}
                color="secondary"
              />
            </Grid>
          </Grid>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
