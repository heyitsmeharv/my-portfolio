import React, { useState } from 'react';
import styled from 'styled-components';

// components
import Toast from '../Toast/Toast';
import { Input, TextArea } from "../Input/Input";
import { ContactMeSendButton } from "../Button/Button";

//icons
import { CheckSVG } from '../../resources/styles/icons';
import { ErrorSVG } from '../../resources/styles/icons';

const Container = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.secondary};
  max-height: ${props => props.open ? "100%" : "0"};
  padding: ${props => props.open ? "4rem 0;" : "0"};
  transition: all 0.3s ease-out;
  overflow: hidden;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`;

const Text = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  line-height: 25px;
`;

const Seporator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.accent};
`;

const ContactMe = ({ open }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);

  const handleOnReset = () => {
    setName('');
    setEmail('');
    setTelephone('');
    setCompany('');
    setMessage('');
  };

  const createToast = type => {
    const id = Math.floor((Math.random() * 100) + 1);
    const toast = {
      id,
      title: type === 'Success' ? 'Success' : 'Error',
      description: type === 'Success' ? 'Successfully Send Email' : 'Failed To Send Email',
      backgroundColor: type === 'Success' ? '#5cb85c' : '#d9534f',
      icon: type === 'Success' ? <CheckSVG /> : <ErrorSVG />
    }
    let array = [];
    array.push(...list, toast);
    setList(array);
  };

  const handleOnSendEmail = () => {
    const id = Math.floor((Math.random() * 100) + 1);
    const emailObj = {
      name,
      email,
      company,
      telephone,
      message,
    }
    fetch('https://heyitsmeharv-backend.herokuapp.com/email/send', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(emailObj)
    }).then(response => {
      if (response.ok) {
        createToast('Success');
      } else {
        createToast('Fail');
      }
    }).catch(error => {
      console.log(`Unable to send email: ${error}`);
    });
    handleOnReset();
  }

  return (
    <Container open={open}>
      <Title>Contact Me</Title>
      <Seporator />
      <Text>Contact me for more information on my own work experiences and services and any business enquiries.</Text>
      <FlexWrapper>
        <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
        <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
      </FlexWrapper>
      <FlexWrapper>
        <Input onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Company" />
        <Input onChange={(e) => setTelephone(e.target.value)} type="text" placeholder="Telephone" />
      </FlexWrapper>
      <FlexWrapper>
        <TextArea onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message" />
      </FlexWrapper>
      <FlexWrapper>
        <ContactMeSendButton onClick={handleOnSendEmail}>Send Message</ContactMeSendButton>
      </FlexWrapper>
      <Toast toastList={list} />
    </Container>
  )
}

export default ContactMe;