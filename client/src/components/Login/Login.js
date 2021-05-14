import React from 'react';


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

import {LoginForm} from "./"


import styled from "styled-components";
import {PageContainer} from "../_global_components";




function Login() {
    return (
        <>
        
        <PageContainer>
        <EuiFlexGroup justifyContent="spaceAround" > 

         <EuiFlexItem grow={false}><LoginForm /></EuiFlexItem>
        
        </EuiFlexGroup>
</PageContainer>
                     
        </>
    )
}

export default Login;


