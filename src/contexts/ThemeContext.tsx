import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';

const MaterialThemeProvider = (props: any) => {
  const store = useStore();
  console.log(store.commonStore.theme);
  const theme = createTheme({
    palette: {
      mode: store.commonStore.theme,
      primary: {
        main: '#115293',
      },
      secondary: {
        main: '#DC004E',
      },
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default observer(MaterialThemeProvider);
