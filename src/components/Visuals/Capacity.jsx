import React from "react";
import styled, { css } from "styled-components";

/**
 * One cell per unit, with some of them marked. Drawn honestly, so "five out of
 * 256" and "five out of sixteen" look as different as they actually are.
 *
 * Blocks share a width, so the fraction shaded is directly comparable between
 * them - which is the whole reason to reach for this rather than a table.
 *
 * <Capacity
 *   blocks={[
 *     { label: "/24", total: 256, marked: [0, 1, 2, 3, 255], legend: "5 gone, 251 yours" },
 *     { label: "/28", total: 16,  marked: [0, 1, 2, 3, 15],  legend: "5 gone, 11 yours" },
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
  padding: 2rem 1.8rem;

  display: grid;
  grid-template-columns: repeat(
    ${({ $blocks }) => Math.min($blocks, 2)},
    minmax(0, 1fr)
  );
  gap: 2.4rem;

  @media (max-width: 620px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Block = styled.div`
  min-width: 0;
`;

const BlockLabel = styled.p`
  ${mono};
  margin: 0 0 0.3rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const BlockSub = styled.p`
  ${mono};
  margin: 0 0 1.2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.mutedText};
`;

const Cells = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, minmax(0, 1fr));
  gap: ${({ $cols }) => ($cols > 8 ? "2px" : "4px")};
  max-width: 28rem;
`;

const Cell = styled.span`
  aspect-ratio: 1;
  border-radius: ${({ $cols }) => ($cols > 8 ? "1px" : "3px")};

  background: ${({ $marked, theme }) =>
    $marked ? "rgba(255, 180, 0, 0.9)" : theme.background};
  box-shadow: inset 0 0 0 1px
    ${({ $marked, theme }) =>
      $marked ? "rgba(255, 180, 0, 0.9)" : theme.secondary};
`;

const Legend = styled.p`
  margin: 1.2rem 0 0;
  font-size: 1.35rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.mutedText};

  strong {
    color: ${({ theme }) => theme.text};
  }
`;

const Note = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
`;

const Capacity = ({ caption, blocks = [], note }) => (
  <Figure>
    {caption && <Caption>{caption}</Caption>}

    <Board $blocks={blocks.length}>
      {blocks.map((block) => {
        const cols = Math.ceil(Math.sqrt(block.total));
        const marked = new Set(block.marked || []);

        return (
          <Block key={block.label}>
            <BlockLabel>{block.label}</BlockLabel>
            {block.sub && <BlockSub>{block.sub}</BlockSub>}

            <Cells $cols={cols} aria-hidden="true">
              {Array.from({ length: block.total }, (_, index) => (
                <Cell key={index} $cols={cols} $marked={marked.has(index)} />
              ))}
            </Cells>

            {block.legend && <Legend>{block.legend}</Legend>}
          </Block>
        );
      })}
    </Board>

    {note && <Note>{note}</Note>}
  </Figure>
);

export default Capacity;
