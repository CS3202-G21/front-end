import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/images/logo.png';
import { useHistory } from 'react-router-dom';
import { reaction } from 'mobx';
import { useStore } from '../hooks/useStore';
import menu_config from '../config/navbar/menu.config';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountMenu from './AccoundMenu';

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Header(props: any) {
  const theme = useTheme();
  const { open, setOpen } = props;
  const store = useStore();
  const history = useHistory();

  const signOutHandler = async () => {
    await store.authStore.logout();
    setIsAuthenticated(store.commonStore.isAuthenticated);
    history.push('/login');
  };

  const [isAuthenticated, setIsAuthenticated] = React.useState(
    store.commonStore.isAuthenticated
  );

  reaction(
    () => store.commonStore.isAuthenticated,
    (isAuthenticated) => {
      if (isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <React.Fragment>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <div style={{ flexGrow: 1 }}>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    padding: '10px',
                    maxWidth: '150px',
                  }}
                />
              </div>
              <AccountMenu logOut={signOutHandler} />
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            {menu_config.map((listItem) =>
              !listItem.sub ? (
                <React.Fragment key={listItem.name}>
                  <Divider sx={{ margin: '10px' }} />
                  <ListItem
                    button
                    key={listItem.name}
                    onClick={() => history.push(listItem.to)}
                  >
                    <ListItemIcon>{listItem.icon}</ListItemIcon>
                    <ListItemText primary={listItem.name} />
                  </ListItem>
                </React.Fragment>
              ) : (
                <NestedList
                  key={listItem.name}
                  listItem={listItem}
                  history={history}
                />
              )
            )}
          </Drawer>
        </React.Fragment>
      ) : (
        <UserAppBar />
      )}
    </React.Fragment>
  );
}

const NestedList = (props: any) => {
  const [listOpen, setListOpen] = React.useState(false);
  const { listItem, history } = props;
  const handleClick = () => {
    setListOpen(!listOpen);
  };
  return (
    <React.Fragment>
      <Divider sx={{ margin: '10px' }} />
      <ListItem button key={listItem.name} onClick={handleClick}>
        <ListItemIcon>{listItem.icon}</ListItemIcon>
        <ListItemText primary={listItem.name} />
        {listOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listItem.sub.map((subListItem: any) => (
            <ListItem
              button
              key={subListItem.name}
              onClick={() => history.push(subListItem.to)}
            >
              <ListItemIcon />
              <ListItemText primary={subListItem.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const UserAppBar = (props: any) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
      }}
    >
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <img
            src={logo}
            alt="logo"
            style={{
              padding: '10px',
              maxWidth: '150px',
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};
