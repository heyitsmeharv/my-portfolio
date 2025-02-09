import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

// helpers
import { logPageView } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// icons
import { ChevronBackCircle } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import { AWSSVG, AWSIAMSVG, AWSOrganisationsSVG, AWSControlTowerSVG } from '../../resources/styles/icons';

// components
import { StyledNavButton, StyledNavLink } from '../Button/Button';

// images
import IAMPolicyInheritance from "../../resources/images/blog/AWSIdentityAccessManagement/iam.jpeg";
import IAMPolicyInheritance2 from "../../resources/images/blog/AWSIdentityAccessManagement/iam_2.jpeg";
import IAMPolicyInheritance3 from "../../resources/images/blog/AWSIdentityAccessManagement/iam_3.jpeg";
import IAMPolicyInheritance4 from "../../resources/images/blog/AWSIdentityAccessManagement/iam_4.jpeg";
import IAMRole from "../../resources/images/blog/AWSIdentityAccessManagement/iam_5.jpeg";
import IAMPolicyExample from "../../resources/images/blog/AWSIdentityAccessManagement/policy_example.png";
import OrganisationsExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_organisations.jpeg";
import OrganisationSCPHeirarchyExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_organisations_scp.jpeg";
import OrganisationalUnitsExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_organisational_units.jpeg";
import IAMConditionRestrictIP from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_restrict_ip.jpeg";
import IAMConditionRestrictRegion from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_restrict_region.jpeg";
import IAMConditionRestrictTags from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_restrict_tags.jpeg";
import IAMConditionEnforceMFA from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_condition_enforce_mfa.jpeg";
import IAMForS3 from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_for_s3.jpeg";
import IAMPrincipalOrgId from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_principal_org_id.jpeg";
import IAMPrincipalOrgId2 from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_principal_org_id2.jpeg";
import IAMRolesResourcePolicies from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_roles_resource_policies.jpeg";
import IAMPermissionBoundary from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_permission_boundary.jpeg";
import IAMPermissionBoundaryExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_permission_boundary_example.jpeg";
import IAMIdentityCenter from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_identity_center.jpeg";
import IAMIdentityCenter2 from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_identity_center2.jpeg";
import PolicyEvaluationSingleAccountRole from "../../resources/images/blog/AWSIdentityAccessManagement/PolicyEvaluationSingleAccountRole.png";
import ControlTowerExample from "../../resources/images/blog/AWSIdentityAccessManagement/aws_iam_control_tower.jpeg";

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

const AWSIdentityAccessManagement = () => {

  // analytics
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      logPageView();
    }
  }, []);

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
          <Title>AWS Identity and Access Management (IAM)</Title>
          <IconWrapper>
            <Icon><AWSSVG /></Icon>
            <Icon><AWSIAMSVG /></Icon>
            <Icon><AWSOrganisationsSVG /></Icon>
            <Icon><AWSControlTowerSVG /></Icon>
          </IconWrapper>
        </Flex>
        <Spacer />
        <Text>
          This is the first of my AWS series blog posts where I'll be going through the Identity and Access Management Service, also known as IAM. I'm hoping this will serve at least somewhat of a refresher or a quick reference guide
          for those familiar with the IAM service; if not getting to grips with the basics if you're not familiar with this service at all.
          <Spacer />
          Let's start with outlining some useful information:
          <StyledListItem><BoldText>IAM</BoldText>: Identity and Access Management is a Global Service (i.e. isn't region specific).</StyledListItem>
          <StyledListItem><BoldText>Root Account</BoldText>: Created by default which shouldn't be used or shared.</StyledListItem>
          <StyledListItem><BoldText>Users</BoldText>: People within your organisation.</StyledListItem>
          <StyledListItem><BoldText>Groups</BoldText>: Only contains users and not other groups.</StyledListItem>
          <StyledListItem><BoldText>Roles</BoldText>: For AWS services such as EC2 instances.</StyledListItem>
          <StyledListItem><BoldText>Policies</BoldText>: JSON or YAML documents that outlines permissions for users or groups. You should apply the 'least privilege principal' which means you shouldn't give more permissions than a user needs.</StyledListItem>
          <Spacer />
          <SubTitle>IAM Policies Inheritance</SubTitle>
          Let's say we have a group of developers and we want to apply permissions to that group. In order to apply permissions, you need to attach a <BoldText>policy</BoldText>.
          <Spacer />
          <FlexCenter>
            <StyledImage mr="25px" width="400px" height="400px" src={IAMPolicyInheritance} />
            <Text>
              A <BoldText>policy</BoldText> will explicitly say what services are accessible. Once the policy has been added, it then will be associated with every user in that group.
            </Text>
          </FlexCenter>
          <Spacer />
          Now let's say we have another group in the organisation called 'Operations'. The users in this group will have different set of permissions than the users in 'Developers' because
          this group has a different <BoldText>policy</BoldText> attached.
          <Spacer />
          <StyledImage src={IAMPolicyInheritance2} />
          <Spacer />
          Because it's not mandatory for a user to be apart of a group, you can assign inline policies specifically for that user detailing their access.
          <Spacer />
          <StyledImage src={IAMPolicyInheritance3} />
          <Spacer />
          Finally, it's also important to note that users can be put into more than one group, meaning they would inherit both <BoldText>policies</BoldText>.
          <Spacer />
          <StyledImage src={IAMPolicyInheritance4} />
          <Spacer />
          <SubTitle>IAM Policies Structure</SubTitle>
          Here is an example of a policy written in YAML but they also can be written in JSON format.
          <StyledImage src={IAMPolicyExample} />
          <Spacer />
          Statements consists of:
          <StyledListItem><BoldText>SID</BoldText>: An identifier for the statement (optional).</StyledListItem>
          <StyledListItem><BoldText>Effect</BoldText>: Whether the statement allows or denies access (Allow, Deny).</StyledListItem>
          <StyledListItem><BoldText>Principal</BoldText>: Account/User/Role to which the policy applies to.</StyledListItem>
          <StyledListItem><BoldText>Action</BoldText>: A list of actions this policy allows or denies.</StyledListItem>
          <StyledListItem><BoldText>Resource</BoldText>: A list of resources to which the actions applied to.</StyledListItem>
          <StyledListItem><BoldText>Condition</BoldText>: For when the policy is in effect (optional).</StyledListItem>
          <Spacer />
          <SubTitle>IAM Roles</SubTitle>
          <FlexTop>
            <Text>
              That last component to this post will be outlining the purpose of <BoldText>roles</BoldText>. Just as a user will require permissions, the same can be said about AWS services which will perform actions on our behalf. In order
              for that to happen we need to create and assign <BoldText>roles</BoldText>. An example would be for an EC2 server requesting access to an AWS service, In order for that to happen the EC2 server will need a role attached which states in can
              perform actions using the specified service.
            </Text>
            <StyledImage ml="25px" src={IAMRole} />
          </FlexTop>
          <Spacer />
          <SubTitle>AWS Organizations</SubTitle>
          AWS Organizations is a service that helps businesses centrally manage and govern multiple AWS accounts within a single organization. It provides features for consolidated billing, policy-based account management, security, and automation,
          making it easier for enterprises to scale their AWS usage securely and efficiently.
          <Spacer />
          <StyledImage src={OrganisationsExample} />
          <Spacer />
          <SubTitle>Organisational Units (OU) - Examples</SubTitle>
          <Spacer />
          <StyledImage src={OrganisationalUnitsExample} />
          <Spacer />
          <SubTitle>Organisation SCP (Service Control Policy) Heirarchy</SubTitle>
          <Spacer />
          <StyledImage src={OrganisationSCPHeirarchyExample} />
          <UnStyledListItem><BoldText>Management Account</BoldText>:</UnStyledListItem>
          <StyledListItemIndent>Can do anything no SCP's apply</StyledListItemIndent>
          <UnStyledListItem><BoldText>Account A</BoldText>:</UnStyledListItem>
          <StyledListItemIndent>Can do anything other than:</StyledListItemIndent>
          <StyledListItemIndentExtra>S3 - Excplicit DENY from Sandbox OU</StyledListItemIndentExtra>
          <StyledListItemIndentExtra>EC2 - Excplicit DENY</StyledListItemIndentExtra>
          <UnStyledListItem><BoldText>Account B & C</BoldText>:</UnStyledListItem>
          <StyledListItemIndent>Can do anything other than:</StyledListItemIndent>
          <StyledListItemIndentExtra>S3 - Excplicit DENY from Sandbox OU</StyledListItemIndentExtra>
          <UnStyledListItem><BoldText>Account D</BoldText>:</UnStyledListItem>
          <StyledListItemIndent>Can access EC2</StyledListItemIndent>
          <UnStyledListItem><BoldText>Prod OU and Account E & F</BoldText>:</UnStyledListItem>
          <StyledListItemIndent>Can do anything no SCP's apply</StyledListItemIndent>
          <Spacer />
          <SubTitle>IAM Conditions</SubTitle>
          <HeadingSmall>Restrict via IP Address</HeadingSmall>
          Here is an example on how to write a policy that will restrict any API calls if any IP address are listed.
          <StyledImage src={IAMConditionRestrictIP} />
          <HeadingSmall>Restrict via Region</HeadingSmall>
          Here is an example on how to write a policy that will restrict any API calls made to the listed regions.
          <StyledImage src={IAMConditionRestrictRegion} />
          <HeadingSmall>Restrict based on Tags</HeadingSmall>
          Here is an example on how to write a policy that will allow users to start and stop EC2 instances that are in a particular group or if the instance itself is tagged with a certain string.
          <StyledImage src={IAMConditionRestrictTags} />
          <HeadingSmall>Enforce MFA</HeadingSmall>
          Here is an example on how to write a policy that will allow users to do anything in EC2 but will restrict users from stopping or terminating EC2 instances if MFA is not present.
          <StyledImage src={IAMConditionEnforceMFA} />
          <Spacer />
          <SubTitle>IAM For S3</SubTitle>
          For S3 you can state bucket level and object level permissions. This example shows that the 's3:ListBucket' permission applies to
          'arn:aws:s3:::test' (bucket level) and the 's3:PutObject, s3:GettObject, s3:DeleteObject' apply to the object inside the bucket 'arn:aws:s3:::test/*' (object level).
          <StyledImage src={IAMForS3} />
          <SubTitle>Principal Org Id</SubTitle>
          'aws:PrincipalOrgId' can be used in any resource policy to allow access to accounts that are members of an AWS Organisation.
          <StyledImage src={IAMPrincipalOrgId} />
          <StyledImage src={IAMPrincipalOrgId2} />
          <SubTitle>IAM Roles vs Resource-Based Policies</SubTitle>
          The difference between IAM roles and resource-based policies when it comes to calling API's over different accounts can either happen by attaching a resource-based policy to a resource (e.g. S3 bucket policy) or by using a role as a proxy.
          It's worth noting that when you assume a role, you give up your original permissions and take the permissions assigned to the role, when using a resource-based policy, the user doesn't have to give up their permissions.
          <StyledImage src={IAMRolesResourcePolicies} />
          <SubTitle>IAM Permission Boundaries</SubTitle>
          IAM Permission Boundaries are only supported for users and roles and not groups. Permission Boundaries can be used in combination of AWS Organisation SCP's (Service Control Policy) and identity-based policy (whatever is attached to the group).
          <StyledImage src={IAMPermissionBoundary} />
          Permission Boundaries are a way to limit the maximum permissions that an IAM user or role can be granted. They act as a restrictive guardrail, ensuring that even if a user or role is assigned broader permissions through policies, they cannot exceed the permissions defined by the boundary.
          <Spacer />
          Here is an example of a Permission Boundary policy:
          <StyledImage src={IAMPermissionBoundaryExample} />
          This means that no matter what permissions the role gets, it will never be able to do anything outside of S3. If an admin attaches an IAM policy allowing ec2:*, the permission boundary prevents the role from using EC2. Permission Boundaries can be used to
          delegate IAM role creation without losing control over what permissions they can have and prevent privilege escalation, ensuring users/roles don't exceed intended access.
          <Spacer />
          <SubTitle>IAM Policy Evaluation Logic</SubTitle>
          The following flow chart provides details about how a policy evaluation decision is made for an IAM role within a single account.
          <StyledImage src={PolicyEvaluationSingleAccountRole} />
          <SubTitle>IAM Identity Center</SubTitle>
          AWS IAM Identity Center (formerly known as AWS Single Sign-On) is a centralised cloud service designed to simplify managing user identities and permissions across AWS accounts and integrated business applications. The identity providers (users) could
          be stored in either the built-in identity store in IAM Identity Center or you can connect to a third party identity provider like Okta.
          <StyledImage src={IAMIdentityCenter} />
          You can assign group permissions by assigning the group to a policy and then attaching that policy to an OU.
          <StyledImage src={IAMIdentityCenter2} />
          <SubTitle>Control Tower</SubTitle>
          AWS Control Tower is a managed service that simplifies setting up and governing a secure, multi-account AWS environment following best practices. It uses AWS Landing Zone principles to enforce security, compliance, and governance across multiple AWS accounts.
          <HeadingSmall>Guardrails</HeadingSmall>
          Guardrails in AWS Control Tower are pre-configured governance rules that help maintain security, compliance, and best practices across AWS accounts. These guardrails ensure that AWS environments adhere to organizational policies without manual intervention.
          <StyledImage src={ControlTowerExample} />
        </Text>
      </Container>
    </Wrapper>
  );
}

export default AWSIdentityAccessManagement;