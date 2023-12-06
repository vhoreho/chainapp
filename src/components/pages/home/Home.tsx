import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@/constants/routes";
import { CommonLayout } from "@/layouts/commonLayout";

export const Home = () => {
  const { t } = useTranslation();
  return (
    <CommonLayout>
      <div className="grow py-7">
        <div className="layout flex w-full animate-scale flex-col items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-center font-semibold md:text-2xl">{t("pages.home.title")}</h2>
            <div className="flex flex-wrap justify-center gap-2 py-4">
              <Link
                href={ROUTES.BLOCKCHAIN}
                className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
              >
                {t("pages.home.buttons.emulator")}
              </Link>
              <Link
                href={ROUTES.BLOCKCHAIN_EXPLORER}
                className="rounded-lg bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-600 focus:outline-none"
              >
                {t("pages.home.buttons.explorer")}
              </Link>
              <Link
                href={ROUTES.BLOCKCHAIN_REPUTATION}
                className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
              >
                {t("pages.home.buttons.reputation")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};