import { ReactElement } from "react";
import DashboardLayout from "@/components/common/layouts/dashboard";
import { Emulator } from "@/components/pages/blockchain/emulator/Emulator";

export const emulator = () => {
  return <Emulator />;
};

emulator.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default emulator;
