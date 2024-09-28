import React from "react";
import { NextSeo } from "next-seo";
import { Register } from "@/components/pages/register";

const Signup = () => {
  return (
    <>
      <NextSeo
        title="Регистрация в приложении для изучения блокчейна"
        description="Регистрация в приложении для изучения блокчейна"
        openGraph={{
          title: "Приложение для изучения блокчейна - Регистрация",
          description: "Регистрация в приложении для изучения блокчейна",
        }}
      />
      <Register />
    </>
  );
};

export default Signup;
