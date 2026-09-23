import React from "react";
import styled, { css } from "styled-components";

/**
 * One question, several answers, and where each answer lands you.
 *
 * Built for the diagnostic shape that turns up constantly in technical
 * writing: the symptom you observed tells you which half of the system to go
 * and look at. Also fine for "which of these should I pick" decisions.
 *
 * Branches are flat by design. If you find yourself wanting a tree three deep,
 * that is usually a sign the prose around it is doing too little.
 *
 * <Decision
 *   question="The connection failed. What did it say?"
 *   branches={[
 *     {
 *       answer: "refused",
 *       outcome: "You reached the machine.",
 *       detail: "Nothing was listening on that port.",
 *       tone: "ok",
 *     },
 *     {
 *       answer: "timed out",
 *       outcome: "You never reached it.",
 *       detail: "A security group, a missing route, or the wrong address.",
 *       tone: "warn",
 *     },
 *   ]}
 * />
 */

const mono = css`
  font-family: "SF Mono", "Fira Code", Consolas, "Liberation Mono", monospace;
  letter-spacing: 0.02em;
`;

const tones = {
  ok: {
    background: "rgba(80, 200, 120, 0.10)",
    border: "rgba(80, 200, 120, 0.5)",
  },
  warn: {
    background: "rgba(255, 180, 0, 0.14)",
    border: "rgba(255, 180, 0, 0.55)",
  },
  bad: {
    background: "rgba(255, 90, 90, 0.10)",
    border: "rgba(255, 90, 90, 0.55)",
  },
};

const LINE = css`
  content: "";
  position: absolute;
  background: ${({ theme }) => theme.secondary};
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
  padding: 2rem 1.6rem;
`;

const Question = styled.div`
  ${mono};
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text};

  margin: 0 auto;
  max-width: 46rem;
  padding: 1rem 1.4rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.background};
`;

/* The stem dropping out of the question, before the split. */
const Stem = styled.div`
  position: relative;
  height: 2rem;

  &::before {
    ${LINE};
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-1px);
  }
`;

const Branches = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
`;

const Branch = styled.div`
  position: relative;
  padding-top: 2rem;
  min-width: 0;

  /* Branches stretch to the tallest one, and the outcome box below fills
     whatever height that leaves. Boxes with similar content line up exactly;
     a box with far more text simply sets the height and the others gain
     whitespace rather than going ragged. */
  display: flex;
  flex-direction: column;

  /* The vertical drop into this branch. */
  &::before {
    ${LINE};
    top: 0;
    height: 2rem;
    left: 50%;
    width: 2px;
    transform: translateX(-1px);
  }

  /* The horizontal bar joining the branches. Half-width on the ends so the
     line stops rather than overhanging. */
  &::after {
    ${LINE};
    top: 0;
    height: 2px;
    left: ${({ $first }) => ($first ? "50%" : "-0.6rem")};
    right: ${({ $last }) => ($last ? "50%" : "-0.6rem")};
    display: ${({ $only }) => ($only ? "none" : "block")};
  }

  @media (max-width: 720px) {
    &::after {
      display: none;
    }
  }
`;

/* Carries the connector on down to the outcome box, so the line runs
   unbroken from the split to the box with the label sitting on it. */
const AnswerRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;

  &::before {
    ${LINE};
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-1px);
  }
`;

const Answer = styled.span`
  ${mono};
  position: relative;
  font-size: 1.25rem;
  text-align: center;
  color: ${({ theme }) => theme.mutedText};

  /* Matches the board so the connector appears to pass behind the label. */
  background: ${({ theme }) => theme.surface};
  padding: 0 0.8rem;
`;

const Outcome = styled.div`
  flex: 1;
  padding: 1.1rem 1.2rem;
  border-radius: 0.5rem;
  border: 2px solid
    ${({ $tone, theme }) =>
      tones[$tone] ? tones[$tone].border : theme.secondary};
  background: ${({ $tone, theme }) =>
    tones[$tone] ? tones[$tone].background : theme.background};
`;

const OutcomeTitle = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.45;
  color: ${({ theme }) => theme.text};
`;

const OutcomeDetail = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1.3rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.mutedText};
`;

const Note = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.mutedText};
`;

const Decision = ({ caption, question, branches = [], note }) => (
  <Figure>
    {caption && <Caption>{caption}</Caption>}

    <Board>
      <Question>{question}</Question>
      <Stem aria-hidden="true" />

      <Branches $count={branches.length}>
        {branches.map((branch, index) => (
          <Branch
            key={branch.answer}
            $first={index === 0}
            $last={index === branches.length - 1}
            $only={branches.length === 1}
          >
            <AnswerRow>
              <Answer>{branch.answer}</Answer>
            </AnswerRow>
            <Outcome $tone={branch.tone}>
              <OutcomeTitle>{branch.outcome}</OutcomeTitle>
              {branch.detail && <OutcomeDetail>{branch.detail}</OutcomeDetail>}
            </Outcome>
          </Branch>
        ))}
      </Branches>
    </Board>

    {note && <Note>{note}</Note>}
  </Figure>
);

export default Decision;
