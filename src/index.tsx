import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./contexts/StoreContext";
import { rootStore } from "./stores/RootStore";
import { BrowserRouter } from "react-router-dom";
import { FetchBoundary } from "./fetch";
import MaterialThemeProvider from "./contexts/ThemeContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MaterialThemeProvider>
        <StoreProvider store={rootStore}>
          <BrowserRouter>
            <FetchBoundary>
              <App />
            </FetchBoundary>
          </BrowserRouter>
        </StoreProvider>
      </MaterialThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
