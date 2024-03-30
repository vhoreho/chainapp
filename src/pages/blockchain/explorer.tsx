import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { Explorer } from "@/components/pages/blockchain/explorer/Explorer";

export const explorer = () => {
  return <Explorer />;
};

explorer.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default explorer;
