import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { BitcoinExplorer } from "@/components/pages/blockchain/bitcoin-explorer/BitcoinExplorer";

export async function getStaticProps() {
  const locale = "ru";

  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}

export const BitcoinExplorerPage = () => {
  return <BitcoinExplorer />;
};

BitcoinExplorerPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BitcoinExplorerPage;
