import React from "react";
import styled from "styled-components";
import { ChevronBackCircle } from "@styled-icons/ionicons-solid/ChevronBackCircle";
import { StyledNavButton, StyledNavLink } from "./Button";

const StyledBackIcon = styled(ChevronBackCircle)`
  color: ${({ theme }) => theme.secondary};
  width: 3.4rem;
  height: 3.4rem;
  transition: color 0.5s ease;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.text};
  }
`;

// Cancels StyledNavButton/StyledNavLink's nav-bar spacing so the icon sits
// flush with the edge of whatever it's placed above, instead of inset.
const Wrapper = styled(StyledNavButton)`
  margin: 0 0 0 -1.2rem;
`;

const StyledBackButtonAction = styled(StyledNavLink).attrs({
  as: "button",
  type: "button",
})`
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
`;

const BackButton = ({ to = "/blog", onClick }) => (
  <Wrapper>
    {onClick ? (
      <StyledBackButtonAction onClick={onClick}>
        <StyledBackIcon />
      </StyledBackButtonAction>
    ) : (
      <StyledNavLink exact to={to}>
        <StyledBackIcon />
      </StyledNavLink>
    )}
  </Wrapper>
);

export default BackButton;
