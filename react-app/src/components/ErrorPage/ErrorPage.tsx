import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <div>{error.statusText || error.message}</div>
    </div>
  );
};

export default ErrorPage;
