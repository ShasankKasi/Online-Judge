import React from "react";
import styled from "styled-components";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import Homebar from "./Homebar";

const ContactContainer = styled.div`
  padding: 3rem;
  background-color: #f0f0f0;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  border: 2px solid #ccc;
  border-radius: 15px;
  margin: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333; /* Dark gray */
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  text-align: center;
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
`;

const ContactDescription = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Contact = () => {
  return (
    <>
      <Homebar />
      <ContactContainer>
        <Title>Contact Us</Title>
        <ContactInfo>
          <ContactItem>
            <HiOutlineMail style={{ marginRight: "10px" }} />
            <EmailLink href="mailto:noreply.codesoldiers@gmail.com">
              noreply.codesoldiers@gmail.com
            </EmailLink>
          </ContactItem>
          <ContactItem>
            <HiOutlinePhone style={{ marginRight: "10px" }} />
            +91 9885291225
          </ContactItem>
        </ContactInfo>
        <ContactDescription>
          Have a question or want to discuss a project? Feel free to reach out
          to us using the information above. We're always happy to hear from
          you!
        </ContactDescription>
      </ContactContainer>
    </>
  );
};

export default Contact;
