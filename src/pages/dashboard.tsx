import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { NextPageWithLayout } from "@/types/layout";

const dashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default dashboard;
