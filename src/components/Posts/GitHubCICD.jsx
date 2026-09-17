import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// components
import BackButton from "../Button/BackButton";
import { CodeBlockWithCopy } from "../Code/Code";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from "../BlogLayout/BlogLayout";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  Strong,
  Italic,
  TextLink,
  TextList,
  TextListItem,
  InlineHighlight,
  IndentedTextList,
  IndentedTextListItem,
  TertiaryHeading,
} from "../Typography/Typography";

// icons
import { GitHubSVG } from "../../resources/styles/icons";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const helloWorkflow = `# This is a basic workflow to help you get started with Actions
name: Hello Actions

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches:
      - main

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "say-hello"
  say-hello:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Runs a single command using the runners shell
      - name: Print a greeting
        run: echo "Hello from GitHub Actions!"
      
      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.`;

const basicNodeCiWorkflow = `name: Node CI

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --watch=false`;

const workflowTriggers = `on:
  # Trigger when commits are pushed directly to these branches
  push:
    branches:
      - main
      - develop
    # Only run for PRs that touch the app source code or dependency manifest
    paths:
      - 'src/**'
      - 'package.json'
  # Trigger when a PR is opened/updated targeting the main branch
  pull_request:
    branches:
      - main
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
    inputs:
      environment:
        description: 'Which environment to deploy to?'
        required: true
        default: 'staging'`;

const envSecretsExample = `# Global environment variables available to all jobs (unless overridden)
env:
  # Sets the Node environment mode used by many tools/frameworks (e.g. React/Node)
  NODE_ENV: test
  # Handy example of a custom env var you might reuse across steps/jobs
  APP_NAME: my-awesome-app

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Print env vars
        run: |
          echo "Node env is: \${NODE_ENV}"
          echo "App name is: \${APP_NAME}"

      - name: Use a secret
        env:
          # Pulls the secret from GitHub repo/environment secrets and exposes it as an env var
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: |
          # Demonstration only - in real workflows, never echo secrets to logs
          echo "Connecting to: \${DATABASE_URL}"`;

const cachingExample = `# Cache npm's download cache to speed up installs across workflow runs
- uses: actions/setup-node@v4
  with:
    node-version: 20
    # Enables built-in npm caching (no separate actions/cache step needed)
    cache: npm`;

const oidcConfigureAws = `permissions:
  # Allows GitHub to mint an OIDC JWT for this workflow (required for AWS OIDC role assumption)
  id-token: write
  # Allows the workflow to read your repository contents (needed by actions/checkout)
  contents: read

steps:
  - name: Checkout repo
    uses: actions/checkout@v4

  - name: Configure AWS credentials
    uses: aws-actions/configure-aws-credentials@v4
    with:
      # The IAM role in your AWS account that trusts GitHub OIDC (this is what the workflow assumes)
      role-to-assume: arn:aws:iam::123456789012:role/GitHubOIDCRoleDevelop
      # The AWS region all subsequent AWS CLI / SDK commands will run against
      aws-region: eu-west-1`;

const reusableWorkflowCaller = `name: Reuse CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  call-shared-ci:
    # Calls a reusable workflow defined in another repo (or the same repo)
    # Format: owner/repo/path/to/workflow.yml@ref (branch, tag, or SHA)
    uses: your-org/your-repo/.github/workflows/shared-node-ci.yml@main
    with:
      node-version: 20
    secrets:
      # Passes this repo's secret into the reusable workflow (must be defined under 'on: workflow_call: secrets:')
      DATABASE_URL: \${{ secrets.DATABASE_URL }}`;

const reusableWorkflowDefinition = `name: Shared Node CI

on:
  workflow_call:
    # Inputs the calling workflow can pass in via 'with:'
    inputs:
      node-version:
        required: true
        type: string
    # Secrets the calling workflow can pass in via 'secrets:'
    secrets:
      DATABASE_URL:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      # Checks out the repo contents so the runner can access your code
      - uses: actions/checkout@v4

      # Installs the requested Node version and enables built-in npm caching
      - uses: actions/setup-node@v4
        with:
          # Uses the version provided by the calling workflow
          node-version: \${{ inputs.node-version }}
          cache: 'npm'

      # Installs dependencies from package-lock.json (clean, reproducible installs)
      - name: Install deps
        run: npm ci

      # Runs your test suite and injects DATABASE_URL if it was provided by the caller
      - name: Run tests
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: npm test -- --watch=false`;

const GitHubCICD = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/github-ci-cd");
    Analytics.track("blog_page_viewed", { slug: "github-ci-cd" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>

      <AnimatedPostContainer>
        <HeaderRow>
          <PageTitle>GitHub CI/CD</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <GitHubSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          GitHub Actions has quietly become one of the most powerful tools in a
          modern developer's toolkit. It's where your tests run, your Docker
          images build, your infrastructure deploys, and your app quietly rolls
          out to production while you're making coffee.
        </Paragraph>

        <Paragraph>
          In this post, I'm going to lay out a learning path for GitHub Actions.
          By the end, you'll understand <Strong>how</Strong> workflows work,{" "}
          <Strong>when</Strong> to use them, and <Strong>how</Strong> it all
          fits together.
        </Paragraph>

        <Paragraph>
          <Italic>
            *It's important to note that you'll need to have some familiarity
            with GitHub and an existing repository to find this post useful.*
          </Italic>
        </Paragraph>

        <SectionHeading>Why CI/CD and Why GitHub Actions?</SectionHeading>

        <Paragraph>
          Before writing YAML, it's worth answering a simple question:{" "}
          <Strong>why bother?</Strong> CI/CD exists so you can:
        </Paragraph>

        <TextList>
          <TextListItem>
            Run tests on every change, not just on your machine.
          </TextListItem>
          <TextListItem>Catch bugs before they hit production.</TextListItem>
          <TextListItem>
            Build and ship your app on every merge without manual steps.
          </TextListItem>
          <TextListItem>
            Standardise how your team delivers software.
          </TextListItem>
        </TextList>

        <Paragraph>
          GitHub Actions lives <Strong>next to your code</Strong>. That means:
          workflows are versioned, reviewed, and changed with pull requests just
          like everything else. No separate CI server to maintain, no extra UI
          to learn - it's all in your repo.
        </Paragraph>

        <SectionHeading>
          Your First Workflow: Hello GitHub Actions
        </SectionHeading>

        <Paragraph>
          Let's start small. Every course has that first 'hello world' section.
          For GitHub Actions, it's a workflow that prints a message on every
          push to <InlineHighlight>main</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          Create a file called{" "}
          <InlineHighlight>.github/workflows/hello-actions.yml</InlineHighlight>
          :
        </Paragraph>

        <CodeBlockWithCopy code={helloWorkflow} />

        <Paragraph>
          Push this to GitHub, open the <Strong>Actions</Strong> tab, and you'll
          see your workflow run. Under the hood you've already used three core
          ideas:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Triggers</Strong> (the <InlineHighlight>on</InlineHighlight>{" "}
            block)
          </TextListItem>
          <TextListItem>
            <Strong>Jobs</Strong> (in this case,{" "}
            <InlineHighlight>say-hello</InlineHighlight>)
          </TextListItem>
          <TextListItem>
            <Strong>Steps</Strong> (each task inside a job)
          </TextListItem>
        </TextList>

        <SectionHeading>Anatomy of a Workflow File</SectionHeading>

        <Paragraph>
          A workflow file is just YAML, but it follows a specific shape. The key
          sections are:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>name</InlineHighlight> - how it appears in the
            Actions UI.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>on</InlineHighlight> - when it runs.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>jobs</InlineHighlight> - what actually happens.
          </TextListItem>
        </TextList>

        <Paragraph>
          Think of <Strong>jobs</Strong> as independent machines in the cloud.
          Each one gets its own runner (like a fresh VM) and executes steps in
          order. Steps can be raw shell commands (
          <InlineHighlight>run</InlineHighlight>) or prebuilt actions (
          <InlineHighlight>uses</InlineHighlight>).
        </Paragraph>

        <SectionHeading>
          Triggers: When Should Your Pipelines Run?
        </SectionHeading>

        <Paragraph>
          Triggers determine <Strong>when</Strong> workflows run. This is where
          GitHub Actions starts to feel really powerful - you can wire workflows
          into your exact development flow.
        </Paragraph>

        <Paragraph>Some of the most common triggers you'll use:</Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>push</InlineHighlight> - on every push (optionally
            filtered by branches or paths).
          </TextListItem>
          <TextListItem>
            <InlineHighlight>pull_request</InlineHighlight> - on PR open/update.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>workflow_dispatch</InlineHighlight> - manual 'Run
            workflow' button with optional inputs.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>schedule</InlineHighlight> - cron-based, like
            nightly jobs.
          </TextListItem>
        </TextList>

        <Paragraph>Here's a more realistic trigger setup:</Paragraph>

        <CodeBlockWithCopy code={workflowTriggers} />

        <Paragraph>
          This lets you do things like 'only run tests when the app code
          changes' or 'allow manual deployments with an environment dropdown'.
        </Paragraph>

        <SectionHeading>Building a Real CI Pipeline</SectionHeading>

        <Paragraph>
          Now we turn this into something useful: a <Strong>CI pipeline</Strong>{" "}
          that runs on both pushes and pull requests.
        </Paragraph>

        <Paragraph>
          A typical CI workflow might clone your repo, set up a Node version,
          install dependencies, and run tests. Here's a solid starting point:
        </Paragraph>

        <CodeBlockWithCopy code={basicNodeCiWorkflow} />

        <Paragraph>A few things to notice:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Matrix builds</Strong> run the same job on Node 18 and 20.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>actions/checkout</InlineHighlight> pulls your code
            into the runner.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>actions/setup-node</InlineHighlight> handles Node
            versioning and caching.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>npm ci</InlineHighlight> gives you reproducible
            installs.
          </TextListItem>
        </TextList>

        <Paragraph>
          In a real project, this becomes your 'gatekeeper' - PRs must pass this
          workflow before being merged.
        </Paragraph>

        <SectionHeading>Environments, Variables & Secrets</SectionHeading>

        <Paragraph>
          Most apps need configuration: API URLs, feature flags, database
          connections, and so on. In GitHub Actions, you manage this with a
          combination of <Strong>env vars</Strong>, <Strong>secrets</Strong>,
          and <Strong>environments</Strong>.
        </Paragraph>

        <Paragraph>
          A simple example using env vars and a secret might look like this:
        </Paragraph>

        <CodeBlockWithCopy code={envSecretsExample} />

        <Paragraph>
          The golden rule: <Strong>never hard-code secrets</Strong> in workflows
          or source code. Store them in{" "}
          <Strong>Settings → Secrets and variables → Actions</Strong> and
          reference them via{" "}
          <InlineHighlight>secrets.MY_SECRET</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          For production-ready pipelines, you can also use{" "}
          <Strong>GitHub Environments</Strong> (like{" "}
          <InlineHighlight>staging</InlineHighlight> and{" "}
          <InlineHighlight>production</InlineHighlight>) to add extra protection
          and approvals.
        </Paragraph>

        <SectionHeading>Making Workflows Fast with Caching</SectionHeading>

        <Paragraph>
          The simplest (and most reliable) option for Node projects is to let{" "}
          <InlineHighlight>actions/setup-node</InlineHighlight> handle caching
          for you. This caches npm's package download cache rather than{" "}
          <InlineHighlight>node_modules</InlineHighlight>, which tends to be
          more stable across runs and avoids weird platform-specific issues.
        </Paragraph>

        <Paragraph>Here's the recommended setup:</Paragraph>

        <CodeBlockWithCopy code={cachingExample} />

        <SectionHeading>Secure Deployments with OIDC & AWS</SectionHeading>

        <Paragraph>
          Historically, CI pipelines deployed to AWS using long-lived{" "}
          <InlineHighlight>AWS_ACCESS_KEY_ID</InlineHighlight> /
          <InlineHighlight>AWS_SECRET_ACCESS_KEY</InlineHighlight> secrets.
          Modern pipelines use <Strong>OIDC</Strong> instead - no static keys,
          short-lived credentials.
        </Paragraph>

        <Paragraph>With GitHub Actions, this is as simple as:</Paragraph>

        <CodeBlockWithCopy code={oidcConfigureAws} />

        <Paragraph>
          Behind the scenes, GitHub issues an OIDC token, AWS verifies it and
          issues temporary credentials for the role you specify. This is both{" "}
          <Strong>more secure</Strong> and
          <Strong>easier to manage</Strong> than rotating static keys.
        </Paragraph>

        <SectionHeading>Reusable Workflows</SectionHeading>

        <Paragraph>
          As your project grows, you'll notice the same workflow patterns
          repeated across repos: install Node, run tests, lint, maybe build a
          Docker image. Reusable workflows let you keep these in{" "}
          <Strong>one place</Strong> and call them from multiple repos.
        </Paragraph>

        <Paragraph>
          First, you define a reusable workflow in{" "}
          <InlineHighlight>
            .github/workflows/shared-node-ci.yml
          </InlineHighlight>
          :
        </Paragraph>

        <CodeBlockWithCopy code={reusableWorkflowDefinition} />

        <Paragraph>Then you call it from another workflow like this:</Paragraph>

        <CodeBlockWithCopy code={reusableWorkflowCaller} />

        <Paragraph>
          This is the GitHub Actions equivalent of extracting a helper function
          into a shared module. It's a huge win for teams maintaining lots of
          services.
        </Paragraph>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          That concludes this short blog post on what GitHub Actions is and how
          it can be used to develop a CI/CD pipeline.
        </Paragraph>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default GitHubCICD;
