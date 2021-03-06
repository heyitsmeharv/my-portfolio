import React from "react";
import styled from "styled-components";

import { StyledButton } from '../Button/Button';

// icons
import {
  StyledFacebookCircle,
  StyledLinkedinSquare,
  StyledTwitter,
  StyledGithub,
} from "../../resources/styles/icons";

const Wrapper = styled.div`
  display: flex;
`;

const socialMediaButtons = [
  { icon: <StyledFacebookCircle />, link: "https://www.facebook.com/adam.harvey.73/" },
  { icon: <StyledLinkedinSquare />, link: "https://www.linkedin.com/in/heyitsmeharv/" },
  { icon: <StyledTwitter />, link: "https://twitter.com/heyitsmeharv" },
  { icon: <StyledGithub />, link: "https://github.com/heyitsmeharv" }
];

const SocialMediaBar = () => {
  return (
    <Wrapper>
      {socialMediaButtons.map((button, key) => {
        return (
          <StyledButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={key}>
            <a target='_blank' href={button.link}>
              {button.icon}
            </a>
          </StyledButton>
        );
      })}
    </Wrapper>
  );
};

export default SocialMediaBar;
