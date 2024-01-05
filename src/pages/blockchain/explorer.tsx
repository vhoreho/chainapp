import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";

export const explorer = () => {
  return <div>Explorer</div>;
};

explorer.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default explorer;
