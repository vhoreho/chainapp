import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/providers";
import { SnackBarProvider } from "@/providers/SnackBarProvider";
import ThemeProvider from "@/theme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const query = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AppCacheProvider {...pageProps}>
      <ThemeProvider>
        <QueryClientProvider client={query}>
          <SnackBarProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </SnackBarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppCacheProvider>,
  );
}
