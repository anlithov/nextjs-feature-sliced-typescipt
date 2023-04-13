import React, { FC } from 'react';
import { FieldBaseTypes } from './AppField.types';
import {
  Container,
  ErrorLabel,
  Input,
  InputContainer,
  Label,
} from './AppField.styled';

const AppField: FC<FieldBaseTypes> = ({
  label,
  value,
  onChange,
  type,
  onBlur,
  error,
  placeholder,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </InputContainer>
      <ErrorLabel>{error}</ErrorLabel>
    </Container>
  );
};

export default AppField;
