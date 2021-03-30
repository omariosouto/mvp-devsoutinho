import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    } 
    body {
        font-family: sans-serif;
        background-color: ${({ theme }) => theme.colors.background.main.color};
        color: ${({ theme }) => theme.colors.background.main.contrastColor};
    }
`;

export default GlobalStyle;