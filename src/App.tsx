import React from "react";
import { useFetch } from "./fetch";
import { useStore } from "./hooks/useStore";

const App = () => {
  const store = useStore();
  const data = useFetch({
    url: "https://jsonplaceholder.typicode.com/todos/1",
  });
  console.log(data);
  return (
    <div>
      {store.authStore.email} {JSON.stringify(data)}
    </div>
  );
};

export default App;
