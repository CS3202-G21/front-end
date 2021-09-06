import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./contexts/StoreContext";
import { rootStore } from "./stores/RootStore";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
