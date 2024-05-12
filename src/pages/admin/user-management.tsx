import { ReactElement } from "react";
import CommonLayout from "@/components/common/layouts/common";
import { UserManagement } from "@/components/pages/admin/user-management/UserManagement";

export async function getStaticProps() {
  const locale = "ru";

  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}

export const userManagement = () => {
  return <UserManagement />;
};

userManagement.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};

export default userManagement;
