import React, { FC, ReactNode } from 'react';
import QueryProvider from './providers/WithQueryProvider';

interface IProps {
  children: ReactNode;
}
const RootLayout: FC<IProps> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default RootLayout;
