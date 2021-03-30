import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@devsoutinho/cms/infra/graphql/client'
import UIProvider from '@devsoutinho/ui/theme/UIProvider';
import GlobalStyle from '@devsoutinho/ui/theme/GlobalStyle';


export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const [currentTheme, setTheme] = useState<'light'|'dark'>('light');
    return (
        <ApolloProvider client={apolloClient}>
            <UIProvider theme={currentTheme}>
                <GlobalStyle />
                <button onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}>
                    Change theme [{currentTheme}]
                </button>
                <Component {...pageProps} />
            </UIProvider>
        </ApolloProvider>
    )
}