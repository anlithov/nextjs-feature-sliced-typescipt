import React from 'react';
import { AppProps } from 'next/app';
import RootLayout from '../app/root-layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
