import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;
export const Label = styled.span`
  display: flex;
  width: 100%;
  padding: 0.2em 0.4em;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  color: #fff;
  height: 3.2em;
  padding: 0 0.8em;
  border-radius: 0.8em;
  background: rgba(16, 16, 16, 0.44);
  border: 2px solid rgba(16, 16, 16, 0);
  outline: 0;
  &:active {
    border: 2px solid rgba(157, 157, 157, 0.3);
    outline: 0;
  }

  &:focus {
    border: 2px solid rgba(107, 107, 107, 0.3);
    outline: 0;
  }
`;

export const ErrorLabel = styled.span`
  font-size: 0.8em;
  color: red;
`;
