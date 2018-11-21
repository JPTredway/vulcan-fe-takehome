import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
`;

const Landing = () => (
  <Wrapper>
    <h1>Welcome!</h1>
    <p>
      Use the nav links to view each section of this front end take home
      challenge
    </p>
  </Wrapper>
);

export default Landing;
