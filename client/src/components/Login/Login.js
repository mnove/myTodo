import React from "react";

import { EuiFlexGroup, EuiFlexItem, EuiHorizontalRule } from "@elastic/eui";

import { LoginForm } from "./";

import styled from "styled-components";
import { PageContainer } from "../_global_components";
import { Logo } from "../../components/_global_components";

const LoginContainer = styled.div`
  padding-top: 2rem;

  @media (min-width: 768px) {
    padding-top: 10rem;
  }
`;

function Login() {
  return (
    <>
      <PageContainer>
        <LoginContainer>
          <EuiFlexGroup justifyContent="spaceAround">
            <EuiFlexItem grow={false}>
              <Logo />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiHorizontalRule size="half" />
          <EuiFlexGroup justifyContent="spaceAround">
            <EuiFlexItem grow={false}>
              <LoginForm />
            </EuiFlexItem>
          </EuiFlexGroup>
        </LoginContainer>
      </PageContainer>
    </>
  );
}

export default Login;
