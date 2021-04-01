import styled, { css } from 'styled-components';

interface TextProps {
  textAlign?: 'center' | 'right' | 'left' | 'justify';
}
const Text = styled.span<TextProps>`
  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}
`;

export default Text;
