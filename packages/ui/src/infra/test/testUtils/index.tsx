import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import UIProvider from '../../../theme/UIProvider';

const AllTheProviders = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => <UIProvider {...props}>{children}</UIProvider>;

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: any, options = { providerProps: {} }) => {
  const Provider = (props: any) => (
    <AllTheProviders {...props} {...options.providerProps} />
  );

  return render(ui, { wrapper: Provider, ...options });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
