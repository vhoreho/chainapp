import { NextSeo } from "next-seo";
import { Login } from "@/components/pages/login";

const LoginPage = () => {
  return (
    <>
      <NextSeo
        title="Вход в приложение для изучения блокчейна"
        description="Вход в приложение для изучения блокчейна"
        openGraph={{
          title: "Приложение для изучения блокчейна - Вход",
          description: "Вход в приложение для изучения блокчейна",
        }}
      />
      <Login />
    </>
  );
};

export default LoginPage;
