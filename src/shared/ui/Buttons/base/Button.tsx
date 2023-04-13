import React, { FC } from 'react';
import { Container } from './Button.styled';
import ButtonLabel from './ButtonLabel';
import { IButtonFactoryProps } from './Button.types';

const Button: FC<IButtonFactoryProps> = ({
  name,
  background = 'rgba(38, 176, 160, 0.75)',
  width = '100%',
  height = '3.2em',
  onClick,
}) => {
  return (
    <Container
      onClick={onClick}
      background={background}
      width={width}
      height={height}
    >
      <div className="button-back" />
      <ButtonLabel>{name}</ButtonLabel>
    </Container>
  );
};

export default Button;
