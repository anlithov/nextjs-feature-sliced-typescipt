import React, { FC, ReactNode } from 'react';
import { Label } from './ButtonLabel.styled';

interface IProps {
  fontSize?: string;
  children: ReactNode;
}
const ButtonLabel: FC<IProps> = ({ children, fontSize = '1em' }) => {
  return <Label fontSize={fontSize}>{children}</Label>;
};

export default ButtonLabel;
