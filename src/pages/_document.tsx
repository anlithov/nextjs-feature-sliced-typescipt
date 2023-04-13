import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <title>NextJS TypeScript Template</title>
        <meta
          name="description"
          content="NextJS React TypeScript template with basic setup"
        />
        <meta
          name="keywords"
          content="mira,mui,material app,react,material,kit,dashboard,application,admin,template"
        />
        <meta name="author" content="Anlithov" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
