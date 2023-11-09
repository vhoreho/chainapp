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
          <div className="py-4 flex gap-2 flex-wrap justify-center">
            <Link
              href={ROUTES.DOCS.WHAT_IS_BLOCKCHAIN}
              className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline"
            >
              Общие положения
            </Link>
            <Link
              href={ROUTES.BLOCKCHAIN}
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            >
              Тренажер
            </Link>
            <Link
              href={ROUTES.BLOCKCHAIN_EXPLORER}
              className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            >
              Обозреватель транзакций
            </Link>
            <Link
              href={ROUTES.BLOCKCHAIN_REPUTATION}
              className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            >
              Проверка репутации
            </Link>
          </div>
        </div>
      </div>
    </div>
  </CommonLayout>
);
