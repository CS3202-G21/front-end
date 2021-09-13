import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useStore } from "../hooks/useStore";

export type ProtectedRouteProps = RouteProps;

export default function PrivateRoute({ ...routeProps }) {
  const store = useStore();
  if (store.commonStore.isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to="/login" />;
  }
}
