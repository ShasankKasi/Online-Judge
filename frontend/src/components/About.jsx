import React from "react";
import styled from "styled-components";
import Homebar from "./Homebar";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const AboutContainer = styled.div`
  padding: 3rem;
  background-color: #f0f0f0;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  border-radius: 15px;
  margin: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure relative positioning for pseudo elements */

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 20px;
    /* background: #648091; */
    left: 0;
  }

  &:before {
    top: -20px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  &:after {
    bottom: -20px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #555;
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: center;
`;

const List = styled.ul`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Logo = styled.img`
  width: 250px;
  height: auto;
  margin-bottom: 2rem;
`;

const ContactItem = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmailLink = styled.a`
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const About = () => {
  return (
    <>
      <Homebar />
      <AboutContainer>
        <Logo src="/logo.png" alt="Code Soldiers Logo" />
        <Title>About Code Soldiers</Title>
        <Text>
          Code Soldiers is a platform dedicated to programming enthusiasts,
          providing a space where users can select coding questions and solve
          them using C++ and other programming languages.
        </Text>
        <SectionTitle>Our Mission</SectionTitle>
        <Text>
          Our mission is to foster learning and skill development in programming,
          offering a range of curated coding challenges that cater to both
          beginners and experienced developers.
        </Text>
        <SectionTitle>Why Choose Us?</SectionTitle>
        <List>
          <ListItem>
            Access a diverse set of coding problems to enhance your programming
            skills.
          </ListItem>
          <ListItem>
            Practice solving problems in a supportive and engaging environment.
          </ListItem>
        </List>
      </AboutContainer>
    </>
  );
};

export default About;
