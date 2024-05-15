import { ReactElement } from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { prefetchMaterials } from "@/api/material";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { Utilities } from "@/components/pages";

export async function getStaticProps() {
  const locale = "ru";
  const queryClient = new QueryClient();

  await prefetchMaterials(queryClient);

  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export const utilities = () => {
  return <Utilities />;
};

utilities.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default utilities;
