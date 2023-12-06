import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { Home } from "@/components/pages/home/Home";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("pages.home.title")}</title>
      </Head>
      <Home />
    </>
  );
}
