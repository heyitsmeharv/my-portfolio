import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// components
import { ContactMeButton, DownloadCVButton } from "../Button/Button";

// animations
import SlideInBottom from "../../animations/SlideInBottom";
import { Facebook, LinkedIn, Twitter, Github } from "../../animations/SocialMediaButtons";

// images
import ProfileImg from "../../resources/images/profile-portrait.jpg";

// icons
import {
  StyledFacebookCircle,
  StyledLinkedinSquare,
  StyledTwitter,
  StyledGithub,
} from "../../resources/styles/icons";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const IntroWrapper = styled.div`
  animation: ${SlideInBottom} 0.5s forwards;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  z-index: -1;
`;

const SocialMediaButtonFacebook = styled(motion.button)`
  animation: ${Facebook} 0.5s 0.8s forwards;
  background: none;
  outline: none !important;
  border: none;
  /* position: absolute; */
  z-index: 20000;
  :hover {
    cursor: pointer;
  };
`;

const SocialMediaButtonTwitter = styled(motion.button)`
  animation: ${Twitter} 0.5s 0.7s forwards;
  background: none;
  outline: none !important;
  border: none;
  position: absolute;
  :hover {
    cursor: pointer;
  };
`;


const SocialMediaButtonLinkedIn = styled(motion.button)`
  animation: ${LinkedIn} 0.5s 0.6s forwards;
  background: none;
  outline: none !important;
  border: none;
  position: absolute;
  :hover {
    cursor: pointer;
  };
`;


const SocialMediaButtonGithub = styled(motion.button)`
  animation: ${Github} 0.5s 0.5s forwards;
  background: none;
  outline: none !important;
  border: none;
  position: absolute;
  :hover {
    cursor: pointer;
  };
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 30rem;
  margin: 0 4rem;
  @media only screen and (max-width: 600px) {
    width: 30rem;
  }
  @media only screen and (max-width: 375px) {
    width: 25rem;
  }
`;

const Intro = styled.h1`
  color: ${({ theme }) => theme.background};
  animation: ${SlideInBottom} 0.5s forwards;
  display: flex;
  align-items: center;
  height: fit-content;
  border-radius: 35px;
  font-size: 4rem;
  line-height: 1.5;
  letter-spacing: 3.2px;
  font-weight: 600;
  width: 100%;
  @media only screen and (max-width: 600px) {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 5%;
  }
`;

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.text};
  :hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }
`;

const Introduction = ({ open, setOpen }) => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileImage src={ProfileImg} />
        <ButtonContainer>
          <SocialMediaButtonFacebook
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <a target='_blank' href="https://www.facebook.com/adam.harvey.73/">
              <StyledFacebookCircle />
            </a>
          </SocialMediaButtonFacebook>
          <SocialMediaButtonTwitter
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <a target='_blank' href="https://twitter.com/heyitsmeharv">
              <StyledTwitter />
            </a>
          </SocialMediaButtonTwitter>
          <SocialMediaButtonLinkedIn
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <a target='_blank' href="https://www.linkedin.com/in/heyitsmeharv/">
              <StyledLinkedinSquare />
            </a>
          </SocialMediaButtonLinkedIn>
          <SocialMediaButtonGithub
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <a target='_blank' href="https://github.com/heyitsmeharv">
              <StyledGithub />
            </a>
          </SocialMediaButtonGithub>
        </ButtonContainer>
        {/* <CircleTwo />
        <CircleThree /> */}
      </ProfileContainer>
      <IntroWrapper>
        <Intro>
          Hello 👋, my name is Adam. I'm a software engineer from Oxford, England.
        </Intro>
        <ButtonWrapper>
          <ContactMeButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
          >
            Contact Me
          </ContactMeButton>
          <DownloadCVButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <StyledAnchor
              target="_blank"
              href="https://heyitsmeharv.s3.eu-west-2.amazonaws.com/AH+-+CV.pdf"
            >
              Curriculum Vitae
            </StyledAnchor>
          </DownloadCVButton>
        </ButtonWrapper>
      </IntroWrapper>
    </Container>
  );
};

export default Introduction;
