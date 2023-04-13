import React from 'react';
import * as Styled from './LoginCard.styled';
import PasswordField from '../../features/PasswordField/PasswordField';
import EmailField from '../../features/EmailField/EmailField';
import LoginButton from '../../features/LoginButton/LoginButton';

const LoginCard = () => {
  return (
    <Styled.Container>
      <EmailField />
      <PasswordField />
      <LoginButton />
    </Styled.Container>
  );
};

export default LoginCard;
