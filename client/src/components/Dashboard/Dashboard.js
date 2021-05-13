import React, { Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {PageContainer} from "../_global_components";



import {TaskList} from "./";
import {TaskAdd} from "./"

// redux
// import { connect } from "react-redux";
// import { getUserData } from "../redux/index";

export const Dashboard = () => {
  
//   const PageContainer = styled.div`
//   padding-top: 1rem;
//   padding-bottom: 0rem;
//   padding-left: 3rem;
//   padding-right: 3rem;
// `;




  return (
    <Fragment>
    <PageContainer>
     <TaskAdd />
     <TaskList />
     </PageContainer>
    </Fragment>
  );
};


