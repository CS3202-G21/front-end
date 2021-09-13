import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function MaterialThemeProvider(props: any) {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#115293",
          },
          secondary: {
            main: "#DC004E",
          },
        },
      }),
    []
  );
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
