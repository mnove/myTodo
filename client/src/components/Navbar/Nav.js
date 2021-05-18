import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { htmlIdGenerator } from "@elastic/eui/lib/services";

import {
  EuiHeader,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeaderSectionItem,
  EuiLink,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

// redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/index";

const Nav = (props) => {
  const handleLogout = async () => {
    await props.logoutUser();
    await props.history.push("/login");
  };

  const HeaderUserMenu = () => {
    const id = htmlIdGenerator()();
    const [isOpen, setIsOpen] = useState(false);

    const onMenuButtonClick = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
      setIsOpen(false);
    };

    const button = (
      <EuiHeaderSectionItemButton
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={onMenuButtonClick}
      >
        <EuiAvatar name="John Doe" size="s" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id={id}
        button={button}
        isOpen={isOpen}
        anchorPosition="downRight"
        closePopover={closeMenu}
        panelPaddingSize="none"
      >
        <div style={{ width: 320 }}>
          <EuiFlexGroup
            gutterSize="m"
            className="euiHeaderProfile"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
              <EuiAvatar name="John Doe" size="xl" />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiText>
                <p>John Doe</p>
              </EuiText>

              <EuiSpacer size="m" />

              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiLink>Settings</EuiLink>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                      <EuiLink>
                        <Link
                          // className="nav-link"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </EuiLink>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    );
  };

  return (
    <>
      <EuiHeader
        theme="default"
        sections={[
          {
            items: [
              // <EuiHeaderLogo>myTodo</EuiHeaderLogo>,
              <EuiHeaderLinks aria-label="App navigation dark theme example">
                <EuiHeaderLink>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </EuiHeaderLink>
                <EuiHeaderLink>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </EuiHeaderLink>
                <EuiHeaderLink>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </EuiHeaderLink>
                <EuiHeaderLink>
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </EuiHeaderLink>
                <EuiHeaderLink>
                  <Link className="nav-link" to="/test">
                    Test Component
                  </Link>
                </EuiHeaderLink>
              </EuiHeaderLinks>,
            ],
            borders: "right",
          },
          {
            items: [
              <EuiHeaderSectionItem>
                <HeaderUserMenu />
              </EuiHeaderSectionItem>,
            ],
            borders: "none",
          },
        ]}
      />
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
