import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { NextIntlClientProvider } from "next-intl";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "@/components/common/protected-routes/ProtectedRoutes";
import { AuthProvider, ModalProvider, ProgressProvider } from "@/providers";
import "@/styles/globals.css";

const play = localFont({
  src: [
    {
      path: "../../public/fonts/Play-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Play-Bold.ttf",
      weight: "700",
    },
  ],
});
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const query = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <NextIntlClientProvider locale="ru" timeZone="Europe/Vienna" messages={pageProps.messages}>
      <Head>
        <title>Анализ блокчейна</title>
      </Head>
      <div className={`${play.className} font-play`}>
        <QueryClientProvider client={query}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <ProgressProvider>
              <AuthProvider>
                <ProtectedRoute>
                  <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
                </ProtectedRoute>
              </AuthProvider>
            </ProgressProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </div>
    </NextIntlClientProvider>
  );
}
