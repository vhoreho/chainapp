import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { BitcoinExplorer } from "@/components/pages/blockchain/bitcoin-explorer/BitcoinExplorer";

export const BitcoinExplorerPage = () => {
  return <BitcoinExplorer />;
};

BitcoinExplorerPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BitcoinExplorerPage;
