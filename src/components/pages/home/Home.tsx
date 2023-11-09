import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { CommonLayout } from "@/layouts/commonLayout";

export const Home = () => (
  <CommonLayout>
    <div className="grow py-7">
      <div className="layout flex w-full animate-scale flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-center font-semibold md:text-2xl">
            Обучающие ресурсы о функционировании технологии блокчейн:
          </h2>
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {/* <Link
              href={ROUTES.DOCS.INDEX}
              className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
            >
              Общие положения
            </Link> */}
            <Link
              href={ROUTES.BLOCKCHAIN}
              className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
            >
              Тренажер
            </Link>
            <Link
              href={ROUTES.BLOCKCHAIN_EXPLORER}
              className="rounded-lg bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-600 focus:outline-none"
            >
              Обозреватель транзакций
            </Link>
            <Link
              href={ROUTES.BLOCKCHAIN_REPUTATION}
              className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
            >
              Проверка репутации
            </Link>
          </div>
        </div>
      </div>
    </div>
  </CommonLayout>
);
