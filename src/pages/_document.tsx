import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
