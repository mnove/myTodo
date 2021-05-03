import React from "react";
import { Route, Redirect } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component,  ...rest  }) => {


  const isAuth = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;