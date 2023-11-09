import type { AppProps } from "next/app";
import { Play } from "next/font/google";
import { CommonLayout } from "@/layouts/commonLayout";
import { ModalProvider } from "@/providers/modalProvider";
import { ReduxProvider } from "@/providers/reduxProvider";
import { NextPageWithLayout } from "@/types/layout";
import "@/styles/globals.css";

const play = Play({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ModalProvider>
        <div className={`${play.className} flex min-h-screen flex-col`}>
          <Component {...pageProps} />
        </div>
      </ModalProvider>
    </ReduxProvider>
  );
}
