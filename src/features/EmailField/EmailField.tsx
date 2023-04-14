import React from 'react';
import * as Styled from './EmailField.styled';
import AppField from '../../shared/ui/Fields/base/AppField';

const EmailField = () => {
  return (
    <Styled.Container>
      <AppField type="email" placeholder="Type your email" />
    </Styled.Container>
  );
};

export default EmailField;
