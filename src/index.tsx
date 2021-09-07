import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./contexts/StoreContext";
import { rootStore } from "./stores/RootStore";
import { BrowserRouter } from "react-router-dom";
import { FetchBoundary } from "./fetch";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={rootStore}>
      <BrowserRouter>
        <FetchBoundary>
          <App />
        </FetchBoundary>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
