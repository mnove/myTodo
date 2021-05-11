import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiBadge, EuiIcon, EuiAvatar
} from '@elastic/eui';



// redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/index";

const Nav = (props) => {
  const handleLogout = async () => {
    await props.logoutUser();
     await props.history.push("/login");
  };

  return (

    <>
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
              <Link className="nav-link" to="/test">
                Test Component
              </Link>

              <Link className="nav-link" to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>

    <Fragment>
    <EuiHeader
    theme="default"
    sections={[
      {
        items: [
          // <EuiHeaderLogo>myTodo</EuiHeaderLogo>,
          <EuiHeaderLinks aria-label="App navigation dark theme example">
            <EuiHeaderLink><Link className="nav-link" to="/">
                Home
              </Link></EuiHeaderLink>
            <EuiHeaderLink><Link className="nav-link" to="/login">
                Login
              </Link></EuiHeaderLink>
            <EuiHeaderLink><Link className="nav-link" to="/register">
                Register
              </Link></EuiHeaderLink>
            <EuiHeaderLink><Link className="nav-link" to="/dashboard">
                Dashboard
              </Link></EuiHeaderLink>
            <EuiHeaderLink><Link className="nav-link" to="/test">
                Test Component
              </Link></EuiHeaderLink>
            <EuiHeaderLink><Link className="nav-link" to="/login" onClick={handleLogout}>
                Logout
              </Link></EuiHeaderLink>
          </EuiHeaderLinks>,
        ],
        borders: 'right',
      },
      {
        items: [

          <EuiHeaderSectionItemButton aria-label="Account menu">
            <EuiAvatar name="Voula Ena" size="s" />
          </EuiHeaderSectionItemButton>,
        ],
        borders: 'none',
      },
    ]}
  />
    </Fragment>

    </>
  );
};

// REDUX //

// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

// connect react components to Redux store and React Router
export default withRouter(connect(null, mapDispatchToProps)(Nav));
