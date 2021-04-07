import React from 'react';
import { render, screen } from '../../infra/test/testUtils';

import Text from './Text';

describe('<Text />', () => {
  it('should render text', () => {
    render(<Text>custom text</Text>);

    expect(screen.getByText(/custom text/)).toBeInTheDocument();
  });
});
