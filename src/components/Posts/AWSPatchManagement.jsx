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
  PostImage,
} from "../BlogLayout/BlogLayout";

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
import { AWSSVG, AWSSSMSVG, AWSEC2SVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";

// screenshots
import Tags from "../../resources/images/blog/AWSPatchManagement/aws_patch_mangement_tags.jpeg";
import PatchGroups from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_groups.jpeg";
import BaselineId from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_baselineid.jpeg";
import MaintenanceWindows from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_mw.jpeg";
import MaintenanceWindowDescription from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_mw_description.jpeg";
import MaintenanceWindowTargets from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_mw_targets.jpeg";
import MaintenanceWindowEditTargets from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_mw_edit_targets.jpeg";
import MaintenanceWindowHistory from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_mw_history.jpeg";
import AutomationExecutionsList from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_automation.jpeg";
import AutomationExecutionDetail from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_automation_executions.jpeg";
import AutomationDocuments from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_documents.jpeg";
import AutomationDocumentGraph from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_document_name.jpeg";
import ChangeCalendar from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_change_calendar.jpeg";
import ChangeCalendarCreateEvent from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_change_calendar_create_event.jpeg";
import ChangeCalendarCreateEventDetail from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_change_calendar_create_event2.jpeg";
import ChangeCalendarGateBehaviour from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_change_calendar_gate_behaviour.jpeg";
import StateManagerAssociations from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_state_manager_associations.jpeg";
import Notifications from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_notifications.jpeg";
import EmailConfirmation from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_email_confirmation.jpeg";
import PatchManagerDashboard from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_patch_manager.jpeg";
import PatchManagerComplianceSummary from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_patch_manager_compliance.jpeg";
import ComplianceReporting from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_compliance_reporting.jpeg";
import ComplianceReportExport from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_compliance_reporting_report.jpeg";
import ResourceDataSyncSetting from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_resource_data_sync.jpeg";
import ResourceDataSyncDetail from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_resource_data_sync2.jpeg";
import InventoryDashboard from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_inventory_dashboard.jpeg";
import InventoryDetailedView from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_inventory_detailed_view.jpeg";
// import FleetManager from "../../resources/images/blog/AWSPatchManagement/aws_patch_management_fleet_manager.jpeg";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AWSPatchManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/aws-patch-management");
    Analytics.track("blog_page_viewed", { slug: "aws-patch-management" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>AWS Patch Management</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSSMSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSEC2SVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          This post covers how software vulnerabilities are discovered, scored,
          and tracked, and then walks through a tag-driven, ring-based patching
          process I built for an EC2 fleet using AWS Systems Manager.
        </Paragraph>

        <SectionHeading>What is Patching?</SectionHeading>

        <Paragraph>
          EC2 instances run software installed as packages. Packages have
          version numbers -{" "}
          <InlineHighlight>openssl-3.0.7-1.amzn2023</InlineHighlight> for
          example. When a security vulnerability is found in a specific version,
          the maintainers release a new version with the fix. Installing that
          new version is what "patching" means. The vulnerability doesn't
          disappear from the old version, it just isn't present in the new one.
        </Paragraph>

        <Paragraph>
          This is something that comes with the territory when running EC2
          instances and one of the reasons why people prefer containerised
          services like AWS ECS (unless it's ECS on the EC2 launch type) so they
          don't have to manage patching.
        </Paragraph>

        <SectionHeading>
          The CVE Lifecycle (From Discovery to Your Instance)
        </SectionHeading>

        <Paragraph>
          Every publicly disclosed security vulnerability gets a unique
          identifier: <InlineHighlight>CVE-YYYY-NNNNN</InlineHighlight>. CVE
          stands for Common Vulnerabilities and Exposures. These identifiers are
          assigned by CVE Numbering Authorities - organisations like Red Hat,
          Microsoft, GitHub, and Amazon who are authorised to register
          vulnerabilities found in their products. Once assigned, the CVE and
          its details are published to the National Vulnerability Database (NVD)
          at nvd.nist.gov, where it receives a severity score.
        </Paragraph>

        <Paragraph>
          Amazon is a CVE Numbering Authority (CNA). When a vulnerability is
          found in software that ships with AWS-managed AMIs, Amazon releases a
          patched package, publishes a security advisory, and updates the SSM
          patch metadata that Patch Manager uses to classify packages as
          security fixes. You do not need to monitor the NVD directly - SSM does
          it for you. But understanding the source helps when a CVE is published
          and you need to assess your exposure before the next maintenance
          window fires.
        </Paragraph>

        <Banner title="Soak Period" variant="info">
          <Paragraph>
            The <Strong>soak period</Strong> is the waiting time between when a
            patch is released and when installation happens. It gives people
            time to discover potential issues in a new patch before it reaches
            critical instances.
          </Paragraph>
        </Banner>

        <SectionHeading>
          CVSS Scoring (Reading the Severity Number)
        </SectionHeading>

        <Paragraph>
          Every CVE receives a score from 0.0 to 10.0 using the Common
          Vulnerability Scoring System. The score is calculated from eight
          factors that describe how the vulnerability can be exploited and what
          damage it can cause. Understanding how the score is calculated matters
          because a 9.8 that requires physical access to exploit is considerably
          less urgent than a 7.5 that is remotely exploitable with active
          exploit code already in the wild.
        </Paragraph>

        <SubSectionHeading>The 8 CVSS Vectors</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Attack Vector (AV)</Strong> - how far away does an attacker
            need to be? Network (N) = from the internet. Adjacent (A) = must be
            on the same network. Local (L) = must have shell access. Physical
            (P) = must physically touch the machine.
          </TextListItem>
          <TextListItem>
            <Strong>Attack Complexity (AC)</Strong> - how hard is the attack?
            Low (L) = no special conditions. High (H) = requires specific
            configuration or race conditions.
          </TextListItem>
          <TextListItem>
            <Strong>Privileges Required (PR)</Strong> - does the attacker need
            an account? None (N) = no. Low (L) = regular user. High (H) = admin.
          </TextListItem>
          <TextListItem>
            <Strong>User Interaction (UI)</Strong> - does a user need to do
            something? None (N) = fully automated. Required (R) = a user must
            click something.
          </TextListItem>
          <TextListItem>
            <Strong>Scope (S)</Strong> - can the vulnerability escape the
            vulnerable component and affect others? Unchanged (U) = contained.
            Changed (C) = can escape.
          </TextListItem>
          <TextListItem>
            <Strong>Confidentiality (C)</Strong> - can the attacker read data?
            None / Low / High.
          </TextListItem>
          <TextListItem>
            <Strong>Integrity (I)</Strong> - can the attacker modify data? None
            / Low / High.
          </TextListItem>
          <TextListItem>
            <Strong>Availability (A)</Strong> - can the attacker cause denial of
            service? None / Low / High.
          </TextListItem>
        </TextList>

        <SectionHeading>
          SSM Agent - How AWS Reaches Your Instances
        </SectionHeading>

        <Paragraph>
          The SSM Agent is a background process (
          <InlineHighlight>amazon-ssm-agent</InlineHighlight>) that runs on your
          EC2 instance and <Strong>connects outbound over HTTPS</Strong>. This
          is the component that receives and executes instructions from SSM
          features like Patch Manager and Run Command. Some images will have
          this already baked in, but others you might need to create a script to
          install on boot.
        </Paragraph>

        <Paragraph>
          It's important that the server itself has outbound HTTPS access,
          otherwise instances will never appear as managed in SSM. Every
          instance also needs an IAM instance profile carrying the{" "}
          <InlineHighlight>AmazonSSMManagedInstanceCore</InlineHighlight>{" "}
          managed policy. This grants the agent permission to register itself
          with SSM, download agent updates from S3, and write command output to
          CloudWatch Logs. IAM roles and instance profiles are covered in the{" "}
          <TextLink href="/blog/aws-identity-access-management">
            IAM post
          </TextLink>
          .
        </Paragraph>

        <Banner title="Private subnets without NAT" variant="warning">
          <Paragraph>
            If your instances are in private subnets without a NAT gateway, the
            SSM endpoints are unreachable and no instance will appear as
            managed. The fix is three VPC Interface Endpoints - one each for{" "}
            <InlineHighlight>ssm</InlineHighlight>,{" "}
            <InlineHighlight>ec2messages</InlineHighlight>, and{" "}
            <InlineHighlight>ssmmessages</InlineHighlight>. These create private
            connections from your VPC directly to AWS services, bypassing the
            internet entirely.
          </Paragraph>
        </Banner>

        <SectionHeading>Ring Strategy</SectionHeading>

        <Paragraph>
          Not all instances are the same - some are critical in terms of up-time
          and some are not as valuable and can be rebooted or torn down anytime.
          You might not want to run the risk of applying a patch straight away
          to important servers, unless you can say you're absolutely confident
          it won't break anything. So there has to be a way to patch instances
          in your environment that accommodates for all types of instances - and
          that's where we can use Rings.
        </Paragraph>

        <Paragraph>
          I split my EC2's into two rings. <Strong>Ring 0</Strong> covers
          non-production instances where I'm happy to allow updates to be
          applied without any manual approval. <Strong>Ring 1</Strong> covers
          production, and is designed to only allow patches to be installed
          inside a window that's been explicitly authorised.
        </Paragraph>

        <SectionHeading>Tags</SectionHeading>

        <Paragraph>
          Every part of this setup - which baseline applies, which ring an
          instance belongs to, whether it patches at all - is driven by three
          tags on the instance:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>PatchGroup</InlineHighlight> - maps the instance to
            a patch baseline
          </TextListItem>
          <TextListItem>
            <InlineHighlight>PatchRing</InlineHighlight> - 0 for non-production,
            1 for production
          </TextListItem>
          <TextListItem>
            <InlineHighlight>PatchEnabled</InlineHighlight> - a simple on/off
            switch, so patching can be paused for a specific instance without
            removing it from its group
          </TextListItem>
        </TextList>

        <PostImage
          src={Tags}
          alt="EC2 instance tags showing PatchRing, PatchEnabled, and PatchGroup"
        />

        <SectionHeading>Patch Baselines</SectionHeading>

        <Paragraph>
          A patch baseline defines which patches are approved for instances.
          When SSM evaluates an instance, it compares the list of available
          packages against the baseline to determine which ones should be
          installed and which ones affect compliance. If a patch is in the
          baseline and not installed, the instance is non-compliant. If a patch
          is not in the baseline, SSM ignores it entirely.
        </Paragraph>

        <Paragraph>
          AWS provides default baselines for each supported OS. Although the
          default auto-approves Critical patches after zero days and High after
          seven days which sounds pretty prudent, but it could be risky - if a
          newly-released patch reaches production almost immediately without
          being 'soaked' in dev first, you could come to regret the decision.
          It's worth saying that you can use a custom baseline that lets you
          control the soak period per environment.
        </Paragraph>

        <PostImage
          src={BaselineId}
          alt="Windows default patch baseline showing a 7-day auto-approval delay for Critical and Important severity updates"
        />

        <SectionHeading>Patch Groups</SectionHeading>

        <Paragraph>
          A patch group is a named set of instances that share a baseline - it's
          what the <InlineHighlight>PatchGroup</InlineHighlight> tag above
          actually maps to. Rather than write custom baselines for this setup, I
          mapped each patch group straight to the AWS-managed default baseline
          for its OS -{" "}
          <InlineHighlight>AWS-UbuntuDefaultPatchBaseline</InlineHighlight> for
          the Ubuntu bastion host, and{" "}
          <InlineHighlight>AWS-DefaultPatchBaseline</InlineHighlight> for the
          Windows automation server:
        </Paragraph>

        <PostImage
          src={PatchGroups}
          alt="Patch Manager patch group associations: ubuntu-bastion mapped to the Ubuntu default baseline, windows-automation mapped to the Windows default baseline"
        />

        <SubSectionHeading>Scan vs Install</SubSectionHeading>

        <Paragraph>
          SSM Patch Manager has two operations. <Strong>Install</Strong> is what
          a maintenance window runs to apply patches. <Strong>Scan</Strong>
          reads the installed package list, compares it against the baseline,
          and writes the result to the compliance dashboard.
        </Paragraph>

        <Paragraph>
          In this setup, each patch group has its own dedicated scan window
          alongside its install window:
        </Paragraph>

        <PostImage
          src={MaintenanceWindows}
          alt="List of maintenance windows, including separate scan and install windows per patch group"
        />

        <SectionHeading>Maintenance Windows</SectionHeading>

        <Paragraph>
          A maintenance window is a scheduled time slot during which SSM will
          execute tasks against your managed instances. It's essentially a cron
          job managed by AWS - except it also handles concurrency limits, error
          thresholds, task ordering by priority, and notifications out of the
          box.
        </Paragraph>

        <PostImage
          src={MaintenanceWindowDescription}
          alt="Maintenance window description showing a Tuesday 1am UTC cron schedule, 2-hour duration, and 1-hour cutoff"
        />

        <Paragraph>
          I filter on both <InlineHighlight>PatchRing</InlineHighlight> and{" "}
          <InlineHighlight>PatchEnabled: true</InlineHighlight>, so a window
          only ever picks up instances that are both in-scope for that ring and
          explicitly opted in to patching:
        </Paragraph>

        <PostImage
          src={MaintenanceWindowEditTargets}
          alt="Edit targets screen showing instances selected by the PatchRing: 0 and PatchEnabled: true tags"
        />

        <Paragraph>
          Using <InlineHighlight>Specify instance tags</InlineHighlight> for
          target selection avoids using the instance IDs which can easily change
          when an instance stops or gets replaced.
        </Paragraph>

        <PostImage
          src={MaintenanceWindowTargets}
          alt="Maintenance window targets tab showing a single registered target"
        />

        <Paragraph>
          Execution history confirms whether a run actually happened, which
          targets were included, and whether it succeeded.
        </Paragraph>

        <PostImage
          src={MaintenanceWindowHistory}
          alt="Maintenance window execution history showing three successful runs"
        />

        <SectionHeading>Patch Compliance States</SectionHeading>

        <Paragraph>
          SSM assigns a compliance state to every (instance, patch) pair. These
          states are what you see in the Patch Manager dashboard and in
          compliance summaries:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>Installed</InlineHighlight> - the patch is
            installed and active. The new version is running.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>InstalledOther</InlineHighlight> - the patch is
            installed but was not required by the baseline (manually installed,
            or applied by another tool). Counts as compliant but worth
            monitoring for drift.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>InstalledPendingReboot</InlineHighlight> - SSM
            installed the package but it requires a reboot to take effect. The
            old vulnerable version is still running in memory. The instance
            shows as "patched" on paper but the vulnerable code is live.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>InstalledRejected</InlineHighlight> - the instance
            has a package that is in your{" "}
            <InlineHighlight>rejected_patches</InlineHighlight> list. Either the
            rejection list is wrong or something installed a package you
            explicitly blocked.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>Missing</InlineHighlight> - the baseline requires
            this patch but it is not installed. This is the state that triggers
            non-compliance.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>Failed</InlineHighlight> - SSM attempted to install
            the patch and the package manager returned an error. Common causes:
            package conflicts, disk space, network issues during download.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>NotApplicable</InlineHighlight> - the patch does
            not apply to this instance's OS version or architecture.
          </TextListItem>
        </TextList>

        <SectionHeading>Automation</SectionHeading>

        <Paragraph>
          Each patch policy has its own custom SSM Automation document, and that
          document is what a maintenance window's install task actually
          executes:
        </Paragraph>

        <PostImage
          src={AutomationDocuments}
          alt="SSM Documents list showing two custom automation documents, one per patch group"
        />

        <Paragraph>
          Opening a document shows its step graph -{" "}
          <InlineHighlight>installPatches</InlineHighlight>, an{" "}
          <InlineHighlight>aws:runCommand</InlineHighlight> call to{" "}
          <InlineHighlight>AWS-RunPatchBaseline</InlineHighlight> with{" "}
          <InlineHighlight>Operation: Install</InlineHighlight> and{" "}
          <InlineHighlight>RebootOption: RebootIfNeeded</InlineHighlight>:
        </Paragraph>

        <PostImage
          src={AutomationDocumentGraph}
          alt="Automation document graph showing Start, an installPatches aws:runCommand step calling AWS-RunPatchBaseline, and End"
        />

        <Paragraph>
          The Automation executions view is where I'd go to confirm a run
          followed the expected path per ring - for Ring 0, that's{" "}
          <InlineHighlight>installPatches</InlineHighlight> running with nothing
          in front of it. For Ring 1, the design is for a{" "}
          <InlineHighlight>checkCalendar</InlineHighlight> step to run first
          before <InlineHighlight>installPatches</InlineHighlight> is allowed to
          start.
        </Paragraph>

        <PostImage
          src={AutomationExecutionsList}
          alt="Automation executions list, mostly AWS Quick Setup housekeeping runs alongside the patch automation"
        />

        <Paragraph>
          Clicking into any execution gives the same step-level breakdown -
          action, status, start and end time per step:
        </Paragraph>

        <PostImage
          src={AutomationExecutionDetail}
          alt="Automation execution detail view showing per-step action, status, and timing"
        />

        <SectionHeading>Change Calendar</SectionHeading>

        <Paragraph>
          Change Calendar is a nice view of when your patching will take place.
          The calendar has a state which is either{" "}
          <InlineHighlight>DEFAULT_OPEN</InlineHighlight> or{" "}
          <InlineHighlight>DEFAULT_CLOSED</InlineHighlight>. For production
          (Ring 1) environments I will always use CLOSED and for non-production
          (Ring 0) I would opt for OPEN.
        </Paragraph>

        <PostImage
          src={ChangeCalendar}
          alt="Change Calendar showing the automation-patch-rollout-change-calendar in DEFAULT_OPEN state, with scan and Quick Setup events on the monthly view"
        />

        <Paragraph>
          Authorising a Ring 1 release means creating an event on the calendar
          with the patch details and the time period the installation is allowed
          to run in:
        </Paragraph>

        <PostImage
          src={ChangeCalendarCreateEvent}
          alt="Change Calendar events view with Create event highlighted"
        />

        <PostImage
          src={ChangeCalendarCreateEventDetail}
          alt="Create scheduled event form: event name, description, event type, and the start/end date and time that authorise the window"
        />

        <Paragraph>
          The intended ruleset is straightforward: Ring 0 (
          <InlineHighlight>PatchRing: 0</InlineHighlight>) skips the calendar
          check entirely and installs on schedule. Ring 1 (
          <InlineHighlight>PatchRing: 1</InlineHighlight>) requires the calendar
          to be open at execution time, and only patches during a window someone
          has explicitly authorised. Wiring that check into the gated documents
          is the next step before this setup is production-ready.
        </Paragraph>

        <PostImage
          src={ChangeCalendarGateBehaviour}
          alt="Execution detail for automation-ubuntu-bastion-install-gated showing a single installPatches step, with no calendar check present"
        />

        <SectionHeading>Inventory</SectionHeading>

        <Paragraph>
          Inventory is collected by a State Manager association running{" "}
          <InlineHighlight>AWS-GatherSoftwareInventory</InlineHighlight> on a
          schedule, targeting the same tagged scope as patching. It's separate
          from a patch Scan - this is a general software inventory, not a
          compliance check against a baseline:
        </Paragraph>

        <PostImage
          src={StateManagerAssociations}
          alt="State Manager associations running AWS-GatherSoftwareInventory, one per patch group"
        />

        <Paragraph>
          The Inventory dashboard summarises coverage - which instances are
          reporting, and how much of each inventory type has been collected:
        </Paragraph>

        <PostImage
          src={InventoryDashboard}
          alt="Inventory dashboard showing managed instances with inventory enabled and coverage per inventory type"
        />

        <Paragraph>
          The detailed view queries down to individual packages, versions, and
          publishers per instance - useful for answering "is this specific
          package version on this box" without connecting to it:
        </Paragraph>

        <PostImage
          src={InventoryDetailedView}
          alt="Inventory detailed view listing installed applications and package versions per instance"
        />

        <SectionHeading>Notifications</SectionHeading>

        <Paragraph>
          Every install step carries a{" "}
          <InlineHighlight>NotificationConfig</InlineHighlight> pointing at an
          SNS topic, firing on <InlineHighlight>Success</InlineHighlight> and{" "}
          <InlineHighlight>Failed</InlineHighlight>. It's set at the step level,
          so the same step that runs the patch is what raises the alert if it
          doesn't go as expected:
        </Paragraph>

        <PostImage
          src={Notifications}
          alt="installPatches step detail showing NotificationConfig with an SNS topic ARN and Success/Failed notification events"
        />

        <Paragraph>
          In practice that arrives as a plain Run Command notification email,
          with the command ID, document name, instance ID, and status in the
          body - enough to confirm what happened without opening the console:
        </Paragraph>

        <PostImage
          src={EmailConfirmation}
          alt="SNS email notification confirming a Run Command execution succeeded, with the command ID, document name, and instance ID in the payload"
        />

        <SectionHeading>Patch Reporting</SectionHeading>

        <Paragraph>
          Patch Manager's own dashboard shows compliance summary, noncompliance
          counts by reason, and a history of every scan and install operation,
          including which tags each one targeted:
        </Paragraph>

        <PostImage
          src={PatchManagerDashboard}
          alt="Patch Manager dashboard showing compliance summary, noncompliance counts, and recent scan/install operations targeted by tag"
        />

        <Paragraph>
          The Compliance reporting tab breaks the same data down per node:
        </Paragraph>

        <PostImage
          src={PatchManagerComplianceSummary}
          alt="Patch Manager compliance summary showing 100% compliant nodes, with the Compliance reporting tab highlighted"
        />

        <PostImage
          src={ComplianceReporting}
          alt="Compliance reporting tab listing both nodes as Compliant, with Export to S3 highlighted"
        />

        <PostImage
          src={ComplianceReportExport}
          alt="Exported patch compliance report opened in a spreadsheet, showing per-instance compliance status and severity counts"
        />

        <SectionHeading>Resource Data Sync</SectionHeading>

        <Paragraph>
          Resource Data Sync configures SSM to continuously deliver inventory
          and compliance data to S3, so it's queryable and retained
          independently of whatever the console currently shows. It's configured
          from Fleet Manager's Account management menu:
        </Paragraph>

        <PostImage
          src={ResourceDataSyncSetting}
          alt="Fleet Manager Account management menu with Resource data syncs highlighted"
        />

        <Paragraph>
          Checking the sync's status confirms it's actually delivering - last
          sync time, target S3 bucket, and format:
        </Paragraph>

        <PostImage
          src={ResourceDataSyncDetail}
          alt="Resource data sync detail showing a successful sync, target S3 bucket, and JSON SerDe format"
        />

        <SectionHeading>Quick Reference</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Fleet Manager</Strong> - connectivity and managed-node
            health
          </TextListItem>
          <TextListItem>
            <Strong>Inventory</Strong> - software inventory collection status
            and detail
          </TextListItem>
          <TextListItem>
            <Strong>Patch Manager</Strong> - compliance and patch status
          </TextListItem>
          <TextListItem>
            <Strong>State Manager</Strong> - association health for inventory
            collection
          </TextListItem>
          <TextListItem>
            <Strong>Maintenance Windows</Strong> - schedules, targets, and run
            history
          </TextListItem>
          <TextListItem>
            <Strong>Automation</Strong> - step-level execution verification
          </TextListItem>
        </TextList>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          This is just my own approach on how patch management can be handled,
          it's by no means perfect and it can be iterated on and improved, no
          doubt. But as always, if it's a topic I'm interested in, I'm inclined
          to want to write about it.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSPatchManagement;
