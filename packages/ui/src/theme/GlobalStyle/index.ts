import { createGlobalStyle } from 'styled-components';

export const GlobalThemeStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;

    /* Font */
    font-family: -apple-system,BlinkMacSystemFont,sans-serif;
    line-height: 1.5;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
`;

// TODO: Kill that file
const GlobalStyle = createGlobalStyle`
  :root {
    --colors_primary_main_color: ${({ theme }) =>
      theme.colors.primary.main.color};
  }
    * {
      box-sizing: border-box;
      transition: color .1s, background-color .1s;
    } 
    body {
      margin: 0;
      padding: 15px;
      background-color: ${({ theme }) => theme.colors.background.main.color};
      color: ${({ theme }) => theme.colors.background.main.contrastColor};

      /* Font */
      font-family: -apple-system,BlinkMacSystemFont,sans-serif;
      line-height: 1.5;
      font-weight: 400;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }

    /* Typography */
    p {
      font-size: 1.125rem;
      font-weight: 500;
    }

    /* TODO: Break into <Link /> component */
    /* TODO: Receives NextLink as a configurable wrapper for Link component */
    a {
      color: ${({ theme }) => theme.colors.primary.main.color};
      &:hover {
        opacity: .5;
      }
    }

    /* TODO: Remove All GlobalStyle to it's respective components */
    .headerCard {
      margin-bottom: 32px;
      position: relative;
      .title {
        font-size: 2.25rem;
        letter-spacing: -.049375rem;
        font-weight: bold;
        @media (max-width: 600px) {
          font-size: 1.4rem;
        }
      }
      .avatar {
        border: 1px solid ${({ theme }) =>
          theme.colors.background.main.contrastColor};
        box-shadow: ${({ theme }) =>
          `${theme.colors.background.main.contrastColor}25`} 0px 2px 10px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-top: 16px;
        margin-bottom: 16px;
        @media (max-width: 600px) {
          width: 120px;
          height: 120px;
          margin-bottom: 2rem;
        }
        transition: box-shadow .3s, opacity .2s;
        &:hover,
        &:focus {
          opacity: .8;
          box-shadow: ${({ theme }) =>
            `${theme.colors.background.main.contrastColor}20`} 0px 2px 10px 5px;
        }
      }
    }
    .container {
      max-width: 700px;
      margin: auto;
    }
    .center-margin {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .rounded {
      border-radius: 50%;
    }

    .blocks-container {
      list-style: none;
      padding: 0;
      display: grid;
      grid-gap: 15px;
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
      }
      time {
        font-size: 0.9rem;
      }
      h1 {
        margin-top: 0;
      }
      p {
        margin: 0;
      }
      li {
        display: flex;
        height: 100%;
      }
      article {
        display: flex;
        height: 100%;
      }
      a {
        padding: 15px;
        border-radius: 7px;
        display: block;
        border: 1px solid ${({ theme }) =>
          theme.colors.background.main.contrastColor};
        box-shadow: ${({ theme }) =>
          `${theme.colors.background.main.contrastColor}25`} 0px 2px 10px;
        color: inherit;
        text-decoration: none;
        transition: color .1s, background-color .1s, box-shadow .3s;
        &:hover,
        &:focus {
          opacity: 1;
          border-color: ${({ theme }) => theme.colors.primary.main.color}ba;
          color: ${({ theme }) => theme.colors.primary.main.color};
          box-shadow: ${({ theme }) =>
            `${theme.colors.background.main.contrastColor}20`} 0px 2px 10px 5px;
          p {
            color: ${({ theme }) => theme.colors.background.main.contrastColor};
          }
        }
      }
    }
`;

export default GlobalStyle;
