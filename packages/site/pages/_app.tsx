import React from 'react';
import Head from 'next/head';
import { parseCookies, setCookie } from 'nookies';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../cms/infra/graphql/client';
import UIProvider from '@devsoutinho/ui/src/theme/UIProvider';
import GlobalStyle from '@devsoutinho/ui/src/theme/GlobalStyle';
import Router from 'next/router';

import gtag from '../src/infra/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

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
    pointer-events: none;
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

function ToggleTheme({ theme, toggleTheme }) {
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
      <input
        id="themeToggle"
        type="checkbox"
        onClick={toggleTheme}
        defaultChecked={Boolean(theme === 'light')}
      />
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
  const cookies = parseCookies(null);
  const savedTheme = cookies.theme as 'light' | 'dark';
  const [currentTheme, setTheme] = React.useState<'light' | 'dark'>(
    savedTheme || 'dark'
  );
  const apolloClient = useApollo(pageProps.initialApolloState);

  function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCookie(null, 'theme', newTheme, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MH9X8XM');`,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
      </Head>
      <UIProvider theme={currentTheme}>
        <GlobalStyle />
        <ToggleTheme theme={currentTheme} toggleTheme={toggleTheme} />
        <Component {...pageProps} />
      </UIProvider>
    </ApolloProvider>
  );
}
