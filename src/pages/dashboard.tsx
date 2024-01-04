import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { Dashboard } from "@/components/pages/dashboard/Dashboard";
import { NextPageWithLayout } from "@/types/layout";

const dashboard: NextPageWithLayout = () => {
  return <Dashboard />;
};

dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default dashboard;
