import type { AppProps } from "next/app";
import { Play } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, ModalProvider, SecondaryModalProvider, SpinnerProvider } from "@/providers";
import "@/styles/globals.css";

const play = Play({ subsets: ["latin"], weight: ["400", "700"] });
const query = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={query}>
      <AuthProvider>
        <div className={`${play.className} flex min-h-screen flex-col`}>
          <SpinnerProvider>
            <ModalProvider>
              <SecondaryModalProvider>
                <Component {...pageProps} />
              </SecondaryModalProvider>
            </ModalProvider>
          </SpinnerProvider>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
