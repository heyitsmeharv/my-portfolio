import ReactGA from 'react-ga';
import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { ChevronBackCircle } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import { AWSSVG, AWSRDSSVG } from '../../resources/styles/icons';

// components
import { StyledNavButton, StyledNavLink } from '../Button/Button';
import Table from '../../components/Table/Table';

// images
import AutoScaling from "../../resources/images/blog/AWSDatabases/db_auto_scaling.jpeg";
import ReadReplicas from "../../resources/images/blog/AWSDatabases/db_read_replica.jpeg";
import MultiAZ from "../../resources/images/blog/AWSDatabases/db_multi_az.jpeg";
import MultiAZBackground from "../../resources/images/blog/AWSDatabases/db_multi_az_background.jpeg";
import HighAvailability from "../../resources/images/blog/AWSDatabases/db_high_availability.jpeg";
import Proxy from "../../resources/images/blog/AWSDatabases/db_proxy.jpeg";
import AuroraCluster from "../../resources/images/blog/AWSDatabases/db_aurora_cluster.jpeg";
import AuroraCustomEndpoint from "../../resources/images/blog/AWSDatabases/db_aurora_custom_endpoint.jpeg";
import AuroraServerless from "../../resources/images/blog/AWSDatabases/db_aurora_serverless.jpeg";
import AuroraGlobal from "../../resources/images/blog/AWSDatabases/db_aurora_global.jpeg";
import AuroraMachineLearning from "../../resources/images/blog/AWSDatabases/db_aurora_ml.jpeg";
import ElastiCache from "../../resources/images/blog/AWSDatabases/db_elasticache.jpeg";
import ElastiCacheSecurity from "../../resources/images/blog/AWSDatabases/db_elasticache_security.jpeg";


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

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
`;

const SubTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
`;

const SubTitleSmall = styled.h1`
  font-size: 2rem;
  font-weight: bold;
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

const StyledCodeSpan = styled.code`
  background-color: #f1f1f1;
  color: crimson;
  padding: 0 5px;
  margin: 0 5px;
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

const Spacer = styled.br``

const AWSDatabases = () => {

  // analytics
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      ReactGA.pageview('/blog/aws-databases');
    }
  }, []);

  const columns = ['Redis', 'Memcached'];
  const data = [
    { Redis: 'Multi AZ with Auto-Failover', Memcached: 'Multi-node for partitioning of data (sharding)' },
    { Redis: 'Read Replicas to scale reads and have high availability', Memcached: 'No high availability (replication)' },
    { Redis: 'Data durability using AOF persistence', Memcached: 'Non persistent' },
    { Redis: 'Backup and restore features', Memcached: 'No backups or restore' },
    { Redis: 'Supports Sets and Sorted sets', Memcached: 'Multi-threaded architecture' },
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
          <Title>AWS Databases (RDS, Aurora, Elasticache)</Title>
          <IconWrapper>
            <Icon><AWSSVG /></Icon>
            <Icon><AWSRDSSVG /></Icon>
          </IconWrapper>
        </Flex>
        <Spacer />
        <Text>
          I'll be briefly covering databases which AWS provide as well as the key features that each service offer. I've also listed <StyledAnchor href="#skip">ports at the end</StyledAnchor> to be familiar with.
          <Spacer />
          <Spacer />

          <SubTitle id="rds">Amazon Relational Database Service (RDS)</SubTitle>
          This service allows you to create a database in the cloud. You can choose from the following:
          <StyledListItem>Microsoft SQL Server</StyledListItem>
          <StyledListItem>MySQL</StyledListItem>
          <StyledListItem>PostgreSQL</StyledListItem>
          <StyledListItem>MariaDB</StyledListItem>
          <StyledListItem>Oracle</StyledListItem>
          <Spacer />
          This service is managed by AWS which means you won't be able to SSH into the instance but you do benefit from a list of services:
          <StyledListItem>Automated provisioning, OS patching</StyledListItem>
          <StyledListItem>Continuous backups and point in time restore</StyledListItem>
          <StyledListItem>Monitoring dashboards</StyledListItem>
          <StyledListItem>Read replicas for improved read performance</StyledListItem>
          <StyledListItem>Multi AZ setup for disaster recovery</StyledListItem>
          <StyledListItem>Maintenance windows for upgrades</StyledListItem>
          <StyledListItem>Scaling capability</StyledListItem>
          <StyledListItem>Storage backed by EBS</StyledListItem>
          <Spacer />
          If you would like the option to have access to your RDS instance then there is 'RDS Custom' which allows you access to the underlying database and OS so you can configure and install patches yourself if that's a use case you require.
          <Spacer />
          <Spacer />
          <SubTitleSmall>Auto Scaling Storage</SubTitleSmall>
          This feature helps increase the storage on an RDS instance when it's running out of free space and it will do it automatically. You do have to set the 'Maximum Storage Threshold'. This feature can help with
          unpredictable workloads and supports all RDS database instances.
          <StyledImage src={AutoScaling} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Read Replicas</SubTitleSmall>
          RDS allows up to 15 read replicas within the same availability zone, across multiple availability zones or even cross region. It's also possible to take a replica read instance and make it the main RDS instance. The replication
          is <BoldText>ASYNC</BoldText>, meaning that the data will eventually be consistent. You can only query (SELECT) data from a read replica not do any manipulations such as INSERT, UPDATE, or DELETE queries.
          <StyledImage src={ReadReplicas} />
          It's important to note that there is a network cost for transferring data into another availability zone; the only use-case where that doesn't apply is if it's within the same region and your transferring to a read
          replica instance.
          <Spacer />
          <Spacer />
          <SubTitleSmall>RDS Multi AZ</SubTitleSmall>
          Multi AZ is mainly used for disaster recovery. The application will read/write to the main RDS instance via one DNS name, and that instance will be making a <BoldText>SYNC</BoldText> replication, meaning a real time exchange of
          information to a standby instance in another availability zone. That means every change that the application is sending to the main instance, the main instance will have to update the standby instance. If there is a problem with
          the main instance then there will be an automatic failover to the standby instance. This failover could happen due to network issues or instance/storage failure, if any of these events occur the standby instance would be promoted
          to the main instance. It's possible to setup read replicas for Multi AZ.
          <StyledImage src={MultiAZ} />
          There isn't any downtime for this process to happen, nor you need to modify your application as RDS handles this process in the background when configured. Here is a brief explanation of what happens.
          MultiAZBackground
          <StyledImage src={MultiAZBackground} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>RDS Backups</SubTitleSmall>
          RDS has the ability to backup instances either automatically or manually. You can do a full backup of the database daily with the ability to restore to any point in time from oldest to five minutes ago. Transaction logs are backed up by RDS every five minutes. There is a
          retention period up to 35 days for automatic backups but can last as long as you want if backed up manually. <BoldText>Automated backups can be disabled.</BoldText> Do note that a stopped RDS instance still costs money as you're still paying for the existing storage.
          If you plan on stopping it for a long period of time, you should snapshot and restore instead.
          <Spacer />
          <Spacer />
          <SubTitleSmall>RDS Restore</SubTitleSmall>
          RDS has the ability to restore an instance by creating a backup of the existing database which is stored in S3, that is then used on a new RDS instance running MySQL.
          <Spacer />
          <Spacer />
          <SubTitleSmall>RDS Proxy</SubTitleSmall>
          This allows apps to pool and share database connections already established. Instead of having individual applications connect to the RDS instance, they will instead connect to the proxy which will pool the connections together into less connections to the RDS instance.
          You would want to do this to improve the database efficiency by reducing the strain on the RDS resources such as CPU and RAM. This feature auto-scales and is multi-AZ so you won't need to manage capacity which in turn reduces the failover time by up to 66%. This
          feature enforces IAM authentication, so users can only connect to the RDS instance using the correct credentials, and it's never publicly available as it can only be accessed from a VPC. This supports RDS (MySQL, PostgreSQL, MariaDB, MSSQL Server) and Aurora (MySQL and PostgreSQL).
          <StyledImage src={Proxy} />
          <Spacer />
          <Spacer />
          <SubTitle id="aurora">Amazon Aurora</SubTitle>
          Aurora is a cloud optimized database which has significant performance improvements over RDS. It has a capacity of up to 128 TB (terabytes) and grows in increments of 10 GB (gigabytes). Aurora can have up to 15 replicas and it's failover
          is instantaneous (30 seconds) but it all comes at a cost as it's roughly 20% more than an RDS instance.
          <Spacer />
          <Spacer />
          <SubTitleSmall>Features of Aurora</SubTitleSmall>
          <StyledListItem>Automatic fail-over</StyledListItem>
          <StyledListItem>Backup and Recovery</StyledListItem>
          <StyledListItem>Isolation and Security</StyledListItem>
          <StyledListItem>Industry Compliance</StyledListItem>
          <StyledListItem>Push-button Scaling</StyledListItem>
          <StyledListItem>Automated Patching with Zero Downtime</StyledListItem>
          <StyledListItem>Advanced Monitoring</StyledListItem>
          <StyledListItem>Backtrack: restore data at any point in time without using backups</StyledListItem>
          <Spacer />
          Aurora has high availability and reading scaling as it copies the data across three availability zones with six copies and the storage is striped across 100's of volumes every time you write to the database.
          <StyledImage src={HighAvailability} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora DB Cluster</SubTitleSmall>
          Below shows how you would interact with an Aurora instance and how the clusters work. You will be given two endpoints, read and write, the write endpoint will always connect to the main instance which is the only instance to write to the storage,
          whereas the read endpoint connects to the read replicas.
          <StyledImage src={AuroraCluster} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora Custom Endpoints</SubTitleSmall>
          If you wish to run analytics on the database without effecting performance you can define a subset of Aurora instances to point towards a custom endpoint.
          <StyledImage src={AuroraCustomEndpoint} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora Serverless</SubTitleSmall>
          Aurora Serverless is an automated database which auto scales based on usage. This could be good for infrequent, intermittent or unpredictable workloads.
          <StyledImage src={AuroraServerless} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora Global</SubTitleSmall>
          Global Aurora has cross region read replicas which is good for disaster recovery. It takes less than a second to replicate data into another region.
          <StyledImage src={AuroraGlobal} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora Machine Learning</SubTitleSmall>
          You can integrate Aurora with machine learning services (AWS Sagemaker and AWS Comprehend) to make predictions with your applications via SQL. Good use cases for this would be to check for fraud detection and product recommendations.
          <StyledImage src={AuroraMachineLearning} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora Backups</SubTitleSmall>
          Aurora has the ability to backup instances either automatically or manually. You can do a full backup of the database daily with the ability to restore to any point in time. There is a
          retention period up to 35 days for automatic backups but can last as long as you want if backed up manually. <BoldText>Automated backups can't be disabled.</BoldText>
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora Restore</SubTitleSmall>
          Aurora has the ability to restore an instance by creating a backup of the existing database using Percona XtraBackup which is stored in S3, that is then used on a new Aurora cluster running MySQL.
          <Spacer />
          <Spacer />
          <SubTitleSmall>Aurora Cloning</SubTitleSmall>
          Another feature of Aurora is that you can clone an existing database cluster from an existing one. This is faster than snapshot & restore and uses copy-on-write protocol. This feature is useful for creating a staging environment
          from a production database without impacting the live service.
          <Spacer />
          <Spacer />
          <SubTitleSmall>RDS & Aurora Security</SubTitleSmall>
          Both RDS and Aurora have:
          <StyledListItem>At-rest encryption: Main and replica encryptions use AWS KMS which must be defined at launch time otherwise the main instance and read replicas can't be encrypted.</StyledListItem>
          <StyledListItem>In-flight encryption: TLS-ready by default, user the AWS TLS root certificates client-side.</StyledListItem>
          <StyledListItem>IAM Authentication: IAM roles to connect to your database instead of username/password.</StyledListItem>
          <StyledListItem>Security Groups: Control network access to your RDS/Aurora database.</StyledListItem>
          <StyledListItem>No SSH available: Except on RDS Custom.</StyledListItem>
          <StyledListItem>Audit Logs: Can be enabled and sent to CloudWatch Logs for longer retention. </StyledListItem>
          <Spacer />
          <Spacer />
          <SubTitle id="elasticache">Elasticache</SubTitle>
          ElastiCache is an in memory database which helps high performance and low latency (Redis or Memcached). This also helps makes applications stateless and reduces the load off of database for read intensive workloads. Like RDS and Aurora, AWS takes
          care of the OS maintenance/patching, optimisations, setup, configuration, monitoring, failure recovery and backups. Using ElastiCache does involve a lot of application code changes.
          <StyledImage src={ElastiCache} />
          <SubTitleSmall>Redis vs Memcached</SubTitleSmall>
          <Table columns={columns} data={data} />
          <Spacer />
          <Spacer />
          <SubTitleSmall>Cache Security</SubTitleSmall>
          Elasticache supports IAM Authentication for Redis - the IAM policies are only used for AWS API-level security.
          <StyledImage src={ElastiCacheSecurity} />
          <SubTitle id="skip">List of Ports</SubTitle>
          <StyledListItem>FTP: 21</StyledListItem>
          <StyledListItem>SSH: 22</StyledListItem>
          <StyledListItem>SFTP: 22</StyledListItem>
          <StyledListItem>HTTP: 80</StyledListItem>
          <StyledListItem>HTTPS: 443</StyledListItem>
          <StyledListItem>PostgreSQL: 5432</StyledListItem>
          <StyledListItem>MySQL: 3306</StyledListItem>
          <StyledListItem>Maria DB: 3306</StyledListItem>
          <StyledListItem>Oracle RDS: 1521</StyledListItem>
          <StyledListItem>MSSQL Server: 1433</StyledListItem>
          <StyledListItem>Aurora (PostgerSQL): 5432</StyledListItem>
          <StyledListItem>Aurora (MySQL): 3306</StyledListItem>

        </Text>
      </Container>
    </Wrapper>
  );
}

export default AWSDatabases;