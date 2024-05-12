import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { Explorer } from "@/components/pages/blockchain/explorer/Explorer";

export async function getStaticProps() {
  const locale = "ru";

  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}

export const explorer = () => {
  return <Explorer />;
};

explorer.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default explorer;
