import React, { FC } from 'react';
import Button from './base/Button';
import { IButtonFactoryProps } from './base/Button.types';

const ButtonBright: FC<IButtonFactoryProps> = (props) => {
  return <Button background={'linear-gradient(-200deg, rgb(60, 129, 123), rgb(59 71 130))'} {...props} />;
};

export default ButtonBright;
