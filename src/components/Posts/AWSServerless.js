import ReactGA from 'react-ga';
import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { ChevronBackCircle } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import { AWSSVG, AWSLambdaSVG, AWSAPIGatewaySVG, AWSStepFunctionsSVG } from '../../resources/styles/icons';

// components
import { StyledNavButton, StyledNavLink } from '../Button/Button';
import Table from '../Table/Table';

// images
import LambdaConcurrency from "../../resources/images/blog/AWSServerless/aws_serverless_lambda_concurrency.jpeg"

const Wrapper = styled.div`
  padding: 1rem 25%;
  line-height: 6.5rem;
  
  @media only screen and (max-width: 1000px) {
    line-height: 5rem;
    padding: 0;
  }

  @media only screen and (min-width: 1001px) and (max-width: 1800px) {
    line-height: 6.5rem;
    padding: 1rem 20%;
  }
`;

const Container = styled.div`
  padding: 4rem;
  background: ${({ theme }) => theme.background};
  animation: ${SlideInBottom} 0.5s forwards;
`;

const OverflowContainer = styled.div`
  overflow: auto;
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const FlexTop = styled.div`
  display: flex;
  align-items: start;

  @media only screen and (max-width: 2300px) {
    flex-direction: column;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const CodeBlock = styled.pre`
  font-family: 'Calibri';
  font-size: 2rem;
  background: #292929;
  color: ${({ theme }) => theme.buttonText};
  word-wrap: break-word;
  padding: 1rem 2rem 1rem;
  border-radius: 2rem;
  overflow-x: auto;
  line-height: 3.5rem;
`;

const CodeBlockIndent = styled.pre`
  font-family: 'Calibri';
  font-size: 2rem;
  background: #292929;
  color: ${({ theme }) => theme.buttonText};
  word-wrap: break-word;
  padding: 1rem 2rem 1rem;
  border-radius: 2rem;
  overflow-x: auto;
  line-height: 3.5rem;
  margin-left: 10%;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
`;

const SubTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 2% auto;
`;

const SubTitleSmall = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 2% auto;
`;

const HeadingSmall = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  font-style: italic;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
`;

const BoldText = styled.b`
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  font-weight: bold;
`;

const BoldTextSmall = styled.b`
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  font-weight: bold;
`;

const StyledCodeSpan = styled.code`
  background-color: #f1f1f1;
  color: crimson;
  padding: 0 5px;
  margin: 0 5px;
`;

const UnStyledListItem = styled.li`
  list-style-type: none;
  color: ${({ theme }) => theme.text};
  margin-left: 5%;
`;

const StyledListItem = styled.li`
  color: ${({ theme }) => theme.text};
  margin-left: 5%;
`;

const StyledListItemIndent = styled.li`
  color: ${({ theme }) => theme.text};
  margin-left: 10%;
`;

const StyledListItemIndentExtra = styled.li`
  color: ${({ theme }) => theme.text};
  margin-left: 15%;
`;

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.text};
`;

const StyledAnchorText = styled.span`
  color: ${({ theme }) => theme.text};
  font-style: italic;
  font-weight: bold;
`;

const StyledBackIcon = styled(ChevronBackCircle)`
  color: ${({ theme }) => theme.secondary};
  width: 4rem;
`;

const StyledImage = styled.img`
  width: ${props => props.width ? props.width : '100%'};
  height: ${props => props.height ? props.height : '100%'};
  margin-right: ${props => props.mr ? props.mr : '0px'};
  margin-left: ${props => props.ml ? props.ml : '0px'};
  margin-top: ${props => props.mt ? props.mt : '0px'};
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-right: 25px;

  @media only screen and (max-width: 1000px) {
    width: 36px;
    height: 36px;
  }
`;

const Spacer = styled.br`
  display: block;
  margin: 10px 0;
`;

const AWSServerless = () => {

  // analytics
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      ReactGA.pageview('/blog/aws-serverless');
    }
  }, []);

  const columns = ['Execution', 'Deployment'];
  const data = [
    { Execution: 'Memory Allocation 128 MB - 10GB (1 MB Increments)', Deployment: 'Lambda function deployment size (compressed .zip): 50 MB' },
    { Execution: 'Maximum execution time: 900 seconds (15 minutes)', Deployment: 'Size of uncompressed deployment (code + dependencies): 250 MB' },
    { Execution: 'Environment variables (4 KB)', Deployment: 'Can use the /tmp directory to load other files at startup' },
    { Execution: 'Disk capacity in the function container (512 MB to 10 GB)', Deployment: 'Environment variables (4 KB)' },
    { Execution: 'Concurrency exectutions: 1000 (can be increased)' },
  ];

  return (
    <Wrapper>
      <StyledNavButton>
        <StyledNavLink
          exact to={`/blog`}>
          <StyledBackIcon />
        </StyledNavLink>
      </StyledNavButton>
      <Container>
        <Flex>
          <Title>Amazon Serverless</Title>
          <IconWrapper>
            <Icon><AWSSVG /></Icon>
            <Icon><AWSLambdaSVG /></Icon>
            <Icon><AWSAPIGatewaySVG /></Icon>
            <Icon><AWSStepFunctionsSVG /></Icon>
          </IconWrapper>
        </Flex>
        <Spacer />
        <Text>
          In this post we'll be diving into Amazon's serverless solutions including AWS Lambda, AWS API Gateway and AWS Step Functions.
          <StyledAnchor href="#what-is-serverless"><StyledListItem>What Is Serverless?</StyledListItem></StyledAnchor>
          <StyledAnchor href="#aws-lambda"><StyledListItem>Lambda</StyledListItem></StyledAnchor>
          <StyledAnchor href="#aws-api-gateway"><StyledListItem>API Gateway</StyledListItem></StyledAnchor>
          <StyledAnchor href="#aws-step-functions"><StyledListItem>Step Functions</StyledListItem></StyledAnchor>
          <Spacer />
          <SubTitle id="what-is-serverless">What Is Serverless?</SubTitle>
          Before we explore any AWS services that are classed as serverless, let's first outline what constitutes as 'Serverless'. Serverless was
          a term that was pioneered by AWS Lambda but now includes anything that's managed: databases, messaging, storage, etc. <BoldText>Serverless
          doesn't mean there are no servers</BoldText>, it means you don't have to manage, provision, or see them. Serverless is a new paradigm in which
          developers don't have to manage servers anymore.
          <SubTitle id="aws-lambda">Lambda</SubTitle>
          AWS Lambda, a serverless compute service, executes your code in response to events, handling compute resources for you. It is a virtual function which is
          limited by time that runs on demand and scales automatically. You pay per request and compute time of the lambda function. Lambda is integrated with many programming
          languages including:
          <StyledListItem>Node.js (JavaScript)</StyledListItem>
          <StyledListItem>Python</StyledListItem>
          <StyledListItem>Java</StyledListItem>
          <StyledListItem>C# (.NET Core)/Powershell</StyledListItem>
          <StyledListItem>Ruby</StyledListItem>
          <StyledListItem>Custom Runtime API (Rust or GoLang)</StyledListItem>
          <Spacer />
          <SubTitleSmall>Limitations</SubTitleSmall>
          <Table data={data} columns={columns} />
          <Spacer />
          <SubTitleSmall>Lambda Concurrency and Throttling</SubTitleSmall>
          Concurrency limit is up to 1000 concurrent executions
          <StyledImage src={LambdaConcurrency} />

        </Text>
      </Container>
    </Wrapper>
  );
}

export default AWSServerless;