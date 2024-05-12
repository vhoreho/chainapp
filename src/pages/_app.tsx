import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextIntlClientProvider } from "next-intl";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import moment from "moment";
import { AuthProvider, ModalProvider, ProgressProvider } from "@/providers";
import { SnackBarProvider } from "@/providers/SnackBarProvider";
import ThemeProvider from "@/theme";
import "moment/locale/ru";
moment.locale("ru");

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
        <title>OSINT Insight Hub</title>
      </Head>
      <AppCacheProvider {...pageProps}>
        <ThemeProvider>
          <QueryClientProvider client={query}>
            <ProgressProvider>
              <ModalProvider>
                <SnackBarProvider>
                  <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
                </SnackBarProvider>
              </ModalProvider>
            </ProgressProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AppCacheProvider>
    </NextIntlClientProvider>
  );
}
