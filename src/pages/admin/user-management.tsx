import { ReactElement } from "react";
import CommonLayout from "@/components/common/layouts/common";
import { UserManagement } from "@/components/pages/admin/user-management/UserManagement";

export const userManagement = () => {
  return <UserManagement />;
};

userManagement.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};

export default userManagement;
