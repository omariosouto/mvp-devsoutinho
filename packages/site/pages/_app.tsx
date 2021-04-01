import React from 'react';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@devsoutinho/cms/infra/graphql/client';
import UIProvider from '@devsoutinho/ui/src/theme/UIProvider';
import GlobalStyle from '@devsoutinho/ui/src/theme/GlobalStyle';

const ToggleWrapper = styled.label`
  z-index: 100;
  position: fixed;
  right: 15px;
  width: 50px;
  height: 24px;
  background: #0f1114;
  border-radius: 50px;
  display: flex;
  cursor: pointer;
  &:focus-within {
    .thumb {
      box-shadow: 0 0 5px 5px ${({ theme }) => theme.colors.primary.main.color};
    }
  }

  .thumb {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #fafafa;
    box-sizing: border-box;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    transform: translateX(26px);
  }
  span {
    width: 50%;
    text-align: center;
  }
  input {
    display: none;
  }
  input:not(:checked) ~ .dark {
    display: block;
  }
  input:checked ~ .thumb {
    transform: translateX(0);
  }
`;

function ToggleTheme({ toggleTheme }) {
  return (
    <ToggleWrapper
      htmlFor="themeToggle"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.currentTarget.click();
        }
      }}
    >
      <input id="themeToggle" type="checkbox" onChange={toggleTheme} />
      <span className="dark">🌑</span>
      <span className="light">☀️</span>
      <span className="thumb"></span>
    </ToggleWrapper>
  );
}

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}): JSX.Element {
  const [currentTheme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const apolloClient = useApollo(pageProps.initialApolloState);

  function toggleTheme() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ApolloProvider client={apolloClient}>
      <UIProvider theme={currentTheme}>
        <GlobalStyle />
        <ToggleTheme toggleTheme={toggleTheme} />
        <Component {...pageProps} />
      </UIProvider>
    </ApolloProvider>
  );
}
