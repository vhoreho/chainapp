import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta name="description" content="   OSInt   .    ,   ." />
        <meta name="keywords" content="OSInt,  ,  ,  ,  " />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Play:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="   OSInt   " />
        <meta property="og:description" content="   OSInt   .    ,   ." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://osint.tools" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
