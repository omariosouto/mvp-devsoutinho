import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      transition: color .2s, background-color .2s;
    } 
    body {
      font-family: sans-serif;
      background-color: ${({ theme }) => theme.colors.background.main.color};
      color: ${({ theme }) => theme.colors.background.main.contrastColor};
    }

    a {
      color: ${({ theme }) => theme.colors.primary.main.color};
      &:hover {
        opacity: .5;
      }
    }    
`;

export default GlobalStyle;
