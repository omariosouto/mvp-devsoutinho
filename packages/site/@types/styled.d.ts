// TODO: Find a better way to do this
import 'styled-components';

interface Color {
  main: {
    color: string;
    contrastColor: string;
  };
}

interface ThemeColor {
  background: Color;
  primary: Color;
  secondary?: Color;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColor;
  }
}
