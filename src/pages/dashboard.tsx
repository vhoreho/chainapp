import { NextSeo } from "next-seo";
import { Dashboard } from "@/components/pages/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <NextSeo
        title="Главная страница приложения для изучения блокчейна"
        description="Главная страница приложения для изучения блокчейна"
        openGraph={{
          title: "Приложение для изучения блокчейна - Главная страница",
          description: "Главная страница приложения для изучения блокчейна",
        }}
      />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
