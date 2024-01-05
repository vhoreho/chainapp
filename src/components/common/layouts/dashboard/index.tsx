import { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, ProgressProvider } from "@/providers";
import { SnackBarProvider } from "@/providers/SnackBarProvider";
import ThemeProvider from "@/theme";
import Header from "./header";
import Main from "./main";
import Nav from "./nav";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [openNav, setOpenNav] = useState(false);

  const query = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={query}>
        <ProgressProvider>
          <SnackBarProvider>
            <AuthProvider>
              <Header onOpenNav={() => setOpenNav(true)} />

              <Box
                sx={{
                  minHeight: 1,
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                }}
              >
                <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

                <Main>{children}</Main>
              </Box>
            </AuthProvider>
          </SnackBarProvider>
        </ProgressProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
