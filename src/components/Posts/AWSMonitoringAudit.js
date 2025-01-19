import ReactGA from 'react-ga';
import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { ChevronBackCircle } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import {
  AWSSVG,
  AWSCloudWatchSVG,
  AWSCloudTrailSVG,
  AWSConfigSVG
} from '../../resources/styles/icons';

// components
import { StyledNavButton, StyledNavLink } from '../Button/Button';
import Table from '../Table/Table';

// images
import CloudWatchMetric from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_metrics.jpeg"
import CloudWatchSubscriptions from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_subscriptions.jpeg"
import CloudWatchCrossAccountSubscriptions from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_cross_account_subscriptions.jpeg"
import CloudWatchCrossAccountAggregation from "../../resources/images/blog/AWSMonitoringAudit/aws_monitoring_audit_cw_cross_account_aggregation.jpeg"

// codeblocks
import { cloudwatchlogsInsights } from "../../helpers/codeblocks.js";

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
  margin: 2% auto;
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

const AWSMonitoringAudit = () => {

  // analytics
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      ReactGA.pageview('/blog/aws-monitoring-audit');
    }
  }, []);

  const columns = ['Feature', 'Description'];
  const data = [
    { Feature: 'Metrics', Description: 'Tracks CPU, memory, network utilization, and custom metrics from your applications.' },
    { Feature: 'Logs', Description: 'Centralizes log collection and analysis with search and filtering capabilities.' },
    { Feature: 'Alarms', Description: 'Notifies users or triggers actions based on metric thresholds.' },
    { Feature: 'Dashboards', Description: 'Custom visualizations for real-time monitoring.' },
    { Feature: 'Custom Anomaly Detection', Description: 'Automatically identifies metric patterns and deviations.' },
    { Feature: 'Synthetic Monitoring', Description: 'Tests application endpoints proactively with canary scripts.' }
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
        <FlexTop>
          <Title>Amazon Monitoring & Audit</Title>
          <IconWrapper>
            <Icon><AWSSVG /></Icon>
            <Icon><AWSCloudWatchSVG /></Icon>
            <Icon><AWSCloudTrailSVG /></Icon>
            <Icon><AWSConfigSVG /></Icon>
          </IconWrapper>
        </FlexTop>
        <Spacer />
        <Text>
          In this post we'll be diving into Amazon's monitoring and auditing solutions.
          <StyledAnchor href="#aws-cloudwatch"><StyledListItem>CloudWatch</StyledListItem></StyledAnchor>
          <Spacer />
          <SubTitle id="aws-cloudwatch">CloudWatch</SubTitle>
          Amazon CloudWatch is a monitoring and observability service provided by AWS that collects and tracks metrics, monitors logs, and generates alerts for your applications and infrastructure.
          It enables you to gain actionable insights into system performance, optimize resource utilization, and troubleshoot operational issues in real time.
          CloudWatch supports a variety of AWS resources and custom applications, making it a centralized solution for monitoring and managing your cloud infrastructure.
          <HeadingSmall>CloudWatch Features</HeadingSmall>
          <Table data={data} columns={columns} />
          <Spacer />
          <SubTitleSmall>CloudWatch Metrics</SubTitleSmall>
          CloudWatch Metrics are fundamental data points collected over time about the performance, usage, or health of your AWS resources and custom applications.
          Metrics provide critical insights for monitoring and optimizing infrastructure and applications.
          Each metric is uniquely identified by its namespace, metric name, and dimensions, and is stored for analysis and visualization.
          <Spacer />
          Here is an example on how you can continually stream CloudWatch metrics to a destination of your choice, with near-real-time delivery and low latency.
          <StyledImage src={CloudWatchMetric} />
          <Spacer />
          <SubTitleSmall>CloudWatch Logs</SubTitleSmall>
          CloudWatch Logs is a fully managed service that enables you to monitor, store, and access log files from AWS services, custom applications, and on-premises systems.
          <HeadingSmall>Core Components of CloudWatch Logs</HeadingSmall>
          <StyledListItem>Log Groups: A logical grouping of log streams with shared retention, access policies, and tags.</StyledListItem>
          <StyledListItem>Log Streams: A sequence of log events from a single source, such as an application or a Lambda function.</StyledListItem>
          <StyledListItem>Log Events: Individual entries in a log stream, containing a timestamp and raw data.</StyledListItem>
          <StyledListItem>Log Retention: Configurable from 1 day to indefinite retention for each log group.</StyledListItem>
          <Spacer />
          Logs are encrypted by default although you can setup KMS-based encryption with your own keys. Logs can be send to:
          <StyledListItem>S3 (exports) - Can take up to 12 hours to become available for export using the CreateExportTask API</StyledListItem>
          <StyledListItem>Kinesis Data Streams</StyledListItem>
          <StyledListItem>Kinesis Data Firehose</StyledListItem>
          <StyledListItem>AWS Lambda</StyledListItem>
          <StyledListItem>OpenSearch</StyledListItem>
          <Spacer />
          <HeadingSmall>CloudWatch Logs Insights</HeadingSmall>
          CloudWatch Logs Insights is used for querying log data. It uses a purpose-built query language that supports filtering, aggregation, and visualization. Insights is a feature which essentially
          fetches desired event fields, filter based on conditions, calculate aggregate statistics. Here is an example on how you can use insights to find errors in logs:
          <Spacer />
          <CodeBlock>
            {cloudwatchlogsInsights}
          </CodeBlock>
          <Spacer />
          Insights is a query engine not a real-time engine.
          <HeadingSmall>CloudWatch Logs Subscriptions</HeadingSmall>
          If you want real-time processing and analysis you should use CloudWatch Logs Subscriptions. Subscription filters can be used to filter which log events are delivered to destinations.
          Kinesis Data Streams, Kinesis Data Firehose or Lambda are the potential destinations.
          <StyledImage src={CloudWatchSubscriptions} />
          <HeadingSmall>CloudWatch Logs Aggregation Multi-Account & Multi-Region</HeadingSmall>
          It is possible to aggregate data from different CloudWatch Logs into different accounts and different regions into a common destination such as the Kinesis Data Stream in one specific account.
          <StyledImage src={CloudWatchCrossAccountAggregation} />
          <HeadingSmall>CloudWatch Logs Cross-Account Subscriptions</HeadingSmall>
          So, let's say you have a sender account and the recipient accounts. So you create a CloudWatch Log subscription filter, and then this gets sent into a subscription destination, which is a virtual representant
          of the Kinesis Data Stream in the recipient accounts. Then you attach a destination access policy to allow the first account to actually send data into this destination. Then you create an IAM role in the recipient account,
          which has the permission to send records into your Kinesis Data Stream, and you make sure that this role can be assumed by the first account.
          <StyledImage src={CloudWatchCrossAccountSubscriptions} />
          <SubTitleSmall>CloudWatch Agent & CloudWatch Logs Agent</SubTitleSmall>
          Amazon CloudWatch provides two agents for collecting and sending data to CloudWatch: the CloudWatch Agent and the older CloudWatch Logs Agent. These agents are used to collect logs and metrics from Amazon EC2 instances,
          on-premises servers, and other sources.
          <HeadingSmall>CloudWatch Logs For EC2</HeadingSmall>
          
        </Text>
      </Container>
    </Wrapper>
  );
}

export default AWSMonitoringAudit;