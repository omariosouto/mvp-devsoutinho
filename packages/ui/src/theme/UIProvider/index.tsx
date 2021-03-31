import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from '../themes';

interface UIProviderProps {
  theme: 'light' | 'dark';
  children: React.ReactNode;
}

export default function UIProvider({
  theme,
  children,
}: UIProviderProps): JSX.Element {
  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
}

UIProvider.defaultProps = {
  theme: 'light',
};
