import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@devsoutinho/cms/infra/graphql/client';
import UIProvider from '@devsoutinho/ui/src/theme/UIProvider';
import GlobalStyle from '@devsoutinho/ui/src/theme/GlobalStyle';

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [currentTheme, setTheme] = useState<'light' | 'dark'>('dark');
  return (
    <ApolloProvider client={apolloClient}>
      <UIProvider theme={currentTheme}>
        <GlobalStyle />
        <button
          onClick={(): void =>
            setTheme(currentTheme === 'light' ? 'dark' : 'light')
          }
        >
          Change theme [{currentTheme}]
        </button>
        <Component {...pageProps} />
      </UIProvider>
    </ApolloProvider>
  );
}
