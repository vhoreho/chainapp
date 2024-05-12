import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { EtheriumExplorer } from "@/components/pages/blockchain/etherium-explorer/EtheriumExplorer";

export async function getStaticProps() {
  const locale = "ru";

  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
export const EtheriumExplorerPage = () => {
  return <EtheriumExplorer />;
};

EtheriumExplorerPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default EtheriumExplorerPage;
