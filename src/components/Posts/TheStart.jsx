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
} from "../BlogLayout/BlogLayout";

// typography
import { PageTitle, Paragraph } from "../Typography/Typography";

import BackButton from "../Button/BackButton";

const AnimatedPostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const TheStart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/the-start");
    Analytics.track("blog_page_viewed", { slug: "the-start" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton />
      </PostTopBar>
      <AnimatedPostContainer>
        <PageTitle>The Start</PageTitle>
        <Paragraph>
          For a long time I've wanted to have a personal space where I can write
          and challenge myself around technologies I'm interested in. The
          purpose of this blog is to be able to document my ideas and
          experiences, and to be able to reflect as I build up a library of
          knowledge that I can refer back to in the future.
        </Paragraph>
      </AnimatedPostContainer>
    </PageWrapper>
  );
};

export default TheStart;
