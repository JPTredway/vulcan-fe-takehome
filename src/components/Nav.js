import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  height: 50px;
  background: rgb(78, 158, 234);
  color: white;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-items: center;

  a {
    text-decoration: none;
    color: white;
    border-bottom: 1px solid transparent;
    opacity: 0.8;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  a.active,
  a:hover {
    opacity: 1;
    border-bottom: 1px solid white;
  }
`;

const Nav = () => (
  <NavBar>
    <NavLink exact to="/">
      Home
    </NavLink>
    <NavLink exact to="/google-search-item">
      Google Search item
    </NavLink>
    <NavLink exact to="/title-scraper">
      Title Scraper
    </NavLink>
    <NavLink exact to="/configurable-table">
      Configurable Table
    </NavLink>
    <NavLink exact to="/heatmap">
      Heat Map
    </NavLink>
  </NavBar>
);

export default Nav;
