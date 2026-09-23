import React from "react";
import styled, { css } from "styled-components";

/**
 * A span divided into labelled regions, drawn to proportion.
 *
 * Use it when the regions have meaningful names AND are within an order of
 * magnitude of each other - port ranges, packet layouts, partition tables,
 * timelines, anything where "this part is roughly twice that part" is worth
 * seeing.
 *
 * Do NOT use it when one region dwarfs the others. Labels need room, so the
 * tiny regions get drawn far too large and the picture ends up lying about the
 * proportion it exists to show. Reach for Capacity instead, which marks units
 * rather than labelling regions and can therefore stay honest.
 *
 * <Range
 *   label="TCP and UDP port numbers"
 *   slots={[
 *     { label: "0 – 1023",      detail: "well known", tone: "taken", width: 1 },
 *     { label: "1024 – 49151",  detail: "registered", width: 48 },
 *     { label: "49152 – 65535", detail: "ephemeral",  tone: "free", width: 16 },
 *   ]}
 * />
 */

const mono = css`
  font-family: "SF Mono", "Fira Code", Consolas, "Liberation Mono", monospace;
  letter-spacing: 0.02em;
`;

const tones = {
  taken: {
    background: "rgba(255, 180, 0, 0.16)",
    border: "rgba(255, 180, 0, 0.6)",
  },
  free: {
    background: "rgba(80, 200, 120, 0.10)",
    border: "rgba(80, 200, 120, 0.45)",
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

const Board = styled.div`
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.surface};
  padding: 1.6rem 1.4rem;
  overflow-x: auto;
`;

const Label = styled.p`
  ${mono};
  margin: 0 0 1.2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  column-gap: 0.4rem;
  min-width: 46rem;
`;

const Slot = styled.div`
  grid-row: 1;
  min-width: 0;
  text-align: center;
  padding: 1rem 0.4rem;
  border-radius: 0.4rem;
  border: 2px solid
    ${({ $tone, theme }) =>
      tones[$tone] ? tones[$tone].border : theme.secondary};
  background: ${({ $tone, theme }) =>
    tones[$tone] ? tones[$tone].background : theme.background};
`;

const SlotLabel = styled.span`
  ${mono};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  overflow-wrap: break-word;
  hyphens: none;
`;

const Detail = styled.div`
  grid-row: 2;
  min-width: 0;
  padding: 0.6rem 0.2rem 0;
  font-size: 1.15rem;
  line-height: 1.4;
  text-align: center;
  color: ${({ theme }) => theme.mutedText};
  overflow-wrap: break-word;
  hyphens: none;
`;

const Note = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
`;

const Range = ({ caption, label, slots = [], note }) => {
  const columns = slots.map((slot) => `${slot.width || 1}fr`).join(" ");

  return (
    <Figure>
      {caption && <Caption>{caption}</Caption>}

      <Board>
        {label && <Label>{label}</Label>}

        <Grid $columns={columns}>
          {slots.map((slot, index) => (
            <Slot key={index} $tone={slot.tone}>
              <SlotLabel>{slot.label}</SlotLabel>
            </Slot>
          ))}

          {slots.map((slot, index) => (
            <Detail key={index}>{slot.detail}</Detail>
          ))}
        </Grid>
      </Board>

      {note && <Note>{note}</Note>}
    </Figure>
  );
};

export default Range;
