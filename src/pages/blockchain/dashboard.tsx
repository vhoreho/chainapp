import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { BlockchainDashboard } from "@/components/pages";

export async function getStaticProps() {
  const locale = "ru";

  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}

export const dashboard = () => {
  return <BlockchainDashboard />;
};

dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default dashboard;
