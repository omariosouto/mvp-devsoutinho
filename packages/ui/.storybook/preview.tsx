import UIProvider from '../src/theme/UIProvider';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story, ...args) => (
    console.log(args),
    <UIProvider>
      <Story />
    </UIProvider>
  ),
];