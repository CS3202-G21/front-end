import { StoreContext } from "../contexts/StoreContext";
import React from "react";

export const useStore = () => React.useContext(StoreContext);
