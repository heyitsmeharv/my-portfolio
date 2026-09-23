import React from "react";
import styled, { css } from "styled-components";

/**
 * A conversation between two parties, in order. Handshakes, request/response
 * pairs, challenge/response, anything where who-says-what-to-whom is the point.
 *
 * Entries are either a message (an arrow, with a direction) or an aside (a
 * party quietly doing something on its own).
 *
 * <Exchange
 *   caption="Logging in with a key"
 *   parties={["your laptop", "the server"]}
 *   entries={[
 *     { dir: "right", text: "I would like to authenticate with this public key" },
 *     { aside: "is that key in authorized_keys?", side: "right" },
 *     { dir: "left",  text: "prove it - sign this random challenge" },
 *     { dir: "right", text: "the signed challenge" },
 *     { aside: "verifies the signature", side: "right", outcome: "access granted" },
 *   ]}
 * />
 */

const mono = css`
  font-family: "SF Mono", "Fira Code", Consolas, "Liberation Mono", monospace;
  letter-spacing: 0.02em;
`;

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

const Board = styled.div`
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.surface};
  padding: 1.6rem 1.4rem;
`;

const Parties = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px dashed ${({ theme }) => theme.secondary};
  margin-bottom: 1.6rem;
`;

const Party = styled.div`
  ${mono};
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-align: ${({ $align }) => $align};
`;

const Line = styled.div`
  & + & {
    margin-top: 1.4rem;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-direction: ${({ $dir }) => ($dir === "left" ? "row-reverse" : "row")};
`;

/* The tail of the arrow: a flexible line that fills whatever space is left. */
const Tail = styled.span`
  flex: 1;
  height: 2px;
  background: ${({ theme }) => theme.secondary};
  min-width: 1.5rem;
`;

const Head = styled.span`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  ${({ $dir, theme }) =>
    $dir === "left"
      ? css`
          border-right: 9px solid ${theme.secondary};
        `
      : css`
          border-left: 9px solid ${theme.secondary};
        `}
`;

const Label = styled.span`
  ${mono};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
  padding: 0 0.4rem;
`;

const Aside = styled.div`
  ${mono};
  font-size: 1.25rem;
  font-style: italic;
  color: ${({ theme }) => theme.mutedText};
  text-align: ${({ $side }) => ($side === "left" ? "left" : "right")};
  padding: 0 0.4rem;
`;

const OutcomeRow = styled.div`
  display: flex;
  justify-content: ${({ $side }) =>
    $side === "left" ? "flex-start" : "flex-end"};
  margin-top: 0.6rem;
`;

const Outcome = styled.span`
  ${mono};
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  padding: 0.4rem 0.8rem;
  border-radius: 0.3rem;
  background: rgba(255, 180, 0, 0.16);
  box-shadow: inset 0 0 0 1px rgba(255, 180, 0, 0.5);
`;

const Note = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
`;

const Exchange = ({ caption, parties = [], entries = [], note }) => (
  <Figure>
    {caption && <Caption>{caption}</Caption>}

    <Board>
      {parties.length === 2 && (
        <Parties>
          <Party $align="left">{parties[0]}</Party>
          <Party $align="right">{parties[1]}</Party>
        </Parties>
      )}

      {entries.map((entry, index) => (
        <Line key={index}>
          {entry.aside ? (
            <>
              <Aside $side={entry.side}>{entry.aside}</Aside>
              {entry.outcome && (
                <OutcomeRow $side={entry.side}>
                  <Outcome>{entry.outcome}</Outcome>
                </OutcomeRow>
              )}
            </>
          ) : (
            <Message $dir={entry.dir} aria-label={entry.text}>
              <Tail />
              <Label>{entry.text}</Label>
              <Tail />
              <Head $dir={entry.dir} aria-hidden="true" />
            </Message>
          )}
        </Line>
      ))}
    </Board>

    {note && <Note>{note}</Note>}
  </Figure>
);

export default Exchange;
