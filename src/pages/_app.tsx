import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import type { AppProps } from "next/app";

import ThemeProvider from "@/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  );
}
