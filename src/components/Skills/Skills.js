import React from 'react';
import styled from 'styled-components';

import Card from '../Card/Card';

// icons
import {
  AWSSVG,
  GraphqlSVG,
  ReactjsSVG,
  ExpressSVG,
  JavascriptSVG,
  NodejsSVG,
  HtmlSVG,
  CssSVG,
  MongoDBSVG,
  MySQLSVG,
  TwilioSVG,
  WebpackSVG,
  GithubSVG,
  GitSVG,
  SassSVG,
  StyledComponentsSVG,
} from "../../resources/styles/icons";

const Container = styled.section`
  width: 100%;
  max-height: 100%;
  padding: 4rem 0;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.secondary};
`;

const Seporator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.accent};
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  margin-top: 30px;
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
  line-height: 25px;
`;

const Skills = () => {
  const skillList = [
    {
      icon: <JavascriptSVG />,
      title: "Javascript",
    },
    {
      icon: <HtmlSVG />,
      title: "HTML",
    },
    {
      icon: <CssSVG />,
      title: "CSS",
    },
    {
      icon: <SassSVG />,
      title: "Sass",
    },
    {
      icon: <StyledComponentsSVG />,
      title: "Styled Comonents",
    },
    {
      icon: <ReactjsSVG />,
      title: "React",
    },
    {
      icon: <NodejsSVG />,
      title: "Node",
    },
    {
      icon: <ExpressSVG />,
      title: "Express",
    },
    {
      icon: <AWSSVG />,
      title: "AWS",
    },
    {
      icon: <TwilioSVG />,
      title: "Twilio",
    },
    {
      icon: <MongoDBSVG />,
      title: "Mongo DB",
    },
    {
      icon: <GraphqlSVG />,
      title: "GraphQL",
    },
    {
      icon: <WebpackSVG />,
      title: "Webpack",
    },
    {
      icon: <MySQLSVG />,
      title: "MySQL",
    },
    {
      icon: <GitSVG />,
      title: "Git",
    },
    {
      icon: <GithubSVG />,
      title: "GitHub",
    },
  ];

  return (
    <Container>
      <Title>Skills</Title>
      <Seporator />
      <Text>Here's a list of technologies I've used: </Text>
      <FlexWrapper>
        {skillList.map((skill, i) => {
          return (
            <Card
              key={i}
              icon={skill.icon}
              title={skill.title}
            />
          )
        })}
      </FlexWrapper>
    </Container>
  );
}

export default Skills;