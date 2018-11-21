import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #333;
  padding: 12px;
  background: white;
  width: 50%;
`;

const Title = styled.p`
  margin: 0;
  width: 88%;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    text-decoration: none;
  }
`;

const URL = styled.a`
  text-decoration: none;
  color: rgb(0, 64, 13);
  font-size: 0.9rem;

  &::after {
    content: " ▾";
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const GoogleSearchItem = props => (
  <Wrapper>
    <Title>
      <a href={props.url}>{props.title}</a>
    </Title>
    <URL href={props.url}>{props.url}</URL>
    <Description>{props.description}</Description>
  </Wrapper>
);

export default GoogleSearchItem;
