import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  
  
  body {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
    font-family: Raleway;
    font-weight: 400;
    line-height: 1.7;
    /* color: #777; */
    /* padding: 5rem; */
    box-sizing: 3rem;

    @media screen and (max-width: 480px) {
      body {
        padding: 1rem; 
      }
    }

}`;