import React, { Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {PageContainer} from "../components/styled_components/globalPageComponents";



import ListTodo from "../components/ListTodo";
import InputTodo from "../components/InputTodo";

// redux
// import { connect } from "react-redux";
// import { getUserData } from "../redux/index";

const Dashboard = () => {
  
//   const PageContainer = styled.div`
//   padding-top: 1rem;
//   padding-bottom: 0rem;
//   padding-left: 3rem;
//   padding-right: 3rem;
// `;




  return (
    <Fragment>
    <PageContainer>
     <InputTodo />
     <ListTodo />
     </PageContainer>
    </Fragment>
  );
};


// connect react components to Redux store
export default Dashboard;
