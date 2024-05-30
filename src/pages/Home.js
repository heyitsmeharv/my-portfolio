import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NotificationContainer } from 'react-notifications';

// context
import { LanguageContext } from "../context/languageContext";

// components
import Introduction from "../components/Introduction/Introduction";
import AboutMe from "../components/AboutMe/AboutMe";
import GitHubActivityTracker from "../components/GithubTracker/GithubTracker";
import ProfessionalExperience from "../components/ProfessionalExperience/ProfessionalExperience";
import ContactMe from "../components/ContactMe/ContactMe";
import Skills from "../components/Skills/Skills";
import Comments from "../components/Comments/Comments";
import LikeCounter from "../components/LikeCounter/LikeCounter";

const Margin = styled.div`
  margin: 5rem;
`;

const Container = styled.div``;

const Home = () => {
  const [open, setOpen] = useState(false);
  const language = useContext(LanguageContext);

  return (
    <Container>
      <NotificationContainer />
      <Margin>
        <Introduction language={language} open={open} setOpen={setOpen} />
      </Margin>
      <ContactMe language={language} open={open} />
      <AboutMe language={language} />
      <ProfessionalExperience language={language} />
      <Skills language={language} />
      <Comments language={language} />
      {/* <LikeCounter /> */}
      <GitHubActivityTracker language={language} />
    </Container >
  );
};

export default Home;
