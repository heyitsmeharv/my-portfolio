import React from "react";
import styled, { css } from "styled-components";

/**
 * An ordered chain of links where the interesting question is "which one is
 * broken", not "what are the steps". Each link can carry a state, so the same
 * component works as a neutral checklist or as a diagnosis with the break
 * marked.
 *
 * <Chain
 *   caption="Six links - one of them is broken"
 *   links={[
 *     { name: "client route", detail: "does the client send it into the tunnel?" },
 *     { name: "IP forwarding", detail: "will the kernel pass it on?", state: "broken" },
 *     { name: "NAT", detail: "does it leave with a source AWS accepts?", state: "ok" },
 *   ]}
 *   note="The question is never which command. It is which link."
 * />
 */

const mono = css`
  font-family: "SF Mono", "Fira Code", Consolas, "Liberation Mono", monospace;
  letter-spacing: 0.02em;
`;

const states = {
  ok: {
    colour: "rgba(80, 200, 120, 0.9)",
    background: "rgba(80, 200, 120, 0.10)",
    border: "rgba(80, 200, 120, 0.45)",
    mark: "✓",
  },
  broken: {
    colour: "rgba(255, 90, 90, 0.95)",
    background: "rgba(255, 90, 90, 0.10)",
    border: "rgba(255, 90, 90, 0.55)",
    mark: "✕",
  },
};

const Figure = styled.figure`
  margin: 5rem 0;
  padding: 0;
`;

const Caption = styled.figcaption`
  ${mono};
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.mutedText};
  margin-bottom: 1.2rem;
`;

const Link = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.2rem;

  padding: 1rem 1.2rem;
  border-radius: 0.5rem;
  border: 2px solid
    ${({ $state, theme }) =>
      states[$state] ? states[$state].border : theme.secondary};
  background: ${({ $state, theme }) =>
    states[$state] ? states[$state].background : theme.surface};

  /* The connector between one link and the next. */
  & + & {
    margin-top: 2.2rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 2.6rem;
      top: -2.2rem;
      height: 2.2rem;
      width: 2px;
      background: ${({ theme }) => theme.secondary};
    }
  }

  @media (max-width: 620px) {
    grid-template-columns: auto 1fr;
    row-gap: 0.6rem;
  }
`;

const Number = styled.span`
  ${mono};
  font-size: 1.3rem;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Body = styled.div`
  min-width: 0;
`;

const Name = styled.p`
  ${mono};
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Detail = styled.p`
  margin: 0.3rem 0 0;
  font-size: 1.35rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.mutedText};
`;

const Mark = styled.span`
  font-size: 1.6rem;
  line-height: 1;
  color: ${({ $state }) =>
    states[$state] ? states[$state].colour : "transparent"};

  @media (max-width: 620px) {
    grid-column: 2;
    justify-self: start;
  }
`;

const Note = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
`;

const Chain = ({ caption, links = [], note }) => (
  <Figure>
    {caption && <Caption>{caption}</Caption>}

    {links.map((link, index) => (
      <Link key={link.name} $state={link.state}>
        <Number>{index + 1}</Number>
        <Body>
          <Name>{link.name}</Name>
          {link.detail && <Detail>{link.detail}</Detail>}
        </Body>
        <Mark $state={link.state} aria-hidden={!link.state}>
          {states[link.state] ? states[link.state].mark : ""}
        </Mark>
      </Link>
    ))}

    {note && <Note>{note}</Note>}
  </Figure>
);

export default Chain;
