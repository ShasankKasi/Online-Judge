import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";

const Navbar = styled.nav`
  background-color: #008bff;
  padding: 1rem 0;
`;

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Brand = styled.span`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled.li`
  margin-left: 3rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin-right: 15px;
  }
`;

const Homebar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData(["isAuthenticated"]);

  const handleLogout = () => {
    queryClient.removeQueries(["user"]);
    queryClient.removeQueries(["isAuthenticated"]);
    navigate("/", { replace: true });
  };

  return (
    <Navbar>
      <StyledContainer>
        <LogoLink to="/home">
          <Brand>CodeSoldiers</Brand>
        </LogoLink>
        <NavLinks>
          <NavLink>
            <StyledLink to="/home">Home</StyledLink>
          </NavLink>
          <NavLink>
            <StyledLink to="/about">About Us</StyledLink>
          </NavLink>
          <NavLink>
            <StyledLink to="/contact">Contact</StyledLink>
          </NavLink>
        </NavLinks>
        {authData?.auth && (
          <StyledLink onClick={handleLogout}>
            <FiLogOut />
            Logout
          </StyledLink>
        )}
      </StyledContainer>
    </Navbar>
  );
};

export default Homebar;
