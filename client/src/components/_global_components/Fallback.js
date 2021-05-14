import React from 'react';

import {Link} from "react-router-dom";

import styled from "styled-components";





function Fallback() {
    return (
        <div>
            <p>Something went wrong!!</p>
            <Link to="/">Go Back to Home</Link>
        </div>
    )
}

export default Fallback
