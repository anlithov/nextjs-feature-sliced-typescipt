import styled from 'styled-components';

export const Container = styled.div<{
  background: string;
  width: string;
  height: string;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 0.6em;
  overflow: hidden;
  cursor: pointer;
  > * {
    position: relative;
  }
  .button-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.background};
  }
  &:hover .button-back {
    filter: brightness(1.2) contrast(1.4);
  }
`;
