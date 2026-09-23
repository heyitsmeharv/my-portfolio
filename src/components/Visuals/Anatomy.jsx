import React from "react";
import styled, { css } from "styled-components";

/**
 * Takes one value apart and labels the pieces. Built for things where the
 * shape of the string is the lesson: a CIDR block, a command flag, a header,
 * a connection string.
 *
 * Segments are the pieces. Groups are brackets underneath that can span
 * several segments at once, which is what makes it work for "these bits are
 * fixed and those are free" as well as "each of these means something".
 *
 * <Anatomy
 *   value="10.20.0.0/16"
 *   segments={[
 *     { value: "10", sub: "00001010" },
 *     { value: "20", sub: "00010100" },
 *     { value: "0",  sub: "00000000" },
 *     { value: "0",  sub: "00000000" },
 *   ]}
 *   groups={[
 *     { from: 0, to: 1, label: "fixed", detail: "the network", tone: "locked" },
 *     { from: 2, to: 3, label: "free",  detail: "65,536 addresses" },
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
  overflow-x: auto;
`;

const Value = styled.p`
  ${mono};
  margin: 0 0 1.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, minmax(0, 1fr));
  column-gap: 0.6rem;
  row-gap: 0.8rem;
  min-width: ${({ $count }) => $count * 9}rem;
`;

const Segment = styled.div`
  grid-row: 1;
  text-align: center;
  padding: 0.8rem 0.6rem;
  border-radius: 0.4rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.background};
`;

const SegmentValue = styled.div`
  ${mono};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const SegmentSub = styled.div`
  ${mono};
  font-size: 1.15rem;
  margin-top: 0.4rem;
  color: ${({ theme }) => theme.mutedText};
`;

/* The bracket sits in row 2 and spans whichever segments it covers. */
const Group = styled.div`
  grid-row: 2;
  grid-column: ${({ $from, $to }) => `${$from + 1} / ${$to + 2}`};
  padding-top: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0.4rem;
    right: 0.4rem;
    height: 0.7rem;
    border: 2px solid
      ${({ $tone, theme }) =>
        $tone === "locked" ? "rgba(255, 180, 0, 0.75)" : theme.secondary};
    border-top: 0;
    border-radius: 0 0 0.3rem 0.3rem;
  }
`;

const GroupLabel = styled.div`
  ${mono};
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text};

  ${({ $tone }) =>
    $tone === "locked" &&
    css`
      display: inline-block;
      padding: 0.15rem 0.5rem;
      border-radius: 0.3rem;
      background: rgba(255, 180, 0, 0.16);
      box-shadow: inset 0 0 0 1px rgba(255, 180, 0, 0.5);
    `}
`;

const GroupLabelRow = styled.div`
  text-align: center;
`;

const GroupDetail = styled.div`
  font-size: 1.3rem;
  line-height: 1.5;
  text-align: center;
  margin-top: 0.3rem;
  color: ${({ theme }) => theme.mutedText};
`;

const Note = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
`;

const Anatomy = ({ caption, value, segments = [], groups = [], note }) => (
  <Figure>
    {caption && <Caption>{caption}</Caption>}

    <Board>
      {value && <Value>{value}</Value>}

      <Grid $count={segments.length}>
        {segments.map((segment, index) => (
          <Segment key={index}>
            <SegmentValue>{segment.value}</SegmentValue>
            {segment.sub && <SegmentSub>{segment.sub}</SegmentSub>}
          </Segment>
        ))}

        {groups.map((group, index) => (
          <Group
            key={index}
            $from={group.from}
            $to={group.to}
            $tone={group.tone}
          >
            <GroupLabelRow>
              <GroupLabel $tone={group.tone}>{group.label}</GroupLabel>
            </GroupLabelRow>
            {group.detail && <GroupDetail>{group.detail}</GroupDetail>}
          </Group>
        ))}
      </Grid>
    </Board>

    {note && <Note>{note}</Note>}
  </Figure>
);

export default Anatomy;
