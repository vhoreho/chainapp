import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, ProgressProvider } from "@/providers";
import { SnackBarProvider } from "@/providers/SnackBarProvider";
import ThemeProvider from "@/theme";
import { Header } from "../components/header";
import Main from "./main";

type Props = {
  children: ReactNode;
};

export default function CommonLayout({ children }: Props) {
  const query = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={query}>
        <ProgressProvider>
          <SnackBarProvider>
            <AuthProvider>
              <Header isFullWidth />

              <Box
                sx={{
                  minHeight: 1,
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                }}
              >
                <Main>{children}</Main>
              </Box>
            </AuthProvider>
          </SnackBarProvider>
        </ProgressProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
