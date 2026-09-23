import React from "react";
import styled, { css } from "styled-components";

/**
 * "Something goes through a thing and comes out different."
 *
 * Give it two lists of label/value pairs and it works out for itself which
 * values changed, highlighting only those. Nothing here knows about IP
 * addresses - it is equally happy with headers, config keys, or anything else
 * that has a before and an after.
 *
 * A step can be `blocked` instead, which replaces the "after" panel with a
 * reason. Useful for showing why something does NOT pass through.
 *
 * <BeforeAndAfter
 *   caption="Internet gateway - what changes"
 *   stage="internet gateway"
 *   steps={[
 *     {
 *       label: "Your laptop connects to the server",
 *       before: [["from", "203.0.113.7"], ["to", "198.51.100.42"]],
 *       after:  [["from", "203.0.113.7"], ["to", "10.20.0.142"]],
 *     },
 *     {
 *       label: "Somebody tries to connect in",
 *       before: [["from", "203.0.113.7"], ["to", "192.0.2.55"]],
 *       blocked: "No entry in the table, so there is nothing to deliver it to.",
 *     },
 *   ]}
 *   note="One field changes each way."
 * />
 */

const mono = css`
  font-family: "SF Mono", "Fira Code", Consolas, "Liberation Mono", monospace;
  font-size: 1.3rem;
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

const Step = styled.div`
  & + & {
    margin-top: 2.4rem;
    padding-top: 2.4rem;
    border-top: 1px dashed ${({ theme }) => theme.secondary};
  }
`;

const StepLabel = styled.p`
  margin: 0 0 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto 1fr;
  align-items: center;
  gap: 0;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }
`;

const Panel = styled.div`
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.surface};
  padding: 1rem 1.2rem;
`;

const Row = styled.div`
  ${mono};
  display: flex;
  gap: 1rem;
  align-items: baseline;
  color: ${({ theme }) => theme.text};
  padding: 0.35rem 0.5rem;
  border-radius: 0.3rem;

  & + & {
    margin-top: 0.2rem;
  }

  ${({ $changed }) =>
    $changed &&
    css`
      background: rgba(255, 180, 0, 0.16);
      box-shadow: inset 0 0 0 1px rgba(255, 180, 0, 0.5);
    `}
`;

const RowLabel = styled.span`
  color: ${({ theme }) => theme.mutedText};
  min-width: 4.5rem;
  flex-shrink: 0;
`;

const Stage = styled.div`
  ${mono};
  text-align: center;
  padding: 0.9rem 1.4rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
`;

/* A line with an arrowhead, rather than a lone glyph. Rotates on narrow
   screens when the track stacks into a single column. */
const Arrow = styled.div`
  display: flex;
  align-items: center;
  min-width: 3.5rem;

  &::before {
    content: "";
    flex: 1;
    height: 2px;
    background: ${({ theme }) => theme.secondary};
  }

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid ${({ theme }) => theme.secondary};
  }

  @media (max-width: 860px) {
    min-width: 0;
    height: 2.8rem;
    justify-self: center;
    flex-direction: column;

    &::before {
      width: 2px;
      height: auto;
    }

    &::after {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid ${({ theme }) => theme.secondary};
      border-bottom: 0;
    }
  }
`;

const Blocked = styled.div`
  border: 2px dashed rgba(255, 90, 90, 0.55);
  background: rgba(255, 90, 90, 0.08);
  border-radius: 0.5rem;
  padding: 1rem 1.2rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  line-height: 1.5;
`;

const Note = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
`;

/* Find the matching label in the other list and report whether it differs.
   Falling back to position keeps it working for unlabelled pairs. */
const hasChanged = (label, value, other, index) => {
  if (!other) return false;
  const match = other.find(([key]) => key === label) || other[index];
  return Boolean(match) && match[1] !== value;
};

const Fields = ({ rows, compareWith }) => (
  <Panel>
    {rows.map(([label, value], index) => (
      <Row key={label} $changed={hasChanged(label, value, compareWith, index)}>
        <RowLabel>{label}</RowLabel>
        <span>{value}</span>
      </Row>
    ))}
  </Panel>
);

const BeforeAndAfter = ({ caption, stage, steps = [], note }) => (
  <Figure>
    {caption && <Caption>{caption}</Caption>}

    {steps.map((step) => (
      <Step key={step.label}>
        {step.label && <StepLabel>{step.label}</StepLabel>}

        <Track>
          <Fields rows={step.before} />
          <Arrow aria-hidden="true" />
          <Stage>{stage}</Stage>
          <Arrow aria-hidden="true" />

          {step.blocked ? (
            <Blocked>{step.blocked}</Blocked>
          ) : (
            <Fields rows={step.after} compareWith={step.before} />
          )}
        </Track>
      </Step>
    ))}

    {note && <Note>{note}</Note>}
  </Figure>
);

export default BeforeAndAfter;
