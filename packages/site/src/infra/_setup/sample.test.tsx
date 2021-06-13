// TODO: Delete when create another test
import React from 'react';
import styled from 'styled-components';
import { render } from '../test/testUtils';

const Sample = styled.div`
  background: ${({ theme }) => theme.colors.primary.main.color};
`;

function Component() {
  return <Sample>Hi</Sample>;
}

// eslint-disable-next-line no-console
console.log(Component);

describe('sample', () => {
  it('snapshot', () => {
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('test', () => {
    expect(true).toBe(true);
  });
});
