import { ReactElement } from "react";
import { Container } from "@mui/material";
import DashboardLayout from "@/components/common/layouts/dashboard";

export const explorer = () => {
  return <Container>Explorer</Container>;
};

explorer.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default explorer;
