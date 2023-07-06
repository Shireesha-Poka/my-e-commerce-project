import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import Profile from "../Users/Profile";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return  <Navigate to="/login" />;
            }

            else if(isAuthenticated === false) {
                return Profile;
            }

            else if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }
            

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;