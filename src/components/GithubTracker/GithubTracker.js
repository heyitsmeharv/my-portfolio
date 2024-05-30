import React, { useEffect, useState } from "react";
import styled from "styled-components";

// helpers
import { activityTracker } from "../../helpers/text";

const Container = styled.section`
  padding: 1rem;
  background: ${({ theme }) => theme.background}; 
  max-width: 600px;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: ${({ theme }) => theme.secondary}; 
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Separator = styled.span`
  width: 30px;
  height: 2px;
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.separator};
`;


const Title = styled.h1`
  font-size: 4rem;
  font-family: 'Raleway';
  font-weight: 600;
  text-align: center;
`;

const Text = styled.p`
  font-family: 'Raleway';
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  line-height: 25px;
  font-weight: 600;
`;

const GitHubActivityTracker = ({ language }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/heyitsmeharv/events/public`)
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error("Error fetching GitHub activity:", error));
  }, []);

  console.log("events", events)

  return (
    <Container>
      <Title>{activityTracker(language)}</Title>
      <Separator />
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Text>{event.type} at {new Date(event.created_at).toLocaleString()}
              <br />
              Repo: {event.repo.name}</Text>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default GitHubActivityTracker;