import type { AppProps } from "next/app";
import { Play } from "next/font/google";
import { PersistGate } from "redux-persist/integration/react";
import { ModalProvider } from "@/providers/modalProvider";
import { ReduxProvider } from "@/providers/reduxProvider";
import { SpinnerProvider } from "@/providers/SpinnerProvider";
import { persistor } from "@/store";
import "@/styles/globals.css";

const play = Play({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`${play.className} flex min-h-screen flex-col`}>
          <SpinnerProvider>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
          </SpinnerProvider>
        </div>
      </PersistGate>
    </ReduxProvider>
  );
}
