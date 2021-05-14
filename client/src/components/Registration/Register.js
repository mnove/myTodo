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

import { RegistrationForm } from "./RegistrationForm";
import { Logo } from "../_global_components";

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
            <EuiFlexGroup justifyContent="spaceAround">
              <EuiFlexItem grow={false}>
                <Logo />
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer />

            <EuiFlexGroup justifyContent="spaceAround">
              <EuiFlexItem grow={false}>
               <EuiTitle><h1>Register Now</h1></EuiTitle>
               <EuiText textAlign="center"><h4>It's free!</h4></EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer />

            <EuiFlexGroup>
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
