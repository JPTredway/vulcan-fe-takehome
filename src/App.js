import React from "react";
import styled from "styled-components";

import Routes from "./Routes";
import Nav from "./components/Nav";

const Wrapper = styled.div`
  height: 100vh;
  width: 90%;
  margin: 40px auto 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const App = () => (
  <div>
    <Nav />
    <Wrapper>
      <Routes />
    </Wrapper>
  </div>
);

export default App;
