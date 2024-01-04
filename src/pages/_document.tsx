import { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from "next/document";
import { CssBaseline } from "@mui/material";
import {
  documentGetInitialProps,
  DocumentHeadTags,
  DocumentHeadTagsProps,
} from "@mui/material-nextjs/v14-pagesRouter";

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Play:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <CssBaseline />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
