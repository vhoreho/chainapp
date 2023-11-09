import type { AppProps } from "next/app";
import { Play } from "next/font/google";
import { CommonLayout } from "@/layouts/commonLayout";
import { NextPageWithLayout } from "@/types/layout";
import "@/styles/globals.css";

const play = Play({ subsets: ["latin"], weight: ["400", "700"] });

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <CommonLayout>{page}</CommonLayout>);

  return (
    <div className={`${play.className} flex min-h-screen flex-col font-sans`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
