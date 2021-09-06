import React from "react";
import { useStore } from "./hooks/useStore";

const App = () => {
  const store = useStore();
  return <div>{store.authStore.email}</div>;
};

export default App;
