import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from "../BlogLayout/BlogLayout";
import {
  ProjectArchitecture,
  EngineeringDecisions,
} from "../BlogLayout/ProjectExplanation";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem,
  InlineHighlight,
} from "../Typography/Typography";

// icons
import { AWSSVG, AWSVPCSVG, AWSEC2SVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
import { CodeBlockWithCopy } from "../Code/Code";

// code blocks
import {
  awsVpnBastionCidrBits,
  awsVpnBastionCidrNesting,
  awsVpnBastionKeyFormats,
  awsVpnBastionRfc1918,
  awsVpnBastionSubnetReserved,
  awsVpnBastionKeyChallenge,
  awsVpnBastionCertInspect,
  awsVpnBastionServerConfManual,
  awsVpnBastionFirstConnect,
  awsVpnBastionRoutePrint,
  awsVpnBastionThreeFixes,
  awsVpnBastionTcpdump,
  awsVpnBastionPamManual,
  awsVpnBastionAddUserManual,
  awsVpnBastionProxyJump,
  awsVpnBastionLocalForward,
  awsVpnBastionProof,
} from "../../helpers/codeblocks";

const awsVPNBlogUrl = "https://www.heyitsmeharv.com/blog/aws-vpc";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const vpnBastionArchitecture = `[vpc] VPC 10.20.0.0/16
  [public] Public Subnet 10.20.0.0/24
    [openvpn] OpenVPN Server - the only way in
      (UDP 1194 open to the internet, deliberately)
      (auth: client certificate + a six-digit code)
      (SSH 22 from your own /32 - break-glass only)
      (SSH 22 from the bastion SG - routine admin)
  [private] Private Subnet 10.20.10.0/24
    [bastion] Bastion Host
      (no public IP - unaddressable from the internet)
      (SSH 22 from the OpenVPN SG only)
  [nat] NAT Gateway
    > egress only, no inbound route exists`;

const vpnBastionDecisions = [
  {
    title: "MASQUERADE rather than routing, so the source check stays enabled",
    body: `Almost every guide to running OpenVPN on EC2 tells you to disable the
instance's source/destination check. It is not necessary here, and knowing why is more
useful than knowing the setting exists. The check only needs disabling when packets leave
the interface addressed from somewhere else, which happens when a VPC route table points
at the instance. Nothing routes at this interface: inbound is the tunnel addressed to the
box itself, and outbound is rewritten to the box's own address before it leaves. Both
halves of the check are satisfied, so it stays on and the VPC route tables need no entry
for the VPN client pool at all.`,
  },
  {
    title:
      "A break-glass door, after the zero-exception design proved unusable",
    body: `The first version had exactly one way in and no exceptions. Tracing the
rules end to end showed it could never be started: the VPN profile you need in order to
get in is generated on the machine you can only reach once you are already in. It also
could not be repaired - one mistake in the two-factor configuration would have left
nothing to fix it with. So SSH on the VPN box is additionally open to a single address,
mine, as a /32. A system nobody can enter or repair is not more secure. It is broken.`,
  },
  {
    title: "No SSM Session Manager anywhere",
    body: `Session Manager would have solved the bootstrap problem too, and it was
rejected. It works over an outbound channel to the AWS control plane rather than through
the VPC network, so it is a permanent second entrance that does not require being on the
VPN at all - which undermines the entire premise. Break-glass SSH is different in kind:
it is still network access, governed by a security group, using a key I hold. Someone
with only console access still cannot reach these instances without making an auditable
infrastructure change.`,
  },
  {
    title: "Community OpenVPN rather than Access Server",
    body: `Access Server has a web interface that does the certificate authority, the
user management and the routing for you, and for a company that is usually the right
answer. It is the wrong answer for learning, because the parts it hides are exactly the
parts worth understanding - the PKI, the server configuration, the forwarding and the
NAT. Everything in this post is the community edition, configured by hand.`,
  },
  {
    title: "Ubuntu for the VPN box, Amazon Linux for the bastion",
    body: `A stack that mixes operating systems looks like an oversight, so it is
worth stating the reason. The PAM module that provides the second factor has no package
in Amazon Linux 2023, and EPEL does not support Amazon Linux, so the alternative was
compiling the authentication component from source. Picking the distribution that suits
the software is the right call provided you can say why. The practical cost is that the
default username differs between the two boxes, and using the wrong one produces an error
identical to a broken key.`,
  },
  {
    title: "One shared key pair, and why a real team would not do this",
    body: `A single key pair covers both instances. That is fine for one operator, and
it has no per-person revocation - a compromised key means rotating it everywhere at once,
and there is no way to remove one person's access without removing everyone's. A
multi-person environment wants a key pair per person, or short-lived certificates from an
SSH certificate authority, precisely so that access can be revoked individually. That is
the same argument the client certificates later in the post are making.`,
  },
  {
    title: "One NAT gateway instead of one per availability zone",
    body: `The single most expensive thing here, billed whether or not any traffic
flows, and it costs more than the instances combined. A second one in another zone would
buy availability this build does not need: everything runs in one zone, so if that zone
fails there is nothing left alive that needs egress. In production you would run one per
zone, and you would need a route table per zone to go with it, because a route table has
one default route and it points at exactly one gateway.`,
  },
];

const AWSVPNBastion = () => {
  useEffect(() => {
    // window.scrollTo(0, 0);
    Analytics.pageview("/blog/aws-vpn-bastion-access");
    Analytics.track("blog_page_viewed", { slug: "aws-vpn-bastion-access" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Locking a VPC Behind OpenVPN</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSVPCSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSEC2SVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          Ever wondered how to prevent the public from accessing resources you
          wish to host? This post hopefully will help explain how you can create
          an environment that will accommodate for restricting access to the
          public and allowing access to only those you choose. Why would we want
          to be able to do this?
        </Paragraph>

        <Paragraph>
          Well a good example would be that you might want to run different
          version of a product? Let's say you have a live website which you want
          reachable to the public, but you want to test some new changes - you
          don't necessarily want the public to see these new changes just in
          case they don't work as intended or are a work in progress.
        </Paragraph>

        <Paragraph>
          Although the testing environment will be served on a different URL
          path that might not be obvious to the public, it doesn't necessarily
          mean that people won't access it and that is a problem we want to
          solve.
        </Paragraph>

        <ProjectArchitecture
          title="The Design At A High Level View"
          summary={`This setup is essentially a VPC carved into a public and a private subnet. 
          An instance in the public subnet running OpenVPN, holding a fixed public address. 
          A second instance in the private subnet with no public address at all, reachable only 
          once you are on the VPN. A NAT gateway so the private side can fetch updates without 
          being reachable. Security groups that reference each other by name rather than by address. 
          Access granted by a client certificate and a six-digit code, either of which can be revoked 
          for one person without disturbing anybody else.`}
          archOutline={vpnBastionArchitecture}
        />

        <Paragraph>
          I have a{" "}
          <TextLink href={awsVPNBlogUrl} target="_blank" rel="noreferrer">
            AWS VPC post
          </TextLink>{" "}
          which will help explain how these resources work if you're unsure
          about the above.
        </Paragraph>

        <SectionHeading>The VPC and the Address Space</SectionHeading>

        <Paragraph>
          Let's start with the <Strong>VPC</Strong> which everything will reside
          in - it is essentially two things: a private range of addresses, and a
          set of rules about where traffic from those addresses may go. It is
          region bound which is a good thing to note when deciding where to put
          your resources. Not to say that if you decide to put resources in the
          US they can't be access to EU and visa versa, but there will be
          latency implications.
        </Paragraph>

        <Paragraph>
          The first decision when it comes to creating a VPC is the address
          range, and it is something that cannot be undone or change once it's
          been decided. A VPC's primary Classless Inter-Domain Routing (
          <Strong>CIDR</Strong>) is fixed at creation. Every subnet, every route
          and every network interface is allocated out of it. Getting it correct
          the first time is pretty important, otherwise you'll have to recreate
          your VPC and start again.
        </Paragraph>

        <SubSectionHeading>Reading the notation</SubSectionHeading>

        <Paragraph>
          An IPv4 address is 32 bits. The number after the slash says how many
          of those bits are fixed, and the rest are yours to allocate. A{" "}
          <Strong>larger</Strong> prefix (number at the end) is a{" "}
          <Strong>smaller</Strong> network.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionCidrBits} />

        <SubSectionHeading>How does it get allocated?</SubSectionHeading>

        <Paragraph>
          In this example the <InlineHighlight>/16</InlineHighlight> contains
          every <InlineHighlight>/24</InlineHighlight> that starts with the same
          first two numbers, which is exactly how a network gets carved into
          subnets.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionCidrNesting} />

        <SubSectionHeading>
          Why the range matters more here than usual
        </SubSectionHeading>

        <Paragraph>
          For a VPC that never talks to anything else, the range is arbitrary.
          This one is going to be reached over a VPN, and that changes the
          calculation.
        </Paragraph>

        <Paragraph>
          When a client connects, the VPN server tells it which networks to send
          down the tunnel. If one of those overlaps with a network the client is
          already attached to - a home router, an office LAN, another VPN - the
          client now has two valid claims on the same addresses. It will pick
          one. Sometimes it picks the one you wanted.
        </Paragraph>

        <Banner title="No configuration resolves an overlap" variant="warning">
          <Paragraph>
            Both answers are correct as far as the client is concerned, so there
            is nothing to fix at the VPN layer. The only remedy is to renumber
            one side of the collision, and by the time you find out, one side is
            a laptop belonging to somebody who is not you.
          </Paragraph>
        </Banner>

        <Paragraph>
          So the range needs to be private, and it needs to be unusual.
        </Paragraph>

        <SubSectionHeading>
          Private means three specific ranges
        </SubSectionHeading>

        <Paragraph>
          RFC 1918 reserves exactly three blocks for private use. Nobody owns
          them. Everyone uses them at the same time and none of it conflicts,
          because internet routers discard these addresses on sight - traffic
          using them never leaves the network it started on, so two
          organisations using the same range never meet.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionRfc1918} />

        <Paragraph>
          Which is worth stating plainly, because the causality usually gets
          told backwards. <InlineHighlight>192.168.x.x</InlineHighlight> is not
          reserved because home routers use it. Home routers use it because it
          was reserved. The same goes for AWS picking{" "}
          <InlineHighlight>172.31.0.0/16</InlineHighlight> for default VPCs and
          Docker picking <InlineHighlight>172.17.0.0/16</InlineHighlight> for
          its bridge. Those are vendor habits that the reservation made
          possible, not allocations.
        </Paragraph>

        <SubSectionHeading>
          What happens if you use something else
        </SubSectionHeading>

        <Paragraph>
          Everything outside those three blocks belongs to an organisation. Not
          necessarily in use - <Strong>allocated</Strong>. IANA ran out of
          unallocated IPv4 space in 2011, so there is no free pool left to
          borrow from.
        </Paragraph>

        <Paragraph>
          Suppose you build the VPC as{" "}
          <InlineHighlight>30.30.0.0/16</InlineHighlight> because it looked
          empty. AWS will let you. You immediately get a route saying{" "}
          <InlineHighlight>30.30.0.0/16</InlineHighlight> is local to your VPC,
          and that route cannot be deleted. Now an instance tries to reach the
          real <InlineHighlight>30.30.5.5</InlineHighlight>, somewhere out on
          the internet. The local route is more specific than the default route,
          so it wins, and the packet is delivered inside your own VPC where
          nothing is listening.
        </Paragraph>

        <Paragraph>
          You have not broken anything for anyone else. You have made 65,536
          real internet addresses permanently unreachable from inside your own
          network, and you cannot fix it, because the local route is undeletable
          and the primary CIDR is immutable.
        </Paragraph>

        <Paragraph>
          This is not hypothetical. Organisations squatted on{" "}
          <InlineHighlight>1.0.0.0/8</InlineHighlight> for years on the grounds
          that nobody seemed to be using it. APNIC allocated it, Cloudflare
          launched <InlineHighlight>1.1.1.1</InlineHighlight> on it in 2018, and
          a lot of networks discovered simultaneously that they could not reach
          the most heavily advertised DNS resolver on the internet. The owner
          had not changed. It had just become visible.
        </Paragraph>

        <SubSectionHeading>
          The ranges to avoid even though they are legal
        </SubSectionHeading>

        <Paragraph>
          Within RFC 1918, some slices are far more contested than others:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>172.31.0.0/16</InlineHighlight> - the default VPC,
            in every AWS region, in every account
          </TextListItem>
          <TextListItem>
            <InlineHighlight>192.168.0.0/24</InlineHighlight> and{" "}
            <InlineHighlight>192.168.1.0/24</InlineHighlight> - the factory
            default of nearly every home router, which is to say the network
            your VPN clients are sitting on
          </TextListItem>
          <TextListItem>
            <InlineHighlight>10.0.0.0/16</InlineHighlight> - everybody's first
            hand-picked choice, and therefore the most likely to collide with a
            partner or an acquisition later
          </TextListItem>
          <TextListItem>
            <InlineHighlight>10.8.0.0/24</InlineHighlight> - OpenVPN's own
            default client pool, which this build uses for the tunnel itself
          </TextListItem>
        </TextList>

        <Paragraph>
          <InlineHighlight>10.20.0.0/16</InlineHighlight> avoids all of them.
          There is nothing special about it beyond being an unlikely thing for
          somebody else to have picked, and that is the entire requirement.
          Collisions are a planning failure rather than a space shortage -{" "}
          <InlineHighlight>10.0.0.0/8</InlineHighlight> contains 256 separate
          /16 networks, and allocating them from a scheme costs nothing.
        </Paragraph>

        <SubSectionHeading>
          Three things AWS creates that you did not ask for
        </SubSectionHeading>

        <Paragraph>
          Creating the VPC quietly produces three more objects, and one of them
          explains a behaviour that otherwise looks like magic.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>A main route table</Strong>, containing a route for the
            VPC's own range pointing at a target called{" "}
            <InlineHighlight>local</InlineHighlight>. It cannot be deleted. This
            is why every subnet in a VPC can reach every other subnet with no
            configuration at all - the route was there before you made the
            subnets.
          </TextListItem>
          <TextListItem>
            <Strong>A default network ACL</Strong>, which allows everything in
            both directions.
          </TextListItem>
          <TextListItem>
            <Strong>A default security group</Strong>, which allows traffic from
            anything else carrying the same group. This build never uses it.
            Purpose-built groups make intent readable to whoever inherits the
            account.
          </TextListItem>
        </TextList>

        <Paragraph>
          Leave the main route table alone. It is the fallback for any subnet
          you do not explicitly associate with something else, so if it holds
          only the local route then a subnet you forget about can talk inside
          the VPC and nowhere else. Put an internet gateway route in it and
          every subnet you forget about becomes public, silently, including ones
          created years later by somebody who has never heard of this decision.
        </Paragraph>

        <Banner title="The distinction the rest of the post depends on">
          <Paragraph>
            Routing answers <Strong>where can this traffic go</Strong>. Security
            groups answer <Strong>what is allowed</Strong>. They are separate
            systems and they fail in different ways.
          </Paragraph>
          <Paragraph>
            The local route means every instance in this VPC can always route to
            every other instance - the packet knows the way. When a connection
            between them fails, it fails because a security group refused it,
            not because the network was unaware of the destination. Keeping
            those two ideas apart is what makes it possible to debug this stack
            rather than guess at it.
          </Paragraph>
        </Banner>

        <Paragraph>
          Two settings are also worth checking before you move on.{" "}
          <Strong>DNS hostnames are off</Strong> in a VPC you create yourself,
          though DNS resolution is on; the default VPC has both, which is why
          this catches people out. And <Strong>tenancy</Strong> is set once for
          the whole VPC and applies to every instance launched into it - the
          Dedicated option costs roughly ten times as much and cannot be changed
          afterwards.
        </Paragraph>

        {/* ── 2. Public subnets and the IGW ─────────────────────────────────── */}
        <SectionHeading>Public Subnets and the Internet Gateway</SectionHeading>

        <Paragraph>
          A VPC spans a region. A <Strong>subnet</Strong> sits in exactly one
          availability zone and cannot be stretched across two. That single
          constraint is the reason high availability in AWS always involves more
          subnets - a zone failure takes everything inside it, and a subnet is
          entirely inside one.
        </Paragraph>

        <Paragraph>
          Worth knowing before you read anyone else's documentation:{" "}
          <Strong>zone names are randomised per account</Strong>. Your{" "}
          <InlineHighlight>eu-west-2a</InlineHighlight> is almost certainly not
          the same building as somebody else's. AWS shuffles the mapping so that
          customers do not all pile into the zone whose name sorts first. The
          stable identifier is the zone ID, shown alongside the name as
          something like <InlineHighlight>euw2-az2</InlineHighlight>, and that
          one does refer to the same physical place in every account.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionSubnetReserved} />

        <SubSectionHeading>One availability zone, on purpose</SubSectionHeading>

        <Paragraph>
          Everything here lives in one zone. All traffic stays inside it, which
          avoids cross-zone data charges and removes any dependency on reaching
          a resource across a zone boundary.
        </Paragraph>

        <Paragraph>
          The honest reason is that a second zone would protect against an event
          rarer than the thing it would cost. A VPN serving a handful of people
          that goes down for ten minutes while an instance relaunches is an
          inconvenience. If this were carrying a company's remote access, that
          calculation changes.
        </Paragraph>

        <Paragraph>
          It is worth knowing what the fix would actually be, because the
          obvious answer is wrong. Running two VPN servers is hard, and not for
          capacity reasons - an OpenVPN server holds state its clients depend
          on. It has a <Strong>certificate authority</Strong> (install it twice
          and you have two unrelated authorities, so a client issued by one is
          rejected by the other), it has each user's second-factor secret, and
          it has an address baked into every profile you have handed out.
          Stateless things are trivially made redundant. Stateful ones are hard,
          and the work is always in moving the state somewhere both copies can
          see it.
        </Paragraph>

        <Paragraph>
          The cheaper answer for a single server is an auto scaling group with
          its minimum, maximum and desired count all set to one, spanning
          subnets in two zones. The group itself costs nothing. But a
          replacement is a brand new instance built from an image, so it comes
          up with a blank disk, a different private address and no Elastic IP
          attached - a working VPN that no existing client certificate can
          authenticate against. Making that work means keeping the certificate
          authority, the certificates and the configuration somewhere regional
          and restoring them at boot. Under a pound a month. The cost is
          complexity, not money.
        </Paragraph>

        <SubSectionHeading>
          What an internet gateway actually does
        </SubSectionHeading>

        <Paragraph>
          It has two jobs, and the second one surprises people. The first is to
          be a <Strong>target</Strong>: a route table entry saying "everything
          else goes to the internet gateway" is what makes a subnet public. The
          second is <Strong>one-to-one address translation</Strong>.
        </Paragraph>

        <Banner title="An instance never holds its own public IP">
          <Paragraph>
            Run <InlineHighlight>ip addr</InlineHighlight> on an EC2 instance
            with a public address and you will see only the private one. The
            public address exists in the gateway's translation table, and
            traffic is rewritten as it passes through in each direction.
          </Paragraph>
          <Paragraph>
            Software on the instance therefore cannot discover its own public
            address by asking the operating system, because the operating system
            was never told. It has to ask the instance metadata service. Every
            tool that auto-detects a public endpoint is doing this, and every
            one of them gets the wrong answer if the address changes after boot
            - which is exactly what happens when you attach an Elastic IP to a
            running instance.
          </Paragraph>
        </Banner>

        <Paragraph>
          An internet gateway is free, there is one per VPC, and it is
          horizontally scaled and redundant across zones with no bandwidth limit
          and nothing to size. The NAT gateway in the next section is none of
          those things. One thing to watch: creating a gateway and attaching it
          to a VPC are two separate actions, and an unattached gateway is a
          valid object that does nothing.
        </Paragraph>

        <SubSectionHeading>
          A public IP and a route are independent
        </SubSectionHeading>

        <Paragraph>
          Both are required, and having one without the other produces two
          different kinds of nothing. No route and no public address is
          isolation. A route with no public address means the route is unusable.
          A public address with no route is an address that goes nowhere.{" "}
          <Strong>It has a public IP but I cannot reach it</Strong> is almost
          always a missing route or an unattached gateway.
        </Paragraph>

        <SubSectionHeading>Longest prefix match</SubSectionHeading>

        <Paragraph>
          An instance sending to <InlineHighlight>10.20.0.5</InlineHighlight>{" "}
          has two routes that match: the local route for the whole VPC, and the
          default route <InlineHighlight>0.0.0.0/0</InlineHighlight> that covers
          everything. The more specific route wins, so local traffic never goes
          near the internet gateway without anyone having written a rule saying
          so. It is also why <InlineHighlight>0.0.0.0/0</InlineHighlight> is
          called the default route - it matches everything, so it can only ever
          win when nothing else has.
        </Paragraph>

        <Paragraph>
          The same mechanism turns up three more times in this post: it is why a
          badly chosen VPC range makes real internet addresses unreachable, why
          a VPN client can send some traffic down the tunnel and the rest to the
          home router, and why an encrypted tunnel does not accidentally route
          itself through itself.
        </Paragraph>

        <Paragraph>
          So the definition, finally. A subnet is public if, and only if, the
          route table associated with it contains a route to an internet
          gateway. Not because of its name, and not because of the auto-assign
          public IP setting. A subnet called{" "}
          <InlineHighlight>private-do-not-use</InlineHighlight> with a gateway
          route is a public subnet.
        </Paragraph>

        {/* ── 3. Private tier and NAT ───────────────────────────────────────── */}
        <SectionHeading>The Private Tier and the NAT Gateway</SectionHeading>

        <Paragraph>
          A subnet is <Strong>private</Strong> if the route table associated
          with it has no route to an internet gateway. That is the whole
          definition. Not a setting, not the name, and not the absence of public
          addresses on the instances inside it - the missing route.
        </Paragraph>

        <Paragraph>
          This is a stronger guarantee than a firewall, and the difference is
          worth being precise about. A firewall receives a packet and decides to
          drop it. Here there is no decision, because there is no delivery. An
          address in <InlineHighlight>10.20.10.0/24</InlineHighlight> does not
          exist as far as the internet is concerned. Nothing rejects it. Nothing
          sees it. And there is no rule to get wrong, because there is no rule -
          the most common way a protected host ends up exposed is somebody
          widening a rule for a reason that made sense at the time, and you
          cannot widen the absence of a route.
        </Paragraph>

        <SubSectionHeading>
          But the private tier still needs to reach out
        </SubSectionHeading>

        <Paragraph>
          A host that can never reach the internet cannot install a security
          update, and cannot call an AWS API - which, despite the mental picture
          of everything being "inside AWS", means reaching a public endpoint
          over the internet. An instance in a private subnet with no egress
          cannot write to CloudWatch or read from S3, and it fails as a timeout
          that looks nothing like a networking problem.
        </Paragraph>

        <Paragraph>
          So you need one-way egress: connections that start inside can get out,
          and nothing from outside can get in.
        </Paragraph>

        <SubSectionHeading>Why NAT is inherently one-way</SubSectionHeading>

        <Paragraph>
          The usual explanation is that a NAT gateway blocks inbound traffic. It
          does not, and understanding why makes the guarantee much easier to
          trust.
        </Paragraph>

        <Paragraph>
          A private address like <InlineHighlight>10.20.10.161</InlineHighlight>{" "}
          exists in millions of networks simultaneously, so a reply addressed to
          it could never find its way back. When a connection leaves, the
          gateway rewrites the source to its own public address and{" "}
          <Strong>writes down the mapping</Strong>. Replies come back to the
          public address, the gateway looks up the entry, and rewrites the
          destination to the private host.
        </Paragraph>

        <Paragraph>
          Now consider an unsolicited packet arriving from outside. There is no
          entry, because nothing inside opened anything. The gateway is not
          consulting a policy and deciding to refuse - it has no way to
          determine which of your private hosts the packet is for, because that
          information only ever comes into existence when a connection starts
          from the inside.
        </Paragraph>

        <Banner title="It does not refuse the packet. It has nowhere to send it.">
          <Paragraph>
            That is a stronger guarantee than a firewall rule, because there is
            no rule to misconfigure. The public subnet's gateway route works in
            both directions; the private subnet's NAT route works outbound only.
            That asymmetry is the whole design.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Two things that confuse everyone</SubSectionHeading>

        <Paragraph>
          <Strong>The NAT gateway lives in a public subnet.</Strong> It serves
          the private ones, but it needs internet access itself, so it has to
          sit where a route to the internet gateway exists. Traffic takes two
          hops through two route tables: the private subnet's table points at
          the NAT gateway, and the public subnet's table points at the internet
          gateway.
        </Paragraph>

        <Paragraph>
          <Strong>It belongs to one availability zone.</Strong> Unlike the
          internet gateway, which is region-wide and redundant with nothing to
          configure, a NAT gateway is a resource in a single subnet in a single
          zone. The expensive way to get this wrong is three NAT gateways "for
          resilience" sharing a single private route table - two of them sit
          idle at roughly £26 a month each while everything funnels through the
          third. A route table has one default route, and it points at exactly
          one gateway.
        </Paragraph>

        <SubSectionHeading>
          It is the most expensive thing in this build
        </SubSectionHeading>

        <Paragraph>
          At roughly £26 to £33 a month it costs more than the instances
          combined, and unlike an instance you cannot stop it - deleting it is
          the only way to stop the charge. Worth knowing the alternatives before
          reaching for it by reflex:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Gateway VPC endpoints</Strong> for S3 and DynamoDB are free,
            and remove the need for NAT entirely if AWS services are all you
            need to reach.
          </TextListItem>
          <TextListItem>
            <Strong>A NAT instance</Strong> - a small EC2 instance doing the
            same job with <InlineHighlight>iptables</InlineHighlight> - costs
            about £3 a month, and in exchange you own its patching, its
            availability and its bandwidth. It is also the one case in this
            build where you genuinely would have to disable the
            source/destination check on the network interface, for reasons that
            come up later.
          </TextListItem>
          <TextListItem>
            <Strong>No egress at all</Strong> is a real option for a host that
            never needs updating.
          </TextListItem>
        </TextList>

        <SubSectionHeading>Blackhole routes</SubSectionHeading>

        <Paragraph>
          Deleting a NAT gateway does not delete the routes pointing at it.
          Those routes enter a state AWS calls <Strong>Blackhole</Strong>, and
          they silently discard everything that matches. This matters beyond the
          tidying up: it demonstrates that infrastructure identifiers are not
          stable across recreation. Rebuild the gateway and it has a new ID, so
          every route table referring to the old one is now pointing at
          something that does not exist, and nothing tells you.
        </Paragraph>

        <Paragraph>
          While you are cleaning up, an Elastic IP that is not attached to
          anything still bills. Deleting the gateway is not enough, because the
          address it was using is now a detached address you are paying for.
        </Paragraph>

        {/* ── 4. Security groups ────────────────────────────────────────────── */}
        <SectionHeading>Security Groups</SectionHeading>

        <Paragraph>
          A <Strong>security group</Strong> is a stateful allow-list attached to
          a network interface. All three of those words are load-bearing.
        </Paragraph>

        <Paragraph>
          <Strong>Attached to a network interface</Strong> - not to a subnet,
          and not really to an instance. An instance has a security group
          because its interface does. This is why a security group cannot
          protect a subnet and why a network ACL cannot protect a single
          instance: they are enforced in different places.
        </Paragraph>

        <SubSectionHeading>There are no deny rules</SubSectionHeading>

        <Paragraph>
          You cannot express "block this address" in a security group. Only
          allow rules exist, and anything not explicitly permitted is dropped
          without a response. That silence gives you a reliable diagnostic that
          works before you have any logs at all:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Connection refused</Strong> means you reached the machine
            and nothing was listening on that port.
          </TextListItem>
          <TextListItem>
            <Strong>Connection timed out</Strong> means you never reached the
            machine. A security group, a missing route, or the wrong address.
          </TextListItem>
        </TextList>

        <Paragraph>
          Those two outcomes point at completely different halves of the stack,
          and the distinction comes up repeatedly from here on. A hop that hangs
          rather than failing is nearly always a security group. If you
          genuinely need to deny one specific thing while allowing everything
          else, you need a network ACL - security groups cannot do it.
        </Paragraph>

        <SubSectionHeading>Stateful</SubSectionHeading>

        <Paragraph>
          Permit an inbound connection and the reply is automatically allowed
          back out, whatever the outbound rules say. The reverse holds too: a
          connection opened from the instance gets its responses back without
          any inbound rule existing. This is why the VPN server, which has no
          inbound rule permitting HTTP or HTTPS at all, can still download
          packages.
        </Paragraph>

        <Paragraph>
          The payoff is easiest to see by imagining the alternative. A stateless
          filter has no idea that an arriving packet is a reply, so to receive
          responses at all you would have to permit inbound traffic across the
          whole ephemeral port range, 1024 to 65535. That is an enormous hole,
          and it is why network ACL rulesets look so alarming compared to
          security groups. Stateful tracking means you open nothing.
        </Paragraph>

        <SubSectionHeading>A security group as a source</SubSectionHeading>

        <Paragraph>
          A rule's source can be another security group instead of an address
          range, and it is worth being exact about what that means, because the
          shorthand is misleading. It does not mean "allow instances in that
          group". It means: allow traffic whose source address is a private
          address currently belonging to a network interface that carries that
          group. AWS resolves it live.
        </Paragraph>

        <Paragraph>
          The rule therefore survives instances being replaced and addresses
          changing, it scales to however many instances carry the group without
          being edited, and it documents <Strong>intent</Strong> - "from the
          bastion" - rather than recording a fact about addressing that was true
          on the day you wrote it.
        </Paragraph>

        <Paragraph>
          The catch is in the definition: it only works for traffic that
          actually crosses the VPC network, because that is where network
          interfaces exist. That turns out to matter a great deal once there is
          a VPN in the picture, and one{" "}
          <InlineHighlight>iptables</InlineHighlight> rule added much later is
          what makes any of this apply to VPN clients at all.
        </Paragraph>

        <SubSectionHeading>The rules this build needs</SubSectionHeading>

        <Paragraph>
          The VPN server's group ends up with three inbound rules, and the
          reasoning differs for each.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>UDP 1194 from anywhere.</Strong> Deliberately open to the
            entire internet. A client that roams - a laptop on a home
            connection, a phone on mobile data, a hotel network - has no
            predictable source address, so restricting this by range would mean
            editing a firewall rule every time anyone changes network. The
            security boundary for this port is not the source address. It is TLS
            plus a per-client certificate, with another layer in front of even
            that which makes the port appear closed to anyone scanning it. Being
            able to explain why this is open is what separates it from
            carelessness.
          </TextListItem>
          <TextListItem>
            <Strong>TCP 22 from a single address</Strong> - your own, as a /32.
            Never from anywhere. An SSH port open to the internet is found by
            automated scanners within minutes. This rule exists because at first
            boot there is no other way in, and it is the only thing that saves
            you if you break the VPN later.
          </TextListItem>
          <TextListItem>
            <Strong>TCP 22 from the bastion's security group</Strong>, added
            later. This is the normal path, and it only functions once you are
            already on the VPN.
          </TextListItem>
        </TextList>

        <Paragraph>
          The two SSH rules are deliberately different. One is an emergency door
          that works when nothing else does. The other is the route you use
          every day, and it depends on everything else working.
        </Paragraph>

        <Banner title="Leaving egress open is a decision, not laziness">
          <Paragraph>
            The VPN server needs package archives, it needs to fetch the
            certificate tooling, and it needs <Strong>NTP</Strong>. That last
            one is the one people close off without thinking, and the
            consequence arrives weeks later: the second factor added at the end
            of this build derives its codes from the current time in
            thirty-second windows. Block time synchronisation and the clock
            drifts, every code is rejected, and nothing in any error message
            mentions time.
          </Paragraph>
        </Banner>

        <Paragraph>
          One last thing worth knowing before you create any of them: a security
          group's <Strong>name and description cannot be changed</Strong> after
          creation. Only the descriptions on individual rules can be edited
          afterwards, so getting them wrong means creating a replacement and
          reattaching it everywhere it was used.
        </Paragraph>

        {/* ── 5. SSH keys ───────────────────────────────────────────────────── */}
        <SectionHeading>SSH Keys</SectionHeading>

        <Paragraph>
          Make the key pair before you launch anything. The console offers to
          create one during the launch wizard, which works, but it is worth
          understanding what the key is before it becomes a checkbox in a form.
        </Paragraph>

        <Paragraph>
          A key pair is two mathematically related files. The public half can be
          published on a billboard. The private half is the secret, and it stays
          on your machine. When you add a key pair to an instance, AWS stores{" "}
          <Strong>only the public half</Strong>, and at first boot the
          instance's initialisation process writes it into{" "}
          <InlineHighlight>~/.ssh/authorized_keys</InlineHighlight> for the
          default user. That is the entire mechanism.
        </Paragraph>

        <Paragraph>
          The private half never leaves your laptop. Not when you create the
          pair, not when you import it, and - this is the part worth
          internalising - not when you log in.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionKeyChallenge} />

        <SubSectionHeading>The format trap</SubSectionHeading>

        <Paragraph>
          There is more than one way to write down a public key, and the tools
          disagree about which is the default. What you need almost everywhere -{" "}
          <InlineHighlight>authorized_keys</InlineHighlight>, AWS, GitHub - is
          the single-line OpenSSH format. PuTTYgen, which is how most people on
          Windows generate keys, has a <Strong>Save public key</Strong> button
          that does not produce it.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionKeyFormats} />

        <Paragraph>
          There is no button that saves the OpenSSH form. The one-line version
          is displayed in a text box at the top of the window, and copying it
          out of there is the intended route. If that box will not cooperate,
          the reliable path is to convert the whole key -{" "}
          <Strong>Conversions, then Export OpenSSH key</Strong> - which gives
          you the private key in OpenSSH format, from which the public half can
          be derived, because it always could be. That is why PuTTYgen never
          stored it separately.
        </Paragraph>

        <Banner
          title="Two of those files are the same secret"
          variant="warning"
        >
          <Paragraph>
            After converting you have the private key written down twice, in two
            formats, plus the public half. The two private files are{" "}
            <Strong>one key in two encodings</Strong>, not two keys. Worth being
            clear about before you start copying files around.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Which key protects what</SubSectionHeading>

        <Paragraph>
          There are two separate key pairs in play on every SSH connection and
          they are constantly confused with each other. The{" "}
          <Strong>user key</Strong> is the one you have just made: it lives on
          your laptop, it proves you are who you claim, and it is checked
          against <InlineHighlight>authorized_keys</InlineHighlight> on the
          server. The <Strong>host key</Strong> already exists - the instance
          generated its own the first time it booted. It lives on the server, it
          proves the server is the one you meant, and it is checked against{" "}
          <InlineHighlight>known_hosts</InlineHighlight> on your laptop.
        </Paragraph>

        <Paragraph>
          The trust runs in opposite directions, and "the key isn't working"
          means two entirely different problems depending on which one you mean.
        </Paragraph>

        <Paragraph>
          For this build a single key pair covers every instance, which is fine
          for something one person operates. For anything with more than one
          operator it is the wrong model, because removing someone's access
          means rotating a key everyone else is also using. The scalable version
          is one key pair per person, at which point revocation is deleting one
          line from one file. The same argument returns in a stronger form when
          this build reaches client certificates.
        </Paragraph>

        {/* ── 6. Launching the VPN server ───────────────────────────────────── */}
        <SectionHeading>Launching the VPN Server</SectionHeading>

        <Paragraph>
          One instance, in the public subnet, carrying the security group with
          UDP 1194 open. A few decisions in the launch wizard matter more than
          they look.
        </Paragraph>

        <SubSectionHeading>Why this box runs a different OS</SubSectionHeading>

        <Paragraph>
          The bastion runs Amazon Linux; the VPN server runs Ubuntu. One box on
          a different distribution is a smell, so it needs justifying: OpenVPN
          and the certificate tooling are first-class, well-trodden Debian
          packages, and the PAM module that provides the second factor has no
          package in Amazon Linux 2023 at all. EPEL does not support Amazon
          Linux, so the alternative is compiling the authentication component
          from source, which is a worse answer than using a different
          distribution.
        </Paragraph>

        <Paragraph>
          The practical consequence is that the default username differs -{" "}
          <InlineHighlight>ubuntu</InlineHighlight> on one box and{" "}
          <InlineHighlight>ec2-user</InlineHighlight> on the other - and using
          the wrong one produces{" "}
          <InlineHighlight>Permission denied (publickey)</InlineHighlight>,
          which is identical to the error for a broken key. It is the most
          common reason people think their key is wrong when it is not.
        </Paragraph>

        <SubSectionHeading>
          Architecture, credits and capacity
        </SubSectionHeading>

        <Paragraph>
          The <InlineHighlight>t4g</InlineHighlight> family is ARM and the{" "}
          <InlineHighlight>t3</InlineHighlight> family is x86. Pair an x86 image
          with an ARM instance type and the launch fails with an error about
          architecture rather than anything helpful, so set the architecture
          before choosing the type or the list filters against you.
        </Paragraph>

        <Paragraph>
          Burstable instances give you a baseline share of a CPU and accrue
          credits when you use less than it. Both of those families default to{" "}
          <Strong>unlimited</Strong> mode, which means a runaway process on a
          five-pound instance keeps full performance and bills you for the
          surplus rather than throttling.
        </Paragraph>

        <Banner title="A capacity error is not a quota error">
          <Paragraph>
            <InlineHighlight>
              We currently do not have sufficient capacity in the Availability
              Zone you requested
            </InlineHighlight>{" "}
            means AWS has no spare hardware of that type in that zone. A quota
            error means your account is capped. The first cannot be appealed,
            because there is nothing to request - you change type, change zone,
            or wait.
          </Paragraph>
          <Paragraph>
            Graviton hits this more often than x86, because those pools are
            thinner. Here both the micro and the nano ARM sizes failed in the
            same zone, and a size shortage would not do that - a hardware pool
            shortage does. The production answer is not "use x86", it is an auto
            scaling group with a mixed instances policy across several subnets,
            which turns out to solve capacity shortages as well as zone
            failures. Shortages happen far more often, and almost nobody makes
            that argument for spreading across zones.
          </Paragraph>
        </Banner>

        <SubSectionHeading>
          IMDSv2, and why it changes your code
        </SubSectionHeading>

        <Paragraph>
          Set metadata version to <Strong>V2 only</Strong>. The metadata service
          hands out instance identity <Strong>and IAM credentials</Strong>.
          Under the older version that is a plain unauthenticated request, so a
          server-side request forgery bug in any application on the box leaks
          those credentials - this is how the 2019 Capital One breach worked.
          Version 2 requires a PUT with a custom header to mint a token first,
          which browsers and most proxies will not issue, and that kills the
          attack path.
        </Paragraph>

        <Paragraph>
          The consequence is that any script wanting its own metadata has to do
          the two-step exchange, and nearly every snippet online is the old
          one-liner that now returns 401.
        </Paragraph>

        <SubSectionHeading>Allocate the Elastic IP first</SubSectionHeading>

        <Paragraph>
          The automatically assigned public address changes on stop and start.
          That matters more for a VPN than for a web server, because{" "}
          <Strong>
            the address is baked into every client profile you issue
          </Strong>{" "}
          - change it and every distributed profile stops working.
        </Paragraph>

        <Paragraph>
          Allocate the Elastic IP before the instance, and pass it in
          explicitly. Because it attaches after the instance exists, anything
          running at first boot sees the temporary address instead. That is
          harmless when you are installing by hand afterwards and a real trap
          when the installation is automated - the endpoint auto-detection
          discussed earlier gets a plausible, wrong answer.
        </Paragraph>

        {/* ── 7. The first connection ───────────────────────────────────────── */}
        <SectionHeading>The First Connection</SectionHeading>

        <Paragraph>
          SSH is three phases, not one, and knowing them turns its errors from
          mysteries into a diagnosis. First a <Strong>key exchange</Strong>,
          where both sides agree a shared secret and the server signs something
          with its host key to prove who it is. Then{" "}
          <Strong>host verification</Strong>, where your client checks that
          signature against a key it has seen before, or asks you. Only then{" "}
          <Strong>user authentication</Strong>, where your key is used - and not
          by being sent anywhere.
        </Paragraph>

        <SubSectionHeading>Verify the host key properly</SubSectionHeading>

        <Paragraph>
          On the first connection you are asked to trust a fingerprint. Trust it
          based on what? Clicking accept means trusting whoever answered, which
          is precisely the window a machine-in-the-middle needs. Accept once and
          it is cached, so the entire risk is concentrated in that first moment.
        </Paragraph>

        <Paragraph>
          AWS gives you an <Strong>out-of-band</Strong> channel for this. The
          instance printed its own host key fingerprints to the serial console
          at first boot, and you can retrieve them from the EC2 console under
          Actions, Monitor and troubleshoot, Get system log. That comes through
          the AWS API rather than over the network path you are about to
          authenticate across, and an attacker intercepting SSH cannot also
          forge console output. The log can take a few minutes to appear.
        </Paragraph>

        <Paragraph>
          Once accepted, the key is recorded in{" "}
          <InlineHighlight>known_hosts</InlineHighlight>, and any future
          mismatch produces the full-screen{" "}
          <InlineHighlight>
            REMOTE HOST IDENTIFICATION HAS CHANGED
          </InlineHighlight>{" "}
          warning. You will hit this legitimately - terminating and relaunching
          an instance gives it new host keys on the same Elastic IP. The habit
          worth building is to know <Strong>why</Strong> before clearing it. "I
          just rebuilt the instance" is a fine reason. "I don't know" is exactly
          the case the warning exists for.
        </Paragraph>

        <Banner title="Trust stores are per-implementation">
          <Paragraph>
            Git Bash and the built-in Windows{" "}
            <InlineHighlight>ssh</InlineHighlight> both use{" "}
            <InlineHighlight>~/.ssh/known_hosts</InlineHighlight>, because both
            are OpenSSH. PuTTY keeps host keys in the Windows registry instead.
            Accepting a host key in PuTTY therefore teaches OpenSSH nothing, and
            you will be asked to verify the same host twice. Both are correct;
            they are simply different programs that happen to speak the same
            protocol.
          </Paragraph>
        </Banner>

        <SubSectionHeading>
          Two things to prove while you are here
        </SubSectionHeading>

        <Paragraph>
          Query the metadata service without a token and you get a 401; mint one
          with a PUT and the same request works. And ask the instance for its
          own network configuration and you will see only the private address,
          while the metadata service happily reports the Elastic IP - an address
          that appears nowhere in the operating system, because it only exists
          in the internet gateway's translation table.
        </Paragraph>

        {/* ── 8. Certificate authority ──────────────────────────────────────── */}
        <SectionHeading>The Certificate Authority</SectionHeading>

        <Paragraph>
          Now the VPN itself, starting with identity - because everything else
          depends on being able to say who is connecting.
        </Paragraph>

        <SubSectionHeading>
          Why certificates instead of a password
        </SubSectionHeading>

        <Paragraph>
          <Strong>A shared secret cannot be revoked for one person.</Strong>{" "}
          Somebody leaves and your options are to change it for everyone or to
          hope, so in practice it never gets changed and the former employee
          keeps access. That argument alone is enough.
        </Paragraph>

        <Paragraph>
          You also get <Strong>mutual authentication</Strong>: the server proves
          itself to the client as well as the other way round. With a password
          only one direction is verified, which is how people end up
          authenticating to a fake VPN endpoint.
        </Paragraph>

        <SubSectionHeading>What a certificate actually is</SubSectionHeading>

        <Paragraph>
          A public key, plus identity information, plus a signature from
          somebody vouching for the pairing. Which means{" "}
          <Strong>a certificate is not a secret</Strong> - it is a public
          document you could publish. The secret is the private key that pairs
          with it.
        </Paragraph>

        <Paragraph>
          So issuing somebody a certificate is not handing them a secret. It is
          handing them a signed statement saying that whoever holds the private
          key matching this public key is called Alice.
        </Paragraph>

        <SubSectionHeading>
          Why a private CA beats a public one here
        </SubSectionHeading>

        <Paragraph>
          A certificate authority is a key pair that both ends agree to trust.
          Ours is <Strong>self-signed</Strong> - its own certificate, signed by
          its own key, with nobody above it. That is exactly how every root
          authority in your browser works; the only difference is who trusts
          them.
        </Paragraph>

        <Paragraph>
          The difference that matters is who can issue a certificate your VPN
          will accept. With a private authority, the answer is only this one. If
          the VPN trusted public authorities, any of roughly 150 organisations
          worldwide could mint a client it would accept, and historically some
          have been compromised or coerced into doing precisely that. A private
          PKI is not a poor substitute for a public one - for a closed system it
          is strictly better, because the trust surface is one key you control
          rather than a global federation you do not.
        </Paragraph>

        <Banner
          title="The CA private key is the crown jewels"
          variant="warning"
        >
          <Paragraph>
            Anyone holding it can mint unlimited client certificates your VPN
            accepts, indefinitely, and you cannot revoke what you do not know
            exists. In a serious deployment it lives offline, on a machine that
            is not on the network, brought out only to sign.
          </Paragraph>
          <Paragraph>
            This build keeps it on the VPN server, and that is a real compromise
            worth naming rather than hiding: compromise the server and the
            attacker does not merely get in, they get permanent issuing rights
            and you must rebuild the entire PKI. Put a passphrase on it. It is
            the one thing standing between a file read and total compromise.
          </Paragraph>
        </Banner>

        <SubSectionHeading>
          Why the authority can live offline
        </SubSectionHeading>

        <Paragraph>
          Generating a certificate produces a private key <Strong>and</Strong> a
          certificate signing request. The request contains a public key and a
          claimed name - no secret at all. The authority reads the request and
          issues a certificate. The private key never moved; the request
          travelled. That is precisely why a real authority can sit on a machine
          with no network connection.
        </Paragraph>

        <SubSectionHeading>Reading a certificate</SubSectionHeading>

        <CodeBlockWithCopy compact code={awsVpnBastionCertInspect} />

        <Paragraph>
          Two other choices are worth explaining.{" "}
          <Strong>ECDSA over RSA</Strong>: a P-256 key gives roughly the
          security of a 3072-bit RSA key at a fraction of the size and compute,
          which means faster handshakes on a small instance - and it sidesteps
          Diffie-Hellman parameter generation entirely, which is the step that
          makes older tutorials sit and wait for ten minutes. And{" "}
          <Strong>the server key cannot have a passphrase</Strong>, because the
          daemon starts unattended at boot with nobody present to type one. The
          authority's key is used interactively, so it can and should be
          protected.
        </Paragraph>

        <Banner title="The prompt that catches everyone" variant="warning">
          <Paragraph>
            You are asked for a Common Name when creating the authority, and
            again when creating the server certificate - near-identical prompts
            a few commands apart. Answer the second one with the authority's
            name and you get a server certificate whose subject equals its
            issuer.
          </Paragraph>
          <Paragraph>
            It still works, because OpenVPN does not check the name unless you
            ask it to. But you can no longer tell the authority from the server
            in logs, name verification becomes meaningless, and anyone who knows
            PKI spots it instantly. The default offered in brackets at the
            second prompt is correct - just press Enter. Guides ought to warn
            about this and almost none do.
          </Paragraph>
        </Banner>

        {/* ── 9. Server configuration ───────────────────────────────────────── */}
        <SectionHeading>The Server Configuration</SectionHeading>

        <Paragraph>
          An OpenVPN configuration looks like twenty-five unrelated directives.
          It is really <Strong>four questions</Strong>, and sorting any config
          into those buckets makes it readable: where do I listen, who am I, who
          do I let in, and how do I behave.
        </Paragraph>

        <CodeBlockWithCopy code={awsVpnBastionServerConfManual} />

        <Paragraph>
          A few of those are doing more work than they look.
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>server 10.8.0.0 255.255.255.0</InlineHighlight> is
            a <Strong>macro</Strong>. It expands into five other directives,
            which is why OpenVPN configurations are shorter than you expect. The
            pool it defines must not overlap the VPC - the collision problem
            from the first section, made concrete.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>topology subnet</InlineHighlight> gives each client
            one address, like a normal network. The legacy alternative burns a
            /30 per client, a Windows compatibility hangover. Set it explicitly.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>remote-cert-tls client</InlineHighlight> enforces
            the extended key usage field from the previous section. Without it,
            somebody holding a <Strong>server</Strong> certificate signed by
            your authority could connect as a client.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>crl-verify</InlineHighlight> is the one to get
            right. Omit it and revoked certificates keep working, which makes
            your whole revocation story a fiction.
          </TextListItem>
        </TextList>

        <Banner title="Privilege dropping forces two other directives">
          <Paragraph>
            OpenVPN starts as root - it has to, to open the tunnel device and
            bind a privileged port - then drops to an unprivileged user. But on
            an internal restart, which{" "}
            <InlineHighlight>keepalive</InlineHighlight> can trigger, it would
            need to re-read its keys and re-open the tunnel device, and as an
            unprivileged user it can do neither.
          </Paragraph>
          <Paragraph>
            So <InlineHighlight>user nobody</InlineHighlight>,{" "}
            <InlineHighlight>persist-key</InlineHighlight> and{" "}
            <InlineHighlight>persist-tun</InlineHighlight> always travel
            together. The first without the other two gives you a configuration
            that works perfectly until the first network blip, then dies with an
            error about a missing file that exists and is perfectly readable by
            root.
          </Paragraph>
          <Paragraph>
            It is also why the revocation list must be world-readable rather
            than root-only. OpenVPN re-reads it on every single connection -{" "}
            <Strong>after</Strong> dropping privileges. Get the permissions
            wrong and every client is rejected after the next restart, with a
            permissions error buried in the log.
          </Paragraph>
        </Banner>

        <SubSectionHeading>
          The unit file overrides your config
        </SubSectionHeading>

        <Paragraph>
          Worth knowing early, because it wasted time twice in this build. The
          service is started by a systemd <Strong>template unit</Strong>, and
          the arguments in that unit are passed on the command line - which{" "}
          <Strong>overrides directives in the configuration file</Strong>.
        </Paragraph>

        <Paragraph>
          In this case the status file path set in the configuration did
          nothing, because the unit specifies a different one. The same unit
          also suppresses timestamps, which is why the log file has none.
          Neither is a bug; both look like one.{" "}
          <InlineHighlight>systemctl cat</InlineHighlight> should be an early
          move whenever a service behaves differently from its configuration,
          and it comes back in the two-factor section for a much more
          interesting reason.
        </Paragraph>

        <SubSectionHeading>
          One warning to deliberately ignore
        </SubSectionHeading>

        <Paragraph>
          The log will suggest adding a fallback cipher for compatibility with
          old clients. Do not take that advice. The cipher it proposes is a
          64-bit block cipher with a known weakness, and adding it lets a client
          negotiate down to broken cryptography. The note exists for people with
          pre-2.5 clients; the correct action here is none.
        </Paragraph>

        <Paragraph>
          Being able to say{" "}
          <Strong>
            I read that warning and deliberately did not act on it, because the
            fallback it suggests is weaker than failing
          </Strong>{" "}
          is a better position than having a clean log. Plenty of people paste
          flags out of log output without asking what they do.
        </Paragraph>

        {/* ── 10. The first client ──────────────────────────────────────────── */}
        <SectionHeading>The First Client</SectionHeading>

        <Paragraph>
          A client profile is a configuration file with the certificates pasted
          inside it. One file rather than four, because asking a colleague to
          keep four files in the right relative paths is how support tickets are
          made.
        </Paragraph>

        <Banner title="The profile is a credential" variant="warning">
          <Paragraph>
            It contains a private key. Never email it, never drop it in Slack,
            never commit it. That is why the client key gets a passphrase - and
            it is the argument for the second factor later, because with
            certificate-only authentication{" "}
            <Strong>that file is your network</Strong>. Whoever copies it is on
            your VPN.
          </Paragraph>
          <Paragraph>
            Delete the copy from the server once it has been delivered. The PKI
            can regenerate it at any time.
          </Paragraph>
        </Banner>

        <Paragraph>
          Client keys get a passphrase and server keys cannot have one, for the
          reason given earlier: a human is present when a client connects, so
          there is no excuse. It is also what makes a stolen profile inert.
        </Paragraph>

        <Paragraph>
          Two directives on the client side are worth calling out.{" "}
          <InlineHighlight>nobind</InlineHighlight> tells the client not to
          reserve a fixed local port, which is essential behind NAT - and every
          home router is NAT. The server must bind a known port so clients can
          find it; the client must not, because it needs whatever source port
          the router assigns. And{" "}
          <InlineHighlight>remote-cert-tls server</InlineHighlight> is the
          mirror of the server's own check, stopping you connecting to an
          impostor holding a client certificate.
        </Paragraph>

        <Paragraph>
          The <InlineHighlight>remote</InlineHighlight> line can be a hostname
          rather than an address. Worth doing if you have a domain to hand: the
          endpoint then stops being baked into every profile you have issued,
          and rebuilding the server becomes a DNS change rather than a reissuing
          exercise.
        </Paragraph>

        <SubSectionHeading>
          The checkpoint that teaches the most
        </SubSectionHeading>

        <CodeBlockWithCopy compact code={awsVpnBastionFirstConnect} />

        <Paragraph>
          The client's own routing table shows exactly why, and it contains one
          entry that is worth understanding properly.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionRoutePrint} />

        {/* ── 11. Routing, forwarding and NAT ───────────────────────────────── */}
        <SectionHeading>Routing, Forwarding and NAT</SectionHeading>

        <Paragraph>
          Three things are missing, not one, and each fails differently. Adding
          them one at a time is the only way to know which one fixed it.
        </Paragraph>

        <CodeBlockWithCopy code={awsVpnBastionThreeFixes} />

        <Banner title="The verification that proves nothing" variant="warning">
          <Paragraph>
            After pushing the route, pinging the VPN server's VPC address starts
            working - and not for the reason you would assume. That packet is
            addressed to the server <Strong>itself</Strong>. It arrives on the
            tunnel interface, the kernel sees a destination belonging to one of
            its own interfaces, and answers locally.{" "}
            <Strong>Nothing was forwarded.</Strong> IP forwarding is not
            involved at all.
          </Paragraph>
          <Paragraph>
            To test reaching <Strong>past</Strong> the server you need a
            different target. The VPC DNS resolver at base-plus-two is real, is
            in your VPC, and is not the VPN server - which makes it the right
            thing to aim at.
          </Paragraph>
        </Banner>

        <SubSectionHeading>Why forwarding alone still fails</SubSectionHeading>

        <Paragraph>
          With forwarding enabled the packet genuinely is forwarded. It leaves
          the instance's network interface with a source address in the VPN
          client pool, and AWS drops it, for two independent reasons.
        </Paragraph>

        <Paragraph>
          First, <Strong>the source/destination check</Strong>. Every network
          interface verifies that traffic it emits carries the instance's own
          address as the source. A VPN client address is not the instance's
          address, so the VPC fabric discards it and you never see it. Second,
          even if it got through, the reply would be addressed to a client pool
          address that nothing in the VPC has a route for.
        </Paragraph>

        <Paragraph>
          This is why "I turned on IP forwarding and it still does not work" is
          such a common dead end on AWS specifically. On an ordinary network,
          forwarding plus a return route is enough. Here the interface check
          blocks you first.
        </Paragraph>

        <SubSectionHeading>The part most guides get wrong</SubSectionHeading>

        <Paragraph>
          The fix is to rewrite the source address as the packet leaves, so
          every packet genuinely originates from the instance's own address.
          Which produces a result worth stating clearly, because nearly every
          guide to running OpenVPN on EC2 says the opposite.
        </Paragraph>

        <Banner title="You do not need to disable the source/destination check">
          <Paragraph>
            Disabling it is only required when packets leave the interface
            addressed <Strong>from</Strong> somewhere else, which happens when a
            VPC route table points at the instance - a NAT instance, for
            example. Nothing in this design does that. The address rewriting
            happens before the packet leaves, so both halves of the check are
            satisfied and it stays enabled.
          </Paragraph>
          <Paragraph>
            There is one dependency worth knowing. The rule as written has no
            destination restriction, so VPC-bound traffic is translated exactly
            like internet-bound traffic. Narrow it to internet destinations only
            and VPC traffic becomes ordinary routed traffic - which{" "}
            <Strong>would</Strong> then need the check disabled and explicit
            route table entries.
          </Paragraph>
        </Banner>

        <Paragraph>
          That is a much better answer to give than "I disabled the check". Not
          the setting, but precisely when it applies.
        </Paragraph>

        <SubSectionHeading>
          The chain, and how to find the break
        </SubSectionHeading>

        <CodeBlockWithCopy compact code={awsVpnBastionTcpdump} />

        <Paragraph>
          One more decision hides in here. Pushing a default route sends{" "}
          <Strong>all</Strong> the client's internet traffic through the VPN,
          which is a full tunnel; pushing only the VPC range sends just that,
          which is a split tunnel. The first gives you a single egress point to
          monitor and costs you bandwidth at cloud rates. The second is cheaper
          and faster and means the client's general browsing never touches your
          infrastructure. Either is defensible. Choosing by default is not.
        </Paragraph>

        {/* ── 12. The bastion ───────────────────────────────────────────────── */}
        <SectionHeading>The Bastion</SectionHeading>

        <Paragraph>
          The usual justification for a bastion - reduce the attack surface, one
          entry point instead of many - is true in general but hollow here,
          because the VPN already gives routed access to the whole private
          subnet. Better to be precise about what it actually buys.
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>One place to audit.</Strong> Every administrative session
            passes through one host, so the logs have somewhere to live. Spread
            access across ten machines and you have ten log sources and no
            timeline.
          </TextListItem>
          <TextListItem>
            <Strong>One place to revoke.</Strong> Remove a key from the bastion
            and access to everything behind it stops.
          </TextListItem>
          <TextListItem>
            <Strong>A hardening target.</Strong> It is worth investing in one
            host when it is the only door.
          </TextListItem>
        </TextList>

        <Paragraph>
          What it does <Strong>not</Strong> buy in this design is narrower
          network reach. The route pushed to clients covers the whole VPC, so a
          connected client can already reach anything the security groups
          permit. Scoping routes per client is a different tool, and claiming
          the bastion does it would be overclaiming.
        </Paragraph>

        <SubSectionHeading>
          Why VPN clients match a group-sourced rule
        </SubSectionHeading>

        <Paragraph>
          The bastion's rule permits SSH from the VPN server's{" "}
          <Strong>security group</Strong>. But your laptop is on the VPN client
          pool - it has no security group, and it is not in AWS at all. So how
          does it get through?
        </Paragraph>

        <Paragraph>
          Because of the address rewriting from the previous section. By the
          time the traffic reaches the bastion's network interface, its source
          is the VPN server's own private address, which <Strong>is</Strong> in
          that security group.
        </Paragraph>

        <Banner title="Two things built separately turn out to be one mechanism">
          <Paragraph>
            That NAT rule is not just about return routing. It is what makes
            security-group-based access control work for VPN clients at all.
            Remove it and traffic arrives from an address belonging to no
            security group, and the bastion drops it.
          </Paragraph>
        </Banner>

        <SubSectionHeading>
          Security groups do not apply to tunnelled traffic on the VPN host
        </SubSectionHeading>

        <Paragraph>
          A subtlety that changes how you reason about the VPN box itself. A
          security group filters a <Strong>network interface</Strong>. From that
          interface's point of view, everything inside the tunnel is a single
          permitted UDP flow on port 1194. Once OpenVPN decrypts it and hands it
          to the local network stack through the tunnel device, there is no
          network interface in the path - and security groups do not attach to
          tunnel devices.
        </Paragraph>

        <Paragraph>
          So services running on the VPN server are exposed to every VPN client
          automatically, protected by the host firewall and by the fact that
          only VPN clients can reach them - <Strong>not</Strong> by the security
          group. Traffic to the bastion is different, because it leaves the
          tunnel, gets rewritten, and crosses the real VPC network, so it passes
          through an interface and the groups apply fully. That is what makes
          the rule meaningful.
        </Paragraph>

        <SubSectionHeading>A rule that is easy to miss</SubSectionHeading>

        <Paragraph>
          The bastion's inbound rule does not imply the reverse. Hopping from
          the bastion back to the VPN server needs a <Strong>separate</Strong>{" "}
          rule on the VPN server's group, permitting SSH from the bastion's
          group. Without it the hop <Strong>hangs</Strong> rather than being
          refused, because the packets never arrive - and the
          timeout-versus-refused distinction from the security groups section
          points straight at it.
        </Paragraph>

        {/* ── 13. Jumping and tunnelling ────────────────────────────────────── */}
        <SectionHeading>Jumping and Tunnelling</SectionHeading>

        <Paragraph>
          The wrong answer first: copying your private key onto the bastion.
          Never. That key opens every host in the stack, so it would then exist
          anywhere root on the bastion can read, in every backup and snapshot of
          it, on the machine most exposed to other people's sessions - and you
          would never know it had been copied.
        </Paragraph>

        <Paragraph>
          <Strong>
            A private key belongs on exactly one machine: the one you are
            sitting at.
          </Strong>{" "}
          Everything below exists so you never have to break that rule.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionProxyJump} />

        <Paragraph>
          The difference between the two is{" "}
          <Strong>where authentication happens</Strong>. With agent forwarding,
          the bastion authenticates to the target using your agent. With
          ProxyJump the bastion forwards encrypted bytes and your laptop
          authenticates end to end - so the bastion never gets the chance to
          sign anything. Use ProxyJump where you can, and agent forwarding where
          you cannot; knowing why one is safer is the part worth carrying.
        </Paragraph>

        <SubSectionHeading>
          Port forwarding, and the thing everyone gets wrong
        </SubSectionHeading>

        <CodeBlockWithCopy compact code={awsVpnBastionLocalForward} />

        <Paragraph>
          There are three forward types and it is worth knowing all of them.{" "}
          <InlineHighlight>-L</InlineHighlight> opens a port here and
          connections emerge there, which is around 95% of real usage.{" "}
          <InlineHighlight>-R</InlineHighlight> is the reverse - a port opened
          there, emerging here - which is how people accidentally expose
          internal services, and why it does not listen publicly by default. And{" "}
          <InlineHighlight>-D</InlineHighlight> gives you a SOCKS proxy, where
          the far end connects wherever each request asks, with no per-port
          setup.
        </Paragraph>

        <Banner title="Two agents do not talk to each other">
          <Paragraph>
            A real failure from this build: the key was loaded into Git Bash's
            agent, and the connection was made with PuTTY, which uses Pageant.
            Separate agents from separate implementations - one uses a socket
            and OpenSSH's protocol, the other uses Windows named pipes and
            PuTTY's. Neither can see the other's keys, and the symptom on the
            bastion is an empty agent socket variable and a key list that will
            not load.
          </Paragraph>
          <Paragraph>
            PuTTY's agent forwarding is also off by default, and saving the
            session matters or you re-tick it every time.
          </Paragraph>
        </Banner>

        {/* ── 14. Two-factor ────────────────────────────────────────────────── */}
        <SectionHeading>Adding a Second Factor</SectionHeading>

        <Paragraph>
          Be honest about what this is. A certificate is something you have - a
          file. A time-based code is something you have - a seed on a phone.
          Arguably two "have" factors rather than the textbook pair, and it is
          not worth overclaiming.
        </Paragraph>

        <Paragraph>
          The real argument needs no taxonomy. With certificate-only
          authentication, the profile file <Strong>is</Strong> your network.
          With a second factor, that file alone is useless. That is what makes
          carrying a profile on a laptop acceptable, and it retroactively
          justifies the passphrase on the client key - layered, independent
          failures required.
        </Paragraph>

        <SubSectionHeading>How the codes work</SubSectionHeading>

        <Paragraph>
          A secret is shared once, by QR code. After that, both ends combine
          that secret with the current time in thirty-second windows and compute
          the same six digits <Strong>independently</Strong>. Nothing is
          transmitted; there is no "sending a code". Which means it works
          offline, and it depends entirely on both clocks agreeing. A minute of
          drift rejects every code, and no error message mentions time - which
          is why the outbound NTP rule from the security groups section is
          load-bearing.
        </Paragraph>

        <CodeBlockWithCopy code={awsVpnBastionAddUserManual} />

        <Paragraph>
          The accounts created in step two are <Strong>not</Strong> login
          accounts - no password, no shell. They exist purely so the
          authentication stack has a name to resolve.
        </Paragraph>

        <CodeBlockWithCopy code={awsVpnBastionPamManual} />

        <SubSectionHeading>The random hourly disconnect</SubSectionHeading>

        <Paragraph>
          OpenVPN renegotiates keys every hour by default, and with this
          authentication plugin in place that{" "}
          <Strong>re-runs authentication</Strong> - so users get re-prompted for
          a code mid-session. Setting the renegotiation interval to zero means
          "I defer to the other side", so setting it on the server alone is not
          enough: if the client still has the default, the client's value
          governs. Set it on <Strong>both</Strong> peers, and pair it with
          disabling credential caching, or the client silently retries an
          expired code on reconnect.
        </Paragraph>

        <Banner title="Do this over the break-glass door" variant="warning">
          <Paragraph>
            Enabling the plugin restarts OpenVPN and drops every connected
            client, including you. Do the work over the direct SSH connection to
            the Elastic IP, which does not traverse the tunnel and therefore
            survives the restart. Keep it open until a client has successfully
            authenticated with both factors.
          </Paragraph>
          <Paragraph>
            This is the break-glass rule doing exactly the job it exists for. A
            design with no exceptions is not purer. It is unrecoverable.
          </Paragraph>
        </Banner>

        <SubSectionHeading>The hardest bug in the build</SubSectionHeading>

        <Paragraph>
          Worth recounting, because the shape of it generalises. Authentication
          failed with a message saying the secret file could not be read. The
          file existed. Its permissions were correct. The service runs as root,
          and root could read it from a shell without any trouble.
        </Paragraph>

        <Paragraph>
          The first real cause was that creating the secret with{" "}
          <InlineHighlight>sudo -u</InlineHighlight> does not change the home
          directory, so the file had been written into the wrong user's home
          while the authentication stack looked in the right one. Fixing that
          got the file into the right place, and it still failed.
        </Paragraph>

        <Paragraph>
          The reasoning that eventually cracked it: a root process that cannot
          read a file it plainly has permission to read means something{" "}
          <Strong>above the permission layer</Strong> is in the way. My first
          guess was a mandatory access control profile, which was wrong - Ubuntu
          ships none for OpenVPN. The actual cause was{" "}
          <InlineHighlight>ProtectHome=true</InlineHighlight> in the systemd
          unit, which mounts an empty filesystem over{" "}
          <InlineHighlight>/home</InlineHighlight> for that service. Inside the
          unit, <InlineHighlight>/home</InlineHighlight> is empty - even for
          root. The shell sees the real one; the daemon sees nothing.
        </Paragraph>

        <Banner title="Not visible is a different problem from not permitted">
          <Paragraph>
            "Failed to read" from a sandboxed process usually means the file is
            not <Strong>visible</Strong>, not that the permissions are wrong.
            Different question, different fix - and the fix here is better than
            the one most guides reach for. Rather than weakening the sandbox,
            relocate the secrets out of <InlineHighlight>/home</InlineHighlight>{" "}
            entirely. One place to back up and audit, the sandbox stays intact,
            and the accounts no longer need home directories at all.
          </Paragraph>
          <Paragraph>
            This is the second time in this build that the unit file overrode
            the configuration. <InlineHighlight>systemctl cat</InlineHighlight>{" "}
            earns its place as a reflex.
          </Paragraph>
        </Banner>

        {/* ── 15. Proving it ────────────────────────────────────────────────── */}
        <SectionHeading>Proving It Is Locked Down</SectionHeading>

        <Paragraph>
          An architecture diagram is a claim. These are the three pieces of
          evidence that turn it into a demonstration, and each proves something
          slightly different.
        </Paragraph>

        <CodeBlockWithCopy compact code={awsVpnBastionProof} />

        <Paragraph>
          The routing table is the interesting one, because it shows the
          mechanism rather than the outcome. The route to the private network
          was pushed by the server during the handshake and removed when the
          tunnel closed. It was never configured on the laptop and there is
          nothing to leave behind.
        </Paragraph>

        <Paragraph>
          There is a fourth piece of evidence worth knowing about even though it
          is an absence. If you enable flow logs and then try to reach the
          bastion from the internet, you will find{" "}
          <Strong>no log record at all</Strong> - not a rejection, nothing. A
          rejection requires a packet to arrive at a network interface and be
          dropped by a security group. Here no packet ever arrives, because no
          route exists to carry it. To produce a rejection you have to already
          be on the VPN and aim at a port that is not permitted.
        </Paragraph>

        <Paragraph>
          Which is the whole argument, restated in the negative. The bastion is
          not absent from the logs because the logging is broken. It is absent
          because nothing ever reached it.
        </Paragraph>

        <EngineeringDecisions
          title="Notable Design Decisions"
          decisions={vpnBastionDecisions}
        />

        {/* ── Close ─────────────────────────────────────────────────────────── */}
        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          The thing that kept repeating, and which I did not expect going in, is
          that every hard problem in this build was{" "}
          <Strong>one layer below where I was looking</Strong>. Not a firewall
          rule but a missing route. Not permissions but visibility. Not the
          configuration but the unit file that overrode it. Not forwarding but
          local delivery answering a ping that proved nothing. Not a bypassed
          security group but a connection that started somewhere else entirely.
        </Paragraph>

        <Paragraph>
          The other one is smaller and keeps proving itself: the difference
          between knowing a command and knowing what it is for. Knowing the
          address-rewriting rule by heart is worth very little. Knowing that
          traffic leaving the tunnel has to acquire a source address the VPC
          will accept means you can derive that rule, or recognise its absence
          in the six-link chain, without having memorised anything.
        </Paragraph>

        <Paragraph>
          If you build this, destroy it afterwards. Almost all the cost is the
          NAT gateway, which bills whether or not traffic flows and cannot be
          stopped - only deleted. Release the Elastic IPs too, because a
          detached address still bills. And delete the local profile files: they
          are inert once the certificate authority is gone, and leaving
          credential-shaped files lying around is exactly the habit this whole
          build argues against.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSVPNBastion;
