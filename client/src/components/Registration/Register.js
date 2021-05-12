import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { userApi } from "../../api/user-api";
import Alert from "react-bootstrap/Alert";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import styled from "styled-components";

import {RegistrationForm} from "./RegistrationForm";

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`;
const StyledEuiPageHeader = styled(EuiPageHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem;

  & h1 {
    font-size: 3.5rem;
  }
`;

const StyledEuiText = styled(EuiText)`

    h4 {
        color: grey;
      }
      
    `;

 const Register = (props) => {
  return (
    <Fragment>
      <Fragment>
        <StyledEuiPage>
          <EuiPageBody component="section">
            <EuiFlexGroup>
              <EuiFlexItem grow={6}>
                <EuiTitle size="l">
                  <h1>Welcome to myTodo</h1>
                </EuiTitle>

                <EuiText>
                  <h4>Register now. It's free!</h4>
                </EuiText>

                <StyledEuiText>
                  <h4>Register now. It's free!</h4>
                </StyledEuiText>
              </EuiFlexItem>

              <EuiFlexItem grow={6}>
                <EuiPageContent
                  verticalPosition="center"
                  horizontalPosition="center"
                >
                  <EuiPageContentBody>
                    <RegistrationForm />
                  </EuiPageContentBody>
                </EuiPageContent>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageBody>
        </StyledEuiPage>
      </Fragment>
    </Fragment>
  );
};

 export default withRouter(Register);
