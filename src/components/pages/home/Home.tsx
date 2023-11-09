import { ROUTES } from "@/constants/routes";
import { CommonLayout } from "@/layouts/commonLayout";
import Link from "next/link";

export const Home = () => (
  <CommonLayout>
    <div className="grow py-7 font-play">
      <div className="layout w-full flex flex-col items-center animate-scale">
        <div className="flex flex-col items-center">
          <h2 className="md:text-2xl font-semibold text-center">
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
