import styled from 'styled-components';

export const Label = styled.div<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
`;
