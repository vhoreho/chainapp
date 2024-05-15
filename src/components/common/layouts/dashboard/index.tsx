import { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "../components/header";
import Main from "./main";
import Nav from "./nav";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
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
    </>
  );
}
