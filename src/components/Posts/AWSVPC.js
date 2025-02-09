import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

// helpers
import { logPageView } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { ChevronBackCircle } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import { AWSSVG, AWSVPCSVG } from '../../resources/styles/icons';

// components
import { StyledNavButton, StyledNavLink } from '../Button/Button';
import Table from '../../components/Table/Table';

// images
import VPCOctects from "../../resources/images/blog/AWSVPC/vpc_octets_memo.jpeg"
import VPCDefault from "../../resources/images/blog/AWSVPC/vpc_default.jpeg"
import VPCSubnets from "../../resources/images/blog/AWSVPC/vpc_subnets.jpeg"
import VPCInternetGateway from "../../resources/images/blog/AWSVPC/vpc_internet_gateway.jpeg"
import VPCBastionHost from "../../resources/images/blog/AWSVPC/vpc_bastion_host.jpeg"
import VPCNATGateWay from "../../resources/images/blog/AWSVPC/vpc_nat_gateway.jpeg"
import VPCNATGateWayHA from "../../resources/images/blog/AWSVPC/vpc_nat_gateway_ha.jpeg"
import VPCSGNACLS from "../../resources/images/blog/AWSVPC/vpc_sg_nacls.jpeg"
import VPCNACL from "../../resources/images/blog/AWSVPC/vpc_nacl.jpeg"
import VPCEphemeralPorts from "../../resources/images/blog/AWSVPC/vpc_ephemeral_ports.jpeg"
import VPCNACLEphemeralPorts from "../../resources/images/blog/AWSVPC/vpc_nacl_ephemeral_ports.jpeg"
import VPCPeering from "../../resources/images/blog/AWSVPC/vpc_peering.jpeg"
import VPCEndpoint from "../../resources/images/blog/AWSVPC/vpc_endpoint.jpeg"
import VPCEndpointPrivateLink from "../../resources/images/blog/AWSVPC/vpc_endpoint_private_link.jpeg"
import VPCGatewayEndpoint from "../../resources/images/blog/AWSVPC/vpc_gateway_endpoints.jpeg"
import VPCInterfaceEndpoint from "../../resources/images/blog/AWSVPC/vpc_interface_endpoints.jpeg"
import VPCFlowLogSyntax from "../../resources/images/blog/AWSVPC/vpc_flow_log_syntax.jpeg"
import VPCFlowLogs from "../../resources/images/blog/AWSVPC/vpc_flow_logs.jpeg"
import VPCSiteToSiteVPN from "../../resources/images/blog/AWSVPC/vpc_site_to_site_vpn.jpeg"
import VPCSiteToSitePublicPrivateIP from "../../resources/images/blog/AWSVPC/vpc_site_to_site_public_private_ip.jpeg"
import VPCSiteToSiteCloudHub from "../../resources/images/blog/AWSVPC/vpc_site_to_site_cloud_hub.jpeg"
import VPCDirectConnect from "../../resources/images/blog/AWSVPC/vpc_direct_connect.jpeg"
import VPCDirectConnectGateWay from "../../resources/images/blog/AWSVPC/vpc_direct_connect_gateway.jpeg"
import VPCDirectConnectEncryption from "../../resources/images/blog/AWSVPC/vpc_direct_connect_encryption.jpeg"
import VPCDirectConnectResilience from "../../resources/images/blog/AWSVPC/vpc_direct_connect_resilience.jpeg"
import VPCDirectConnectBackup from "../../resources/images/blog/AWSVPC/vpc_direct_connect_backup.jpeg"
import VPCDX from "../../resources/images/blog/AWSVPC/vpc_dx.jpeg"
import VPCTransitGateway from "../../resources/images/blog/AWSVPC/vpc_transit_gateway.jpeg"
import VPCTransitGatewayECMP from "../../resources/images/blog/AWSVPC/vpc_transit_gateway_ecmp.jpeg"
import VPCTransitGatewayMA from "../../resources/images/blog/AWSVPC/vpc_transit_gateway_multiple_accounts.jpeg"
import VPCTransitGatewayOverview from "../../resources/images/blog/AWSVPC/vpc_transit_gateway_overview.jpeg"
import VPCTrafficMirroring from "../../resources/images/blog/AWSVPC/vpc_traffic_mirroring.jpeg"
import VPCIPv6 from "../../resources/images/blog/AWSVPC/vpc_ipv6.jpeg"
import VPCEgressOnlyIG from "../../resources/images/blog/AWSVPC/vpc_egress_only_internet_gateway.jpeg"
import VPCIPv6Routing from "../../resources/images/blog/AWSVPC/vpc_ipv6_routing.jpeg"
import VPCNetworkingCosts from "../../resources/images/blog/AWSVPC/vpc_networking_costs.jpeg"
import VPCEgressTrafficNetworkingCosts from "../../resources/images/blog/AWSVPC/vpc_egress_traffic_networking_costs.jpeg"
import VPCNetworkFirewall from "../../resources/images/blog/AWSVPC/vpc_network_firewall.jpeg"

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

const AWSVPC = () => {

  // analytics
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      logPageView();
    }
  }, []);

  const columns = ['', 'NAT Gateway', 'NAT Instance'];
  const data = [
    { '': 'Availability', 'NAT Gateway': 'Highly available within AZ (create in another AZ)', 'NAT Instance': 'Use a script to manage failover between instances' },
    { '': 'Bandwidth', 'NAT Gateway': 'Up to 100GBps', 'NAT Instance': 'Depends on EC2 instance type' },
    { '': 'Maintenance', 'NAT Gateway': 'Managed by AWS', 'NAT Instance': 'Managed by you' },
    { '': 'Cost', 'NAT Gateway': 'Per hour & amount of data transferred', 'NAT Instance': 'Per hour, EC2 instance type and size + network costs' },
    { '': 'Public IPv4', 'NAT Gateway': '️✔️', 'NAT Instance': '️✔️' },
    { '': 'Private IPv4', 'NAT Gateway': '️✔️', 'NAT Instance': '️✔️' },
    { '': 'Security Groups', 'NAT Gateway': '❌', 'NAT Instance': '️✔️' },
    { '': 'Use as Bastion Host', 'NAT Gateway': '❌', 'NAT Instance': '️✔️' },
  ];

  const columns2 = ['Security Group', 'NACL'];
  const data2 = [
    { 'Security Group': 'Operates at the instance level', 'NACL': 'Operates at the subnet level' },
    { 'Security Group': 'Supports allow rules only', 'NACL': 'Supports allow rules and deny rules' },
    { 'Security Group': 'Stateful: return traffic is automatically allowed, regardless of any rules', 'NACL': 'Stateless: return traffic must be explicitly allowed by rules (ephemeral ports)' },
    { 'Security Group': 'All rules are evaluated before deciding whether to allow traffic', 'NACL': 'Rules are evaluated in order (lowest to highest) when deciding whether to allow traffic, first match wins' },
    { 'Security Group': 'Applies to an EC2 instance when specified by someone', 'NACL': `Automatically applies to all EC2 instances in the subnet that it's associated with` },
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
          <Title>Amazon Virtual Private Cloud (VPC)</Title>
          <IconWrapper>
            <Icon><AWSSVG /></Icon>
            <Icon><AWSVPCSVG /></Icon>
          </IconWrapper>
        </Flex>
        <Spacer />
        <Text>
          In this post we'll be diving into Amazon Virtual Private Cloud (VPC).
          <StyledAnchor href="#vpc-introduction"><StyledListItem>Amazon Virtual Private Network</StyledListItem></StyledAnchor>
          <StyledAnchor href="#cidr"><StyledListItem>Classless Inter-Domain Routing - CIDR</StyledListItem></StyledAnchor>
          <StyledAnchor href="#vpc-in-aws"><StyledListItem>VPC in AWS</StyledListItem></StyledAnchor>
          <StyledAnchor href="#subnets"><StyledListItem>Subnets</StyledListItem></StyledAnchor>
          <StyledAnchor href="#vpc-igw"><StyledListItem>Internet Gateway (IGW)</StyledListItem></StyledAnchor>
          <StyledAnchor href="#vpc-bastion-hosts"><StyledListItem>Bastion Hosts</StyledListItem></StyledAnchor>
          <StyledAnchor href="#nat-gateway"><StyledListItem>NAT Gateway</StyledListItem></StyledAnchor>
          <StyledAnchor href="#sg-nacls"><StyledListItem>Security Groups & NACLs</StyledListItem></StyledAnchor>
          <StyledAnchor href="#vpc-peering"><StyledListItem>VPC Peering</StyledListItem></StyledAnchor>
          <StyledAnchor href="#vpc-endpoint"><StyledListItem>VPC Endpoint</StyledListItem></StyledAnchor>
          <StyledAnchor href="#vpc-flow-logs"><StyledListItem>VPC Flow Logs</StyledListItem></StyledAnchor>
          <StyledAnchor href="#site-to-site-vpn"><StyledListItem>Site-to-Site VPN</StyledListItem></StyledAnchor>
          <StyledAnchor href="#direct-connect"><StyledListItem>Direct Connect (DX)</StyledListItem></StyledAnchor>
          <StyledAnchor href="#transit-gateway"><StyledListItem>Transit Gateway</StyledListItem></StyledAnchor>
          <StyledAnchor href="#traffic-mirroring"><StyledListItem>Traffic Mirroring</StyledListItem></StyledAnchor>
          <StyledAnchor href="#IPv6"><StyledListItem>IPv6 in VPC</StyledListItem></StyledAnchor>
          <StyledAnchor href="#networking-costs"><StyledListItem>Networking Costs in AWS</StyledListItem></StyledAnchor>
          <StyledAnchor href="#network-protection"><StyledListItem>AWS Network Firewall</StyledListItem></StyledAnchor>
          <StyledAnchor href="#vpc-summary"><StyledListItem>VPC Summary</StyledListItem></StyledAnchor>
          <Spacer />
          <SubTitle id="vpc-introduction">Amazon Virtual Private Cloud (VPC)</SubTitle>
          A Virtual Private Cloud (VPC) is a logically isolated section of the AWS cloud where you can launch AWS resources, such as EC2 instances, within a virtual network that you define. A VPC allows
          you to customize your network environment, including selecting your own IP address range, creating subnets, configuring route tables, and setting up gateways.
          <Spacer />
          <StyledImage src={VPCTransitGatewayOverview} />
          <Spacer />
          <SubTitle id="cidr">Classless Inter-Domain Routing - CIDR</SubTitle>
          CIDR, or Classless Inter-Domain Routing, is a method used for allocating IP addresses and routing internet traffic
          <StyledListItem><BoldTextSmall>IP Addressing</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>IP addresses are numerical labels assigned to devices connected to a network, like computers, servers, or mobile devices. They come in two versions: IPv4 and IPv6. CIDR works with both, but it's most commonly associated with IPv4.</StyledListItemIndent>
          <Spacer />
          <StyledListItem><BoldTextSmall>CIDR Notation</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>CIDR notation is a way to specify IP addresses and their associated routing prefix. It consists of an IP address, followed by a slash (/), and then a number that represents the number of significant bits in the network portion of the address.</StyledListItemIndent>
          <StyledListItemIndent>For example: 192.168.1.0/24</StyledListItemIndent>
          <StyledListItemIndentExtra>192.168.1.0 is the IP address.</StyledListItemIndentExtra>
          <StyledListItemIndentExtra>/24 indicates that the first 24 bits of the IP address are the network part, leaving the remaining bits for host addresses.</StyledListItemIndentExtra>
          <Spacer />
          <StyledListItem><BoldTextSmall>Subnetting</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>CIDR allows for the creation of subnets by varying the length of the network prefix. It allows part of the underlying IP to get additional next values from the base IP.</StyledListItemIndent>
          <StyledListItemIndent>It's possible to split IP addresses from /0 to /32</StyledListItemIndent>
          <StyledListItemIndentExtra>/0 - 0.0.0.0</StyledListItemIndentExtra>
          <StyledListItemIndentExtra>/8 - 255.0.0.0</StyledListItemIndentExtra>
          <StyledListItemIndentExtra>/16 - 255.255.0.0</StyledListItemIndentExtra>
          <StyledListItemIndentExtra>/24 - 255.255.255.0</StyledListItemIndentExtra>
          <StyledListItemIndentExtra>/32 - 255.255.255.255</StyledListItemIndentExtra>
          <StyledListItemIndent>For example</StyledListItemIndent>
          <StyledListItemIndentExtra>CIDR block 192.168.1.0/24 provides 256 IP addresses (from 192.168.1.0 to 192.168.1.255).</StyledListItemIndentExtra>
          <StyledListItemIndentExtra>If you use 192.168.1.0/25, it splits the range into two smaller blocks, each with 128 IP addresses (192.168.1.0 to 192.168.1.127 and 192.168.1.128 to 192.168.1.255).</StyledListItemIndentExtra>
          <Spacer />
          <StyledListItem><BoldTextSmall>Efficient IP Address Allocation</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>CIDR helps reduce the waste of IP addresses by allowing network administrators to allocate IP blocks more precisely according to need, rather than being forced to use large, predefined blocks.</StyledListItemIndent>
          <StyledListItemIndent>For example, instead of giving a company an entire Class B network (with 65,536 addresses) when they might only need 2,000 addresses, CIDR allows them to get exactly the number they need, such as a /21 block with 2,048 addresses.</StyledListItemIndent>
          <Spacer />
          <StyledListItem><BoldTextSmall>Routing</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>CIDR also simplifies routing by allowing multiple IP addresses or networks to be aggregated into a single routing entry, a process known as "route aggregation" or "supernetting."</StyledListItemIndent>
          <StyledListItemIndent>For instance, multiple networks like 192.168.0.0/24 and 192.168.1.0/24 can be combined into a single 192.168.0.0/23 route, reducing the size of routing tables.</StyledListItemIndent>
          <Spacer />
          <SubTitleSmall>Understanding CIDR - Subnet Mask</SubTitleSmall>
          <StyledImage src={VPCOctects} />
          192.168.0.0 / 32 => allows for 1 IP => 192.168.0.0
          <Spacer />
          192.168.0.0 / 31 => allows for 2 IP 192.168.0.0 => 192.168.0.1
          <Spacer />
          192.168.0.0 / 30 => allows for 4 IP 192.168.0.0 => 192.168.0.3
          <Spacer />
          192.168.0.0 / 29 => allows for 8 IP 192.168.0.0 => 192.168.0.7
          <Spacer />
          192.168.0.0 / 28 => allows for 16 IP 192.168.0.0 => 192.168.0.15
          <Spacer />
          192.168.0.0 / 27 => allows for 32 IP 192.168.0.0 => 192.168.0.31
          <Spacer />
          192.168.0.0 / 26 => allows for 64 IP 192.168.0.0 => 192.168.0.63
          <Spacer />
          192.168.0.0 / 25 => allows for 128 IP 192.168.0.0 => 192.168.0.127
          <Spacer />
          192.168.0.0 / 24 => allows for 256 IP 192.168.0.0 => 192.168.0.255
          <Spacer />
          192.168.0.0 / 16 => allows for 65,536 IP 192.168.0.0 => 192.168.255.255
          <Spacer />
          192.168.0.0 / 0 => allows for ALL IPs 0.0.0.0 => 255.255.255.255
          <Spacer />
          <SubTitleSmall>Public vs Private IP (IPv4)</SubTitleSmall>
          The Internet Assigned Numbers Authority (IANA) established certain blocks of IPv4 addresses for the use of private (LAN) and public (Internet) addresses.
          <StyledListItem><BoldText>Private IP</BoldText> can only have certain values:</StyledListItem>
          <StyledListItemIndent>10.0.0.0 - 10.255.255.255 (10.0.0.0/8) -> Big networks</StyledListItemIndent>
          <StyledListItemIndent>172.16.0.0 - 172.31.255.255 (172.16.0.0/12) -> AWS default VPC range</StyledListItemIndent>
          <StyledListItemIndent>192.168.0.0 - 192.168.255.255 (192.168.0.0/16) -> Home networks</StyledListItemIndent>
          <Spacer />
          <StyledListItem><BoldText>Public IP</BoldText> The rest of the IP addresses on the internet are public.</StyledListItem>
          <Spacer />
          <SubTitle id="vpc-in-aws">VPC in AWS</SubTitle>
          <StyledListItem>You can have multiple VPCs in an AWS region (max 5 per region).</StyledListItem>
          <StyledListItem>Max CIDR per VPC is 5, for each CIDR:</StyledListItem>
          <StyledListItemIndent>Min size is /28 (16 IP addresses)</StyledListItemIndent>
          <StyledListItemIndent>Max size is /16 (65536 IP addresses)</StyledListItemIndent>
          <StyledListItem>Because VPC is private, only the private IPv4 ranges are allowed:</StyledListItem>
          <StyledListItemIndent>10.0.0.0 - 10.255.255.255 (10.0.0.0/8)</StyledListItemIndent>
          <StyledListItemIndent>172.16.0.0 - 172.31.255.255 (172.16.0.0/12)</StyledListItemIndent>
          <StyledListItemIndent>192.168.0.0 - 192.168.255.255 (192.168.0.0/16)</StyledListItemIndent>
          <Spacer />
          <StyledImage src={VPCDefault} />
          <Spacer />
          <SubTitle id="subnets">Subnets</SubTitle>
          You can divide your VPC into subnets, which are subsets of your VPC's IP address range. Subnets can be public (accessible from the internet) or private (isolated from the internet).
          <StyledListItem>AWS Reserves 5 IP addresses (first 4 and the last 1) in each subnet.</StyledListItem>
          <StyledListItemIndent>10.0.0.0 - Network Address</StyledListItemIndent>
          <StyledListItemIndent>10.0.0.1 - reserved by AWS for the VPC router</StyledListItemIndent>
          <StyledListItemIndent>10.0.0.2 - reserved by AWS for mapping to Amazon provided DNS</StyledListItemIndent>
          <StyledListItemIndent>10.0.0.3 - reserved by AWS for future use</StyledListItemIndent>
          <StyledListItemIndent>10.0.0.255 - Network Broadcast Address. AWS does not support broadcast in a VPC, therefore the address is reserved.</StyledListItemIndent>
          <Spacer />
          Make sure you take into account the reserved IP addresses when selecting the CIDR ranges. For example if you need 29 IP addresses for EC2 instances:
          <StyledListItem>You can't choose a subnet of size /27 (32 IP addresses, 32 - 5 = 27)</StyledListItem>
          <StyledListItem>You need to choose a subnet of size /26 (64 IP addresses, 64 - 5 = 59)</StyledListItem>
          <Spacer />
          <StyledImage src={VPCSubnets} />
          <Spacer />
          <SubTitle id="vpc-igw">Internet Gateway (IGW)</SubTitle>
          For your VPC to have internet access, you can attach an Internet Gateway, which enables communication between instances in your VPC and the internet.
          <StyledListItem>Allows resources (e.g. EC2 instances) in a VPC to connect to the internet.</StyledListItem>
          <StyledListItem>Must be created separately from the VPC.</StyledListItem>
          <StyledListItem>Only one VPC can be attached to one IGW and vice versa.</StyledListItem>
          <StyledListItem>Internet Gateways on their own do not allow internet access - Route tables must be used.</StyledListItem>
          <Spacer />
          <StyledImage src={VPCInternetGateway} />
          <Spacer />
          <SubTitle id="vpc-bastion-hosts">Bastion Hosts</SubTitle>
          A bastion host is a specialized server used to provide controlled, secure access to a private network from an external network, typically the internet. It acts as a gateway
          between the public and private network, often used in environments like AWS where private instances in a Virtual Private Cloud (VPC) need to be accessed securely from outside the network.
          <StyledListItem>We can use a Bastion Host to SSH into our private EC2 instances.</StyledListItem>
          <StyledListItem>The Bastion is in the public subnet which is then connected to all other private subnets.</StyledListItem>
          <StyledListItem>Bastion Host security group must allow inbound from the internet on port 22 from restricted CIDR.</StyledListItem>
          <StyledListItem>Security Group of the EC2 instances must allow the Security Group of the Bastion Host, or the private IP of the Bastion host.</StyledListItem>
          <Spacer />
          <StyledImage src={VPCBastionHost} />
          <Spacer />
          <SubTitle id="nat-gateway">NAT Gateway</SubTitle>
          This allows instances in a private subnet to access the internet without exposing the instances themselves to incoming internet traffic.
          <StyledListItem>Pay per hour for usage and bandwidth.</StyledListItem>
          <StyledListItem>NAT Gateways are created in a specific availability zone and uses an Elastic IP.</StyledListItem>
          <StyledListItem>Can't be used by an EC2 instance in the same subnet (only from other subnets).</StyledListItem>
          <StyledListItem>Requires a IGW (Private Subnet => NATGW => IGW).</StyledListItem>
          <StyledListItem>No Security Groups to manage.</StyledListItem>
          <Spacer />
          <StyledImage src={VPCNATGateWay} />
          <Spacer />
          <SubTitleSmall>NAT Gateway with High Availability</SubTitleSmall>
          To increase fault tolerance you can create multiple NAT Gateways across multiple AZs.
          <Spacer />
          <StyledImage src={VPCNATGateWayHA} />
          <Spacer />
          <SubTitleSmall>NAT Gateway vs NAT Instance</SubTitleSmall>
          <Table columns={columns} data={data} />
          <Spacer />
          <SubTitle id="sg-nacls">Security Groups & NACLs</SubTitle>
          A Network Access Control List (NACL) in AWS is a security layer that acts as a virtual firewall for controlling inbound and outbound traffic at the subnet level within a Virtual Private Cloud (VPC). NACLs provide an
          additional layer of security by allowing or denying specific traffic to and from subnets in a VPC.
          <Spacer />
          <SubTitleSmall>Subnet-Level Control</SubTitleSmall>
          NACLs operate at the subnet level, meaning they control traffic entering and leaving each subnet in your VPC. Every subnet in a VPC must be associated with a NACL.
          If you don't explicitly associate a subnet with a NACL, it automatically associates with the VPC's default NACL.
          <Spacer />
          <SubTitleSmall>Stateless</SubTitleSmall>
          NACLs are stateless, meaning they evaluate each request independently, without remembering any previous requests. This means that if you allow inbound traffic,
          you must also explicitly allow the corresponding outbound traffic if needed, and vice versa.
          <Spacer />
          <SubTitleSmall>Rules and Priorities</SubTitleSmall>
          NACLs consist of numbered rules that are evaluated in order, starting from the lowest number. Each rule specifies whether to allow or deny traffic based on:
          <StyledListItem>Protocol (e.g., TCP, UDP, ICMP)</StyledListItem>
          <StyledListItem>Source and destination IP address</StyledListItem>
          <StyledListItem>Port range</StyledListItem>
          <StyledListItem>Traffic direction (inbound or outbound)</StyledListItem>
          <Spacer />
          <SubTitleSmall>Default NACL</SubTitleSmall>
          The default NACL allows all inbound and outbound traffic. If you create a custom NACL, it initially denies all traffic until you explicitly add rules to allow specific traffic.
          <Spacer />
          <SubTitleSmall>Deny by Default</SubTitleSmall>
          When no rule matches the traffic, the default action is to deny that traffic. This makes NACLs a restrictive layer of security, only allowing explicitly permitted traffic.
          <Spacer />
          <SubTitleSmall>Multiple Rules</SubTitleSmall>
          You can define multiple rules within a NACL, and they are evaluated in the order of the rule number. The first rule that matches the traffic takes precedence, so careful planning of rule order is important.
          <Spacer />
          <StyledImage src={VPCNACL} />
          <Spacer />
          <SubTitleSmall>Differences Between NACLs and Security Groups:</SubTitleSmall>
          <StyledListItem><BoldTextSmall>Scope:</BoldTextSmall> NACLs are applied at the subnet level, affecting all instances within the subnet, whereas security groups are applied at the instance level.</StyledListItem>
          <StyledListItem><BoldTextSmall>Statefulness:</BoldTextSmall> NACLs are stateless, requiring separate rules for inbound and outbound traffic. Security groups are stateful, meaning that if you allow traffic in one direction, the response traffic is automatically allowed.</StyledListItem>
          <StyledListItem><BoldTextSmall>Rule Evaluation:</BoldTextSmall> NACLs evaluate rules in order, from lowest to highest numbered rule, and stop at the first match. Security groups evaluate all rules without a specific order.</StyledListItem>
          <Spacer />
          <Table columns={columns2} data={data2} />
          <Spacer />
          <StyledImage src={VPCSGNACLS} />
          <Spacer />
          <SubTitleSmall>Ephemeral Ports</SubTitleSmall>
          Ephemeral ports are temporary, short-lived ports automatically assigned by a host's operating system for client-side communication with a server. These ports are used when a client initiates a connection to a server, typically in the context of TCP/IP or UDP protocols. Once the connection
          is closed, the ephemeral port is returned to the pool of available ports and can be reused for future connections.
          <StyledListItem>Clients connect on a defined port, and expect a response on an ephemeral port.</StyledListItem>
          <StyledListItem>Different Operating Systems use different port ranges, examples:</StyledListItem>
          <StyledListItemIndent>IANA & Windows 10 -> 49152 - 65535</StyledListItemIndent>
          <StyledListItemIndent>Linux -> 32768 - 60999</StyledListItemIndent>
          <StyledImage src={VPCEphemeralPorts} />
          Here is an overview of how Ephemeral ports work with NACLs
          <StyledImage src={VPCNACLEphemeralPorts} />
          <SubTitle id="vpc-peering">VPC Peering</SubTitle>
          VPC Peering in AWS is a networking connection that allows you to route traffic between two Virtual Private Clouds (VPCs) using private IP addresses, as if they were part of the same network. VPC peering is often used to enable communication between VPCs within the same AWS account or across
          different AWS accounts, without using public internet or a VPN.
          <Spacer />
          <SubTitleSmall>Cross-Account and Cross-Region Peering</SubTitleSmall>
          You can establish a VPC Peering connection between VPCs in different AWS accounts, enabling secure cross-account communication. Additionally, AWS supports cross-region peering, allowing VPCs in different regions to connect to each other.
          <Spacer />
          <SubTitleSmall>One-to-One Connection</SubTitleSmall>
          VPC Peering is a one-to-one connection between two VPCs. Each VPC Peering connection is limited to two VPCs, but you can create multiple peering connections if you need to connect more than two VPCs.
          <Spacer />
          <SubTitleSmall>No Transitive Peering</SubTitleSmall>
          VPC Peering connections are non-transitive, meaning that if VPC A is peered with VPC B, and VPC B is peered with VPC C, VPC A cannot automatically communicate with VPC C. Each peering connection must be explicitly established.
          <Spacer />
          <SubTitleSmall>No Overlapping CIDR Blocks</SubTitleSmall>
          The IP address ranges (CIDR blocks) of the VPCs involved in the peering connection must not overlap. Overlapping IP ranges would cause routing conflicts and are not allowed in VPC peering.
          <Spacer />
          <SubTitleSmall>Security Controls</SubTitleSmall>
          Even with a VPC Peering connection, you can still use security groups and network access control lists (NACLs) to control the flow of traffic between the VPCs, ensuring that only authorized communication occurs.
          <Spacer />
          <StyledImage src={VPCPeering} />
          <Spacer />
          <SubTitle id="vpc-endpoint">VPC Endpoint</SubTitle>
          A VPC Endpoint in AWS is a feature that enables you to privately connect your VPC to supported AWS services and VPC endpoint services (hosted by other AWS accounts) without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect. VPC Endpoints allow you to establish
          secure connections to these services within the AWS network, ensuring that traffic between your VPC and these services does not leave the AWS network.
          <Spacer />
          <StyledImage src={VPCEndpoint} />
          <Spacer />
          <StyledImage src={VPCEndpointPrivateLink} />
          <Spacer />
          <SubTitleSmall>Types of Endpoints</SubTitleSmall>
          <StyledListItem><BoldTextSmall>Interface Endpoints</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>Interface Endpoints use AWS PrivateLink and create an Elastic Network Interface (ENI) with a private IP address in your subnet. This ENI serves as an entry point for traffic destined for a specific service.</StyledListItemIndent>
          <StyledListItemIndent>Interface Endpoints are used to connect to services like Amazon S3, AWS Systems Manager, DynamoDB, and many others.</StyledListItemIndent>
          <StyledListItemIndent>They provide private connectivity to these services while using the standard AWS VPC security mechanisms such as security groups and NACLs.</StyledListItemIndent>
          <StyledListItemIndent>£ per hour + £ per GB of data processed.</StyledListItemIndent>
          <Spacer />
          <StyledImage src={VPCInterfaceEndpoint} />
          <Spacer />
          <StyledListItem><BoldTextSmall>Gateway Endpoints</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>Gateway Endpoints are used specifically for S3 and DynamoDB. They add an entry in your route table, which directs traffic destined for these services through the endpoint without requiring an ENI.</StyledListItemIndent>
          <StyledListItemIndent>Gateway Endpoints are highly available, automatically scaling as needed without requiring additional configuration or maintenance.</StyledListItemIndent>
          <StyledListItemIndent>Free.</StyledListItemIndent>
          <Spacer />
          <StyledImage src={VPCGatewayEndpoint} />
          <Spacer />
          <SubTitle id="vpc-flow-logs">VPC Flow Logs</SubTitle>
          VPC Flow Logs are a feature in AWS that enables you to capture and monitor the network traffic going to and from network interfaces in your VPC. Flow logs can be sent to S3, CloudWatch Logs and Kinesis Data Firehose.
          <StyledImage src={VPCFlowLogSyntax} />
          <StyledImage src={VPCFlowLogs} />
          <Spacer />
          <SubTitle id="site-to-site-vpn">Site-to-Site VPN</SubTitle>
          A site-to-site VPN (Virtual Private Network) connection is a secure connection that allows different networks, typically in different geographical locations, to communicate with each other over the internet as if
          they were part of the same local network.
          <StyledImage src={VPCSiteToSiteVPN} />
          <Spacer />
          <SubTitleSmall>Components of a Site-to-Site VPN</SubTitleSmall>
          <StyledListItem><BoldTextSmall>Virtual Private Gateway (VGW)</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>VPN concentrator on the AWS side of the VPN connection.</StyledListItemIndent>
          <StyledListItemIndent>VGW is created and attached to the VPC from which you want to create the Site-to-Site VPN connection.</StyledListItemIndent>
          <StyledListItemIndent>Possible to customise the ASN (Autonomous System Number).</StyledListItemIndent>
          <Spacer />
          <StyledListItem><BoldTextSmall>Customer Gateway (CGW)</BoldTextSmall></StyledListItem>
          <StyledListItemIndent>Software application or physical device on customer side of VPN connection.</StyledListItemIndent>
          <Spacer />
          <SubTitleSmall>Site-to-Site VPN Connections</SubTitleSmall>
          If the Customer Gateway has a private IP address you can use the public IP of the NAT device, otherwise you can use the public IP address of the Customer Gateway for the site-to-site connection.
          <StyledListItemIndent>Enable Route Propagation for the VPG in the route table that is associated with your subnets.</StyledListItemIndent>
          <StyledListItemIndent>If you need to ping your EC2 instance from on-premise, make sure you add ICMP protocol on the inbound of your security group.</StyledListItemIndent>
          <StyledImage src={VPCSiteToSitePublicPrivateIP} />
          <Spacer />
          <SubTitleSmall>VPN CloudHub</SubTitleSmall>
          AWS VPN CloudHub is a feature of the AWS Site-to-Site VPN service that allows you to securely connect multiple remote sites (such as branch offices) to each other and to your AWS environment using a hub-and-spoke model. It's
          particularly useful when you need to connect multiple sites that do not have direct connections to each other, creating a simple, cost-effective, and scalable solution for multi-site connectivity.
          <Spacer />
          <StyledImage src={VPCSiteToSiteCloudHub} />
          <Spacer />
          To set it up, connect multiple VPN connections on the same VGW, setup dynamic routing and configure route tables.
          <Spacer />
          <SubTitle id="direct-connect">Direct Connect (DX)</SubTitle>
          AWS Direct Connect is a cloud service solution that enables you to establish a dedicated, private network connection between your on-premises data center or office and AWS. This connection bypasses the public internet,
          providing a more reliable and consistent network experience with higher bandwidth and lower latency compared to internet-based connections.
          <Spacer />
          <StyledImage src={VPCDirectConnect} />
          <Spacer />
          If you want to setup a Direct Connect to one or more VPCs in different regions (same account), you must use a Direct Connect Gateway.
          <Spacer />
          <StyledImage src={VPCDirectConnectGateWay} />
          <Spacer />
          <SubTitleSmall>Connection Types</SubTitleSmall>
          <StyledListItem><BoldTextSmall>Dedicated Connections</BoldTextSmall>: 1Gbps, 10Gbps and 100Gbps capacity</StyledListItem>
          <StyledListItemIndent>Physical ethernet port dedicated to a customer.</StyledListItemIndent>
          <StyledListItemIndent>Request made to AWS first, then completed by AWS Direct Connect Partners.</StyledListItemIndent>
          <Spacer />
          <StyledListItem><BoldTextSmall>Hosted Connections</BoldTextSmall>: 50Mbps, 500Mbps to 10Gbps</StyledListItem>
          <StyledListItemIndent>Connection request made via AWS Direct Connect Partners.</StyledListItemIndent>
          <StyledListItemIndent>Capacity added or removed on demand.</StyledListItemIndent>
          <Spacer />
          Lead times are often longer than one month to establish a new connection.
          <Spacer />
          <SubTitleSmall>Encryption</SubTitleSmall>
          Data in transit is not encrypted but is private. If you want to add an extra layer of security you should use Direct Connect with a VPN.
          <Spacer />
          <StyledImage src={VPCDirectConnectEncryption} />
          <Spacer />
          <SubTitleSmall>Resiliency</SubTitleSmall>
          Here are two architecture designs on how to implement resiliency for critical workloads.
          <Spacer />
          <StyledImage src={VPCDirectConnectResilience} />
          <Spacer />
          <SubTitleSmall>Site-to-Site VPN connection as a backup</SubTitleSmall>
          In case Direct Connect fails, you can set up a backup Direct Connect connection which would be expensive, or a Site-to-Site VPN connection.
          <Spacer />
          <StyledImage src={VPCDirectConnectBackup} />
          <Spacer />
          <SubTitleSmall>Direct Connection Overview</SubTitleSmall>
          <Spacer />
          <StyledImage src={VPCDX} />
          <Spacer />
          <SubTitle id="transit-gateway">Transit Gateway</SubTitle>
          AWS Transit Gateway (TGW) is a service that simplifies the management of network connectivity at scale by acting as a central hub to connect Amazon Virtual Private Clouds (VPCs), on-premises networks,
          and even other AWS services. It effectively centralizes the management of network traffic within and between these different environments. Supports IP Multicast which isn't supported by any other AWS Service.
          <Spacer />
          <StyledImage src={VPCTransitGateway} />
          <Spacer />
          <SubTitleSmall>Site-to-Site VPN ECMP</SubTitleSmall>
          ECMP (Equal Cost Multi-Path) routing is a routing strategy to allow for forwarding packets over multiple best paths increasing the bandwidth of your connection to AWS.
          <Spacer />
          <StyledImage src={VPCTransitGatewayECMP} />
          <Spacer />
          <SubTitleSmall>Direct Connect between Multiple Accounts</SubTitleSmall>
          <Spacer />
          <StyledImage src={VPCTransitGatewayMA} />
          <Spacer />
          <SubTitleSmall>Transit Gateway Overview</SubTitleSmall>
          <Spacer />
          <StyledImage src={VPCTransitGatewayOverview} />
          <Spacer />
          <SubTitle id="traffic-mirroring">Traffic Mirroring</SubTitle>
          AWS Traffic Mirroring is a feature within Amazon Virtual Private Cloud (VPC) that allows you to capture and inspect network traffic flowing to and from the Elastic Network Interfaces (ENIs)
          of your Amazon EC2 instances. It helps you improve security, troubleshoot issues, and monitor your network more effectively by providing the ability to mirror (or copy) the traffic to security appliances,
          monitoring tools, or for analysis by other services.
          <Spacer />
          <StyledImage src={VPCTrafficMirroring} />
          <Spacer />
          <SubTitle id="ipv6">IPv6 in VPC</SubTitle>
          IPv6 is the successor of IPv4 as IPv4 addresses will be exhausted soon. Every IPv6 address in AWS is a public IP address. An example of a IPv6 address would be - 2001:db8:3333:4444:cccc:dddd:eeee:8888. The difference
          being that the range can include hexadecimals (0000 to ffff). You can enable IPv6 to operate in dual-stack mode. EC2 instances will get at least a private IPv4 and a public IPv6 address which can communicate using either
          addresses to the internet through an Internet Gateway. Note that IPv4 addresses cannot be disabled for your VPC and subnets.
          <Spacer />
          <StyledImage src={VPCIPv6} />
          <Spacer />
          <SubTitleSmall>Egress-only Internet Gateway</SubTitleSmall>
          Egress-only Internet Gateways allows instances in a VPC outbound connections over IPv6 while preventing the internet to initiate an IPv6 connection to the instances. This is used for IPv6 only -
          It's similar to a NAT Gateway but for IPv6 addresses.
          <Spacer />
          <StyledImage src={VPCEgressOnlyIG} />
          <Spacer />
          <SubTitleSmall>IPv6 Routing</SubTitleSmall>
          Here is an example on how routing works with IPv6:
          <Spacer />
          <StyledImage src={VPCIPv6Routing} />
          <Spacer />
          <SubTitle id="networking-costs">Networking Costs in AWS</SubTitle>
          <Spacer />
          <SubTitleSmall>Networking Costs per GB - Simplified</SubTitleSmall>
          <Spacer />
          Use Private IP instead of Public IP for savings and better network performance. Use the same AZ for maximum savings at the cost of high availability.
          <Spacer />
          <StyledImage src={VPCNetworkingCosts} />
          <Spacer />
          <SubTitleSmall>Minimizing egress traffic network costs</SubTitleSmall>
          <StyledListItem><BoldTextSmall>Egress traffic: </BoldTextSmall>outbound traffic (from AWS to outside)</StyledListItem>
          <StyledListItem><BoldTextSmall>Ingress traffic: </BoldTextSmall>inbound traffic (from outside to AWS which is typically free)</StyledListItem>
          <Spacer />
          Try to keep as much traffic within AWS to minimize costs. Direct Connect location that are co-located in the same AWS region result in lower cost for egress network.
          <Spacer />
          <StyledImage src={VPCEgressTrafficNetworkingCosts} />
          <Spacer />
          <SubTitle id="network-protection">AWS Network Firewall</SubTitle>
          AWS Network Firewall is a managed service designed to provide network protection for your VPC. It allows you to implement essential security controls, such as traffic filtering and monitoring,
          to safeguard your cloud infrastructure.
          <Spacer />
          <StyledImage src={VPCNetworkFirewall} />
          <Spacer />
          <HeadingSmall>Key features:</HeadingSmall>
          <StyledListItem><BoldTextSmall>Traffic Filtering</BoldTextSmall>: AWS Network Firewall enables you to create rules that allow, block, or monitor traffic based on criteria such as IP addresses, ports, protocols, and domains. This helps prevent unauthorized access and mitigate threats.</StyledListItem>
          <StyledListItem><BoldTextSmall>Managed Rules</BoldTextSmall>: You can use pre-configured rule groups provided by AWS or third-party vendors, which are regularly updated to protect against the latest threats. These managed rules simplify the setup process and ensure you have up-to-date protection.</StyledListItem>
          <StyledListItem><BoldTextSmall>Custom Rules</BoldTextSmall>: In addition to managed rules, you can create custom rule groups tailored to your specific security requirements. This gives you granular control over your network traffic.</StyledListItem>
          <StyledListItem><BoldTextSmall>Stateful and Stateless Rules</BoldTextSmall>: AWS Network Firewall supports both stateful and stateless rule processing. Stateful rules track the state of network connections, while stateless rules evaluate each packet in isolation. This flexibility allows for more nuanced traffic control.</StyledListItem>
          <StyledListItem><BoldTextSmall>Logging and Monitoring</BoldTextSmall>: The service provides detailed logging and monitoring capabilities, allowing you to track and analyze network traffic in real-time. Logs can be sent to Amazon S3, CloudWatch Logs, or Kinesis Data Firehose for further analysis.</StyledListItem>
          <StyledListItem><BoldTextSmall>centralised Management</BoldTextSmall>: You can centrally manage and deploy firewalls across multiple VPCs using AWS Firewall Manager, making it easier to maintain consistent security policies in large environments.</StyledListItem>
          <Spacer />
          <SubTitle id="vpc-summary">VPC Summary</SubTitle>
          <StyledListItem><BoldTextSmall>CIDR</BoldTextSmall>: IP Range</StyledListItem>
          <StyledListItem><BoldTextSmall>VPC</BoldTextSmall>: Define a list of IPv4 and IPv6 CIDR</StyledListItem>
          <StyledListItem><BoldTextSmall>Subnets</BoldTextSmall>: Tied to an AZ, CIDR range defined</StyledListItem>
          <StyledListItem><BoldTextSmall>Internet Gateway</BoldTextSmall>: At VPC level, provide IPv4 and IPv6 internet access</StyledListItem>
          <StyledListItem><BoldTextSmall>Route Tables</BoldTextSmall>: Must be edited to add routes from subnets to the IGW, VPC Peering Connections, VPC Endpoints</StyledListItem>
          <StyledListItem><BoldTextSmall>Bastion Host</BoldTextSmall>: Public EC2 instance to SSH into that has SSH connectivity to EC2 instances in private subnets</StyledListItem>
          <StyledListItem><BoldTextSmall>NAT Instances</BoldTextSmall>: Gives internet access to EC2 instances in private subnets. Old, must be setup in a public subnet, disable source / destination check flag</StyledListItem>
          <StyledListItem><BoldTextSmall>NAT Gateway</BoldTextSmall>: Managed by AWS, provides scalable internet access to private EC2 instances, when the target is an IPv4 address</StyledListItem>
          <StyledListItem><BoldTextSmall>NACL</BoldTextSmall>: Stateless, subnet rules for inbound and outbound</StyledListItem>
          <StyledListItem><BoldTextSmall>Security Groups</BoldTextSmall>: Stateful, operate at the EC2 instance level</StyledListItem>
          <StyledListItem><BoldTextSmall>VPC Peering</BoldTextSmall>: Connect two VPCs with non overlapping CIDR, non transitive</StyledListItem>
          <StyledListItem><BoldTextSmall>VPC Endpoints</BoldTextSmall>: Provide private access to AWS services (S3, DynamoDB) within a VPC</StyledListItem>
          <StyledListItem><BoldTextSmall>VPC Flow Logs</BoldTextSmall>: Can be setup at the VPC / Subnet / ENI level, for ACCEPT and REJECT traffic, helps identify attacks, analyze using Athena or Cloudwatch Logs Insights</StyledListItem>
          <StyledListItem><BoldTextSmall>Site-to-Site VPN</BoldTextSmall>: Setup a customer gateway on DC, a virtual private gateway on VPC, and site-to-site VPN over public internet</StyledListItem>
          <StyledListItem><BoldTextSmall>AWS VPN CloudHub</BoldTextSmall>: Hub-and-spoke VPN model to connect your sites</StyledListItem>
          <StyledListItem><BoldTextSmall>Direct Connect</BoldTextSmall>: Setup a virtual private gateway on VPC, and establish a direct private connection to an AWS Direct Location</StyledListItem>
          <StyledListItem><BoldTextSmall>Direct Connect Gateway</BoldTextSmall>: Setup a Direct Connect to many VPCs in different AWS regions</StyledListItem>
          <StyledListItem><BoldTextSmall>AWS PrivateLink / VPC Endpoint Services</BoldTextSmall>:</StyledListItem>
          <StyledListItemIndent>Connect services privately from your VPC to customers VPC</StyledListItemIndent>
          <StyledListItemIndent>Doesn't need VPC peering, public internet, NAT gateway, route tables</StyledListItemIndent>
          <StyledListItemIndent>Must be used with network load balancer & ENI</StyledListItemIndent>
          <StyledListItem><BoldTextSmall>ClassicLink</BoldTextSmall>: Connect EC2-Classic EC2 instances privately to your VPC</StyledListItem>
          <StyledListItem><BoldTextSmall>Transit Gateway</BoldTextSmall>: Transitive peering connections for VPC, VPN & DX</StyledListItem>
          <StyledListItem><BoldTextSmall>Traffic Mirroring</BoldTextSmall>: Copy network traffic from ENIs for further analysis</StyledListItem>
          <StyledListItem><BoldTextSmall>Egress-only Internet Gateway</BoldTextSmall>: Like NAT gateway but for IPv6</StyledListItem>
        </Text>
      </Container>
    </Wrapper>
  );
}

export default AWSVPC;
